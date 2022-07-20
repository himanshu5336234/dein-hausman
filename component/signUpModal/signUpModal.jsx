import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const FB_AAP_ID = process.env.NEXT_PUBLIC_FB_AAP_ID

export function signUpModal (signUpModel, closeModal, setLoginModel, serverError) {
  const dispatch = useDispatch()
  const { isLoading, emailSignLoading, userData } = useSelector(state => ({
    isLoading: state.user.mobileSignLoading,
    userData: state.user.mobileSignData,
    emailSignLoading: state.user.emailSignLoading,
  }));
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginWith, setloginWith] = useState('phone');
  const [country, setCountry] = useState('49')
  const [error, setError] = useState({})
  const [cPassword, SetCPassword] = useState('')

  function openLogin() {
    close()
    setLoginModel(true)
  }

  // useEffect(() => {
  //   if(signUpModel === false){
  //     setError({})
  //     setPhone('')
  //     setCountry('')
  //   }
  // }, [signUpModel])

  function close() {
    closeModal()
    setError({})
    setPhone('')
    setCountry('')
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function onSignUp(e) {
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
        dispatch({ type: 'SIGNUP_REQUEST', payload: { "phone": phone.replace(/[^0-9]/g, '') } })
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
      } else if (cPassword === '') {
        error.password = 'Password is required'
      } else if (password !== cPassword) {
        error.password = 'Confirm password should match with password'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'SIGNUP_EMAIL_REQUEST', payload: { email, password } })
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

    // Open Finish Signing Up
    // <div className="modal-wrapper">
    //   <Modal
    //     isOpen={signUpModel}
    //     onRequestClose={close}
    //     ariaHideApp={false}
    //     // style={customStyles}
    //     contentLabel="Example Modal"
    //     className="modal-wrapper-sm"
    //   >
    //     <header>
    //       <button onClick={close} className="close-btn">
    //         <Image
    //           src="/assets/svg/close-modal.svg"
    //           alt=""
    //           width={24}
    //           height={24}
    //         />
    //       </button>
    //       <h4>Finish Signing Up</h4>
    //     </header>
    //     <div className="modalbody">
    //         <form>
    //           <div className="box">
    //             <div className="form-group">
    //               <div className="p-lr">
    //               <input type="text" className="field-input" placeholder="First name" />
    //               </div>
    //             </div>
    //             <div className="form-divider"></div>
    //             <div className="form-group">
    //               <div className="p-lr">
    //               <input type="text" className="field-input" placeholder="Last name" />
    //               </div>
    //             </div>
    //           </div>
    //           <p className="text-left mt5">Make sure it matches the name on your government ID.</p>

    //         <div className="fullwidth-inputs-wrapper">
    //           <div className="form-group">
    //             <input type="text" className="field-input" placeholder="Date of birth" />
    //             <p className="text-left mt5">To sign up, you need to at least 18. Your birthday won't be shared with other people who use Dein Hausman.</p>
    //           </div>

    //           <div className="form-group">
    //             <input type="text" className="field-input" placeholder="Email" />
    //             <p className="text-left mt5">We'll email you trip confirmations and receipts.</p>
    //           </div>

    //           <div className="form-group">
    //             <input type="password" className="field-input" placeholder="Password" />
    //             <p className="text-left mt5">By selecting Agree and continue below, I agree to Dein Hausman's <Link href={'/'}>Terms of Services</Link>,  
    //             <Link href={'/'}>Payment Terms of Services</Link>,  
    //             <Link href={'/'}>Privacy Policy</Link> and <Link href={'/'}>Nondiscrimination Policy</Link>.</p>
    //           </div>
    //         </div>

    //           <button className="btn btn-continue">Agree and continue</button>
    //         <div className="border-divider"></div>
    //         <p className="text-left mt5">
    //           Dein Hausman's will send members-only deals, inspiration, marketing emails, and push notifications. You
    //           can opt out of receiving these at any time in your accout settings or directly from the marketing notification.
    //         </p>

    //         <div className="form-group mt-2 mb-2 checkbox-wrapper">
    //           <input type="checkbox" id="html" />
    //           <label for="html">I don't want to reveive marketing messages from Dein Hausman.</label>
    //         </div>
    //         </form>
    //     </div>
    //   </Modal>
    // </div>
    // Close Finish Signing Up



    <div className="modal-wrapper">
      <Modal
        isOpen={signUpModel}
        onRequestClose={close}
        ariaHideApp={false}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-wrapper-sm"
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
          <h4>Sign Up</h4>
        </header>
        <div className="modalbody">
          {loginWith === 'phone' ?
            <form onSubmit={onSignUp}>
              <div className="box">
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Country/Region</div>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} id="name" className="custom-select" required >
                      <option value="49">Germany(+49)</option>
                      <option value="91">India(+91)</option>
                    </select>
                  </div>
                </div>
                <div className="form-divider"></div>
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Phone Number</div>
                    {/* <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="text" className="field-input" required /> */}
                    <InputMask mask="(999) 999 9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
                      {(inputProps) => <input {...inputProps} className="field-input" type="tel" placeholder="(000) 000 0000" />}
                    </InputMask>
                    {/* <label className="form-control-placeholder">Phone Number</label> */}
                  </div>
                </div>
              </div>
              {get(error, 'phone', '') &&
                <span className="errormsg">{get(error, 'phone', '')}</span>
              }{get(serverError, 'serverError', '') &&
                <span className="errormsg">{get(serverError, 'serverError', '')}</span>
              }
              <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
              <button className="btn btn-continue" disabled={isLoading}>Continue</button>
            </form>
            :

            <form onSubmit={onSignUp}>
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
                    {/* <label className="form-control-placeholder">Phone Number</label> */}
                  </div>
                </div>
                <div className="form-divider"></div>
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Confirm Password</div>
                    <input value={cPassword} onChange={(e)=> SetCPassword(e.target.value)}  type="password" id="password" className="field-input" />
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
              {/* <p>We will call you to confirm your number. Standard message and data rates may apply.</p> */}
              <button className="btn btn-continue mt-4" disabled={emailSignLoading}>Continue</button>
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
                render={renderProps => (
                  <button 
                  onClick={renderProps.onClick}
                  >
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

          <p className="last-para">Already Have An Account?  <span onClick={openLogin} className="cursur-pointer">Log In</span></p>
        </div>
      </Modal>
    </div>
  );
}

