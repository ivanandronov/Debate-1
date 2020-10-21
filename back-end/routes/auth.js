import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Vote from '../models/vote.js';

const router = express.Router();

function serializeUser(user) {
  return {
    id: user._id,
    username: user.name,    
  };
}

router.route('/').get((req, res) => {
  res.send('rabotaet')
});

router.route('/loading').post((req, res) => {
  console.log('imhere', req.session.user)
  if (req.session.user) {
    return res.json({ authenticated: true, user: req.session.user });
  } else {
    return res.json({ authenticated: false });
  }
});

router
  .route('/signin')
  .post(async (req, res) => {
    const { nameEmail, password } = req.body;
    try {
      const userByName = await User.findOne({ name: nameEmail }).populate('comments').populate('threads').populate('debates').populate('wonThreads').populate('wonDebates').populate('votedFor').exec();
      if (!userByName) {
        try {
          const userByEmail = await User.findOne({ email: nameEmail }).populate('comments').populate('threads').populate('debates').populate('wonThreads').populate('wonDebates').populate('votedFor').exec();
          if (!userByEmail) {
            return res.json({ authenticated: false, err: 'No such user' });
          } else {
            const isValidPassword = await bcrypt.compare(password, userByEmail.password);
            if (!isValidPassword) {
              return res.json({ authenticated: false, err: 'Invalid password' });
            }
            req.session.user = serializeUser(userByEmail);
            return res.json({ authenticated: true, user: userByEmail });
          }
        } catch (error) {
          console.log(error);
          return res.json({ authenticated: false, err: 'Data base error, plase try again' });
        }
      } else {
        const isValidPassword = await bcrypt.compare(password, userByName.password);
        if (!isValidPassword) {
          return res.json({ authenticated: false, err: 'Invalid password' });
        } else {
          console.log(userByName, serializeUser(userByName))
          req.session.user = serializeUser(userByName);
          return res.json({ authenticated: true, user: userByName });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({ authenticated: false, err: 'Data base error, plase try again' });
    }
});

router
  .route('/signup')
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const userByName = await User.findOne({ name }).exec();
      if (userByName) {
        return res.json({ authenticated: false, err: 'This name is already taken' });
      } else {
        try {
          const userByEmail = await User.findOne({ email }).exec();
          if (userByEmail) {
            return res.json({ authenticated: false, err: 'This email is already taken' });
          } else {
            const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                  name,
                  password: hashedPassword,
                  email,      
                });
            user.populate('comments').populate('threads').populate('debates').populate('wonThreads').populate('wonDebates').populate('votedFor');
            req.session.user = serializeUser(user);
            return res.json({ authenticated: true, user });
          }
        } catch (error) {
          console.log(error)
          return res.json({ authenticated: false, err: 'Data base error, plase try again' });
        }
      }
    } catch (error) {
      console.log(error)
      return res.json({ authenticated: false, err: 'Data base error, plase try again' });
    }
});

router
  .route('/logout')
  .post((req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ err: 'Session destroy error' })
      }
      res.clearCookie(req.app.get("session cookie name"), { path: '/' });
      return res.json({ authenticated: false });
    });
});

export default router;
