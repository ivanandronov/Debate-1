import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom"
import Question from "../../images/quest2.png"
import Colon from "../../images/colon2.png"
import { createNewThread } from '../../redux/actions';
import './createThread.scss';
import GlobalThread from '../../components/GlobalThread/globalThread'

export default function CreateThread() {

  const creatorRedux = useSelector(state => state.user.id);


  // при успешном создании треда - переводит куда вам надо, при неудаче - передводит на страницу или модально с ошибкой!!!!
  const succsessThreadCreate = useSelector(state => state.successfulThreadCreate);
  // при обишке бд - модалка/окно с текстом ошибки бд, попробуйте снова
  const dbError = useSelector(state => state.dbError);

  const [formData, setFormData] = useState();

  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.persist();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        creator: creatorRedux,
      };
    });
  }

  return (
    <>
    <div className="createContainer">
      <form className="form" onSubmit={(e) => {
        e.preventDefault()
        dispatch(createNewThread(formData))
      }}>
        <div className="formInner">
          <div className="form-group">
          <label className="form-label" placeholder=" ">
            <input className="form-control" onChange={(e) => handleInput(e)} required name="theme" placeholder=" " type="text"/>
            <p className="labelP">Theme</p>          
          </label>
          </div>
          <div>
            <img className="questionPic" src={Question} />
          </div>
          <div className="form-group">
          <label className="form-label" placeholder=" ">
            <input className="form-control" onChange={(e) => handleInput(e)} required name="sideOne" placeholder=" " type="text"/>
            <p className="labelP">Side One</p>
          </label>
          </div>
          <div>
            <img className="colonPic" src={Colon} />
          </div>
          <div className="form-group">
          <label className="form-label" placeholder=" ">
            <input className="form-control" onChange={(e) => handleInput(e)} required name="sideTwo" placeholder=" " type="text"/>
            <p className="labelP">Side Two</p>
          </label>
          </div>
        </div>
          <div className="form-group">
          <label className="form-label" placeholder=" ">
            <input className="form-control" onChange={(e) => handleInput(e)} required name="description" type="text"/>
            <p className="labelP">Description</p>
          </label>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
      </form>
    </div>
    
  </>
  )
}
