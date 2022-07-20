import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { get } from "lodash";
import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const FB_AAP_ID = process.env.NEXT_PUBLIC_FB_AAP_ID


export function loginModal(loginModel, closeModal, setSignUpModel, serverError, setForgetModel) {
  const dispatch = useDispatch()
  const { isLoading, emailLoginLoading, userData } = useSelector(state => ({
    isLoading: state.user.mobileLoginLoading,
    userData: state.user.mobileLoginData,
    emailLoginLoading: state.user.emailLoginLoading,
  }));
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginWith, setloginWith] = useState('phone');
  const [country, setCountry] = useState('49')
  const [error, setError] = useState({})

  function openSignup() {
    close()
    setSignUpModel(true)
  }

  function openForgot() {
    close()
    setForgetModel(true)
  }

  function close() {
    closeModal()
    setPhone('')
    setCountry('')
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
    if (loginWith === 'phone') {
      if (phone === '') {
        error.phone = 'Phone number is required'
      } else if (phone.length < 6) {
        error.phone = 'Invalid phone number'
      }
      if (country === '') {
        error.phone = 'Phone number is required'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'LOGIN_REQUEST', payload: { "mobile": country+phone.replace(/[^0-9]/g, '') } })
      }
    } else {
      if (email === '') {
        error.email = 'Email is required'
      } else if (!ValidateEmail(email)) {
        error.phone = 'Invalid Email'
      } else if (password === '') {
        error.password = 'Password is required'
      } else if (password.length < 6) {
        error.password = 'minimum password length should 6 characters'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'LOGIN_EMAIL_REQUEST', payload: { identifier: email, password } })
      }
    }
  }
  
  function googleReq(e){
    console.log("e", e)
    e.access_token = e.accessToken
    dispatch({ type: 'GOOGLE_REQUEST', payload: e })
  }
  
  function facebookReq(e){
    e.access_token = e.accessToken
    dispatch({ type: 'FACEBOOK_REQUEST', payload: e })
  }

  return (
    <div>
      <div className="modal-wrapper">
        <Modal
          isOpen={loginModel}
          onRequestClose={close}
          ariaHideApp={false}
          // style={customStyles}
          contentLabel="Example Modal"
          className="modal-wrapper-sm middle-modal"
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
            <h4>Sign In</h4>
          </header>
          <div className="modalbody">

            {loginWith === 'phone' ?
              <form onSubmit={onLogin}>
                <div className="box">
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Country/Region</div>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} id="name" className="custom-select" required >
                        {/* <option disabled value=''></option> */}
                        <option value="49">Germany</option>
                        <option value="91">India</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-divider"></div>
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Phone Number</div>
                      <InputMask mask="(999) 999 9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
                        {(inputProps) => <input {...inputProps} className="field-input" type="tel" placeholder="(000) 000 0000" />}
                      </InputMask>
                    </div>
                  </div>
                </div>
                {get(error, 'phone', '') &&
                  <span className="errormsg">{get(error, 'phone', '')}</span>
                }{get(error, 'email', '') &&
                  <span className="errormsg">{get(error, 'email', '')}</span>
                }{get(error, 'password', '') &&
                  <span className="errormsg">{get(error, 'password', '')}</span>
                }{get(serverError, 'serverError', '') &&
                  <span >{get(serverError, 'serverError', '')}</span>
                }

                <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
                <button className="btn btn-continue" disabled={isLoading}>Continue</button>
              </form>
              :
              <form onSubmit={onLogin}>
                <div className="box">
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Email</div>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="field-input" />
                    </div>
                  </div>
                  <div className="form-divider"></div>
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Password</div>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="field-input" />

                    </div>
                  </div>
                </div>
                {get(error, 'phone', '') &&
                  <span className="errormsg">{get(error, 'phone', '')}</span>
                }{get(error, 'email', '') &&
                  <span className="errormsg">{get(error, 'email', '')}</span>
                }{get(error, 'password', '') &&
                  <span className="errormsg">{get(error, 'password', '')}</span>
                }{get(serverError, 'serverError', '') &&
                  <span className="errormsg">{get(serverError, 'serverError', '')}</span>
                }
                <span onClick={openForgot} className="link cursur-pointer forgot-pass-btn" >
                    Forget password?
                </span>
                {/* <button className="btn btn-continue" onClick={}>forgetPassword</button> */}
                {/* <p>We will call you to confirm your number. Standard message and data rates may apply.</p> */}
                <button className="btn btn-continue" disabled={emailLoginLoading}>Continue</button>
              </form>
            }
            <div className="or">or</div>

            <div className="social-btns">
              <GoogleLogin
                clientId={CLIENT_ID}
                onSuccess={(e)=> googleReq(e)}
                onFailure={(e) => console.log("err=========>", e)}
                // isSignedIn={true}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <Image
                      src="/assets/svg/ic-google.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Continue with Google</span>
                  </button>
                )}
              />
              <FacebookLogin
                appId={FB_AAP_ID}
                autoLoad={false}
                callback={(e)=> facebookReq(e)}
                // icon={<Image
                //   src="/assets/svg/ic-facebook.svg"
                //   alt=""
                //   width={30}
                //   height={30}
                // />}
                // textButton="Continue with Facebook"
                render={renderProps => (
                  <button onClick={renderProps.onClick}>
                    <Image
                      src="/assets/svg/ic-facebook.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Continue with Facebook</span>
                  </button>
                )}
              />

              {loginWith === 'phone' ?
                <button onClick={() => setloginWith('email')}>
                  <Image
                    src="/assets/svg/ic-email.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                  <span>Continue with E-Mail</span>
                </button>
                :
                <button onClick={() => setloginWith('phone')}>
                  <Image
                    src="/assets/svg/ic-email.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                  <span>Continue with Phone</span>
                </button>
              }
            </div>
            <p className="last-para">Don't Have An Account? <span onClick={openSignup} className="cursur-pointer">Sign Up</span></p>

          </div>
        </Modal>
      </div>

      {/* request modal open */}
      {/* <div className="modal-wrapper">
      <Modal
        isOpen={loginModel}
        onRequestClose={close}
        ariaHideApp={false}
        contentLabel="Example Modal"
        className="modal-wrapper-sm modal-wrapper-md"
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
          <h4 className="blank"></h4>
        </header>
        <div className="modalbody">

        <div className="request-modal-wrapper">
          <div className="top-wrapper">
            <div className="profile-pic">
                <Image
                  src="/assets/images/profile-pic.png"
                  alt=""
                  width={128}
                  height={128}
                />
            </div>
            <div className="profile-txt">
                <h3>Service Request Sent</h3>
                <h5>user1234 sent you a service request</h5>
                <h6>12:57pm</h6>
            </div>
          </div>
            <div className="container down-details">
              <div className="row">
                <div className="col-md-12">
                  <h4>CUSTOMER DETAILS</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Name:</span>Kanak Dhotre</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>EMail:</span>dhotrekanak@gmail.com</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="text-details"><span>Shifting From:</span>Berlin, 400607</div>
                </div>
                <div className="col-md-6">
                  <div className="text-details"><span>Shifting To:</span>Johanessburg, 400607</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Requested Date of Service:</span>23/12/2020</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Time of Service:</span>12:00pm</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-details">
                    <button className="outline-btn">Accept Request</button>
                    <button className="outline-btn">Decline Request</button>
                  </div>
                  <div className="note"><span>Note:</span>  Dein Hausman keeps 10% of your earnings as commision</div>
                </div>
              </div>
            </div>
        </div>



        </div>
      </Modal>
    </div> */}
      {/* request modal close */}
    </div>
  );
}