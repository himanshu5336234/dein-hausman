import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";


export function forgotPassword(loginModel, closeModal, setSignUpModel, serverError, setForgetModel) {
  const dispatch = useDispatch()
  const {  forgetPassword ,forgetPasswordLoading} = useSelector(state => ({
    forgetPasswordLoading: state.user.forgetPasswordLoading,
    forgetPassword: state.user.forgetPassword,
  }));

  const [email, setEmail] = useState('')
  const [error, setError] = useState({})

  function openForgot() {
    close()
    setForgetModel(true)
  }

  function close() {
    closeModal()
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function onLogin(e) {
    e.preventDefault()
    let error = {}

    if (email === '') {
      error.email = 'Phone or Email number is required'
    }else if (!ValidateEmail(email)) {
      error.phone = 'Invalid Email'
    }
    console.log(error,"error")
    setError(error)
    if (!Object.keys(error).length) {
      dispatch({ type: 'FORGET_PASSWORD', payload: { email} })
    }
  }

  useEffect(() => {
    let error = {}
    if (get(forgetPassword, 'error', false)) {
      error.message = get(forgetPassword, 'message', '')
      setError(error)
      dispatch({ type: "RESET_USER" })
    }
    if (get(forgetPassword, 'success', false)) {
      error.sMessage = get(forgetPassword, 'message', '')
      setError(error)
      dispatch({ type: "RESET_USER" })
    }
    setTimeout(()=>{
      setError({})
    }, 5000)
  }, [forgetPassword])
  
  return (
    <div>
      <div className="modal-wrapper">
        <Modal
          isOpen={loginModel}
          onRequestClose={close}
          ariaHideApp={false}
          // style={customStyles}
          contentLabel="Example Modal"
          className="modal-wrapper-sm middle-modal modal-forgot"
        >
          <header>
            <button onClick={close} className="close-btn">
              <Image
                src="/assets/svg/close-modal.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            <h4>Forget Password</h4>
          </header>
          <div className="modalbody modalbody-forgot">
            <form onSubmit={onLogin}>
              <div className="box box-pad-btm">
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Email</div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="field-input" />
                  </div>
                </div>
              </div>
              {get(error, 'email', '') &&
                <span className="errormsg">{get(error, 'email', '')}</span>
              }
              {get(error, 'message', '') &&
                <span className="errormsg">{get(error, 'message', '')}</span>
              }
              {get(error, 'sMessage', '') &&
                <span className="errormsg" style={{color: "green"}}>{get(error, 'sMessage', '')}</span>
              }
              <p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
              <button className="btn btn-continue mt-4" type="submit" disabled={forgetPasswordLoading} >Continue</button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}