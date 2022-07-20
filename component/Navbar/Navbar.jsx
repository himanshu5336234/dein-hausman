import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { get } from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cookie from 'cookie-cutter';
import Moment from 'moment';
import { loginModal } from "../loginModal/loginModal"
import { signUpModal } from "../signUpModal/signUpModal"
import { forgotPassword } from "../ForgetPassword/ForgetPassword"
import { otp } from "../otp/otp"

export default function Navbar(props) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const dispatch = useDispatch()
  const router = useRouter()
  const { user, needLogin, userData, otpData, emailSignData, mobileLoginData, emailLoginData, getNotification, mobileSignData, forgetPassword } = useSelector(state => ({
    userData: state.user.mobileSignData,
    otpData: state.user.otpData,
    user: state.user.user,
    emailSignData: state.user.emailSignData,
    mobileLoginData: state.user.mobileLoginData,
    emailLoginData: state.user.emailLoginData,
    mobileSignData: state.user.mobileSignData,
    needLogin: state.user.needLogin,
    getNotification: state.services.notification,
    forgetPassword: state.user.forgetPassword,
  }));
  const [userLogged, setLoggedStatus] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showMessage, setMessage] = useState(false);
  const [forgetModel, setForgetModel] = useState(false)
  const [error, setError] = useState({});

  useEffect(() => {
    setError({})
  }, [loginModel, signUpModel, otpModel, forgetModel])

  useEffect(() => {
    if (get(user, 'code', false) === 401) {
      if (userLogged === true) {
        setLoggedStatus(false)
        localStorage.clear()
      }
    } else {
      dispatch({ type: 'GET_NOTIFICATION' })
    }
  }, [user])

  useEffect(() => {
    if (userLogged) {
      props.setWebSoket()
    }
  }, [userLogged])

  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      setLoggedStatus(true)
    }



    dispatch({ type: 'GET_USER' })
  }, [])

  useEffect(() => {
    if (needLogin === true) {
      dispatch({ type: 'LOGIN_RESET' })
      setLoginModel(true)
    }
  }, [needLogin])

  useEffect(() => {
    dispatch({ type: 'GET_USER' })
    if (get(userData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      setLoginModel(false)
      setSignUpModel(false)
      if (get(userData, 'user.phone', false)) {
        setMobile(userData.user.phone)
        setOtpModel(true)
      }
    }
    if (get(userData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(userData, 'message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(userData, 'message', 'Please try again'))
    }
    if (get(otpData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(otpData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(otpData, 'user', {})))
        setOtpModel(false)
        setLoggedStatus(true)
        if (get(otpData, 'user.name', '') === '') {
          router.push('/profilemanagement')
        }
      }
    }

    if (get(emailSignData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(emailSignData, 'message[0].messages[0].message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(emailLoginData, 'message', 'Please try again'))
    }

    if (get(emailSignData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailSignData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(emailSignData, 'user', {})))
        setSignUpModel(false)
        setLoginModel(false)
        setLoggedStatus(true)
        if (get(emailSignData, 'user.name', '') === '') {
          if (get(emailSignData, 'user.socialLogin', false)) {
            router.push('/profilemanagement?isSocial=true')
          } else {
            router.push('/profilemanagement')
          }
        }
      }
    }

    if (get(mobileLoginData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(mobileLoginData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(mobileLoginData, 'result.message', 'Please try again'))
    }

    if (get(mobileLoginData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(mobileLoginData, 'message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(mobileLoginData, 'result.message', 'Please try again'))
    }

    if (get(mobileLoginData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      setLoginModel(false)
      if (get(mobileLoginData, 'mobile', false)) {
        setMobile(mobileLoginData.mobile)
        setOtpModel(true)
      }
    }

    if (get(emailLoginData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(emailLoginData, 'message[0].messages[0].message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(emailLoginData, 'message', 'Please try again'))
    }

    if (get(emailLoginData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailLoginData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(emailLoginData, 'user', {})))
        setLoginModel(false)
        setLoggedStatus(true)
        if (get(emailLoginData, 'user.name', '') === '') {
          router.push('/profilemanagement')
        }
      }

    }

  }, [userData, otpData, emailSignData, mobileLoginData, emailLoginData, mobileSignData])

  const closeModal = () => {
    setOtpModel(false)
    setLoginModel(false)
    setSignUpModel(false)
    setForgetModel(false)
  }

  function signOut() {
    localStorage.clear()
    cookie.set('token', '/')
    cookie.set('expires', '')
    cookie.set('path', '/')
    dispatch({ type: 'RESET_USER' })
    setLoggedStatus(false)
    router.push('/')
  }

  const renderNotification = () => (
    getNotification && getNotification.length && getNotification.map((data, key) => (
      <li key={key}>
        <div className="bell-bg">
          <Image
            src="/assets/svg/ic-bell.svg"
            alt=""
            height={40}
            width={46}
          />
        </div>
        <div className="bell-txt">
          <h4>{get(data, 'userId', '')}</h4>
          {get(data, 'contentType', '') === "customOrder" ?
            <p>{get(JSON.parse(get(data, 'description', {})), 'msg', '')}</p>
            :
            <p>{get(data, 'description', '')}</p>
          }
          <h6>{Moment(get(data, 'createdAt', null)).format('Do MMMM YYYY, hh:mm:ss a')}</h6>
        </div>
      </li>
    ))
  )
  
  return (
    <div className="container">
      <div className="navbar hide-mob">
        <div onClick={() => router.push('/')} className="logo pointer">
          <Image
            src="/assets/svg/logo.svg"
            alt="company logo"
            width={276}
            height={48}
          />
        </div>
        <ul className="menu">
          {get(user, 'role.type', '') !== "seller" &&
            <li className="align-self-center">
              {userLogged ?
                <Link href="/handyman-registration">
                  Become A Handyman
                </Link>
                :
                <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
              }
            </li>
          }
          {userLogged ? (
            <React.Fragment>
              <li className="align-self-center">
                <Link href="/client-dashboard">
                  My Bookings
                </Link>
              </li>
              {get(user, 'role', '') === "handyman" &&
                <li className="align-self-center">
                  <Link href="/handyman-registration-services">
                    My Services
                </Link>
                </li>
              }{get(user, 'role', '') === "handyman" &&
                <li className="align-self-center">
                  <Link href="/handyman-registration-list">
                    Earnings
                </Link>
                </li>
              }
              <li className="align-self-center">
                <Link href="/about">
                  Support
                </Link>
              </li>
              <li className="align-self-center">
                <span onClick={() => setMessage(!showMessage)} className="posi-rel">
                  Messages
                  <span className={showMessage ? "message-list" : "message-list message-list-hide"}>
                  {/* <div className="empty-msg">
                      <Image
                        className="banner-image"
                        src="/assets/images/empty-msg.png"
                        alt=""
                        layout="responsive"
                        width={911}
                        height={504}
                      />
                  </div> */}
                    <ul>
                      {renderNotification()}
                      {/* <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>

                        <div className="bell-txt" >
                          {/* changes from here */}
                      {/* render() {
                          getNotification = this.state.toDoList.map(function(getNotification){
                          return <li> {getNotification} </li>;
                          }); */}

                      {/* <h4>Moving Out Services</h4>
                          <p>Your request for a quotation for <a href="">Moving Out Services</a> has been sent to<a href=""> user1234</a>...</p>
                          <moment> {moment().format('Do MMMM YYYY, hh:mm:ss a')}</moment> */}

                      {/* <Moment>{showMessage.dateToFormat }</Moment> */}
                      {/* const dateToFormat = '1976-04-19T12:59-0500'; */}

                      {/* <Moment>{showMessage}</Moment> */}
                      {/* <h6>12:58pm 29-09-2020</h6> */}
                      {/* {
                           this.state.getNotification.map((getNotification)=>
                           <div></div> */}


                      {/* </div>


                      </li>  */}


                      {/* <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li>
                      <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li> */}
                    </ul>
                    <Link href="/inbox-redesign-awaiting">
                      <button className="btn btn-primary">View My Inbox</button></Link>
                  </span>
                </span>

              </li>
            </React.Fragment>
          ) : (
            <>
              <li className="align-self-center">
                <Link href="/about">
                  About Us
                  </Link>
              </li>
            </>
          )}

          <li>
            <div className="togglewrapper">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  <i className="fa fa-bars menubar" aria-hidden="true"></i>
                  <img
                    src={get(user, 'picture', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.picture}
                    alt=""
                    width={34}
                    height={34}
                    className="profile-pic-circle"
                  />
                </DropdownToggle>

                {!userLogged &&
                  <>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setSignUpModel(true)}>Sign Up</DropdownItem>
                      <DropdownItem onClick={() => setLoginModel(true)}>Log In</DropdownItem>
                    </DropdownMenu>
                  </>
                }

                {userLogged &&
                  <>
                    <DropdownMenu className="profilebox">
                      <DropdownItem>
                        <ul className="dd-menu1">
                          <li>
                            <div onClick={() => router.push('/profilemanagement')}>

                              <img
                                src={get(user, 'picture', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.picture}
                                alt=""
                                width={80}
                                height={80}
                                className="profile-pic-circle"
                              />
                            </div>
                            <h4 onClick={() => router.push('/profilemanagement')}>{get(user, 'fname', '')}</h4>
                            <h6 onClick={() => router.push('/profilemanagement')}>{get(user, 'email', '')}</h6>
                            <Link href='/profilemanagement'><button className="btn btn-manage">Manage Your Account</button></Link>
                            <div className="divi"></div>
                            <p onClick={signOut} className="text-center mb-2">Sign Out</p>
                            {/* <p className="text-center"><Link href='/index'>Switch To Selling</Link></p> */}
                            <p className="text-center"><Link href='/client-dashboard'>My Dashboard</Link></p>
                          </li>
                        </ul>
                      </DropdownItem>
                    </DropdownMenu>
                  </>
                }

              </Dropdown>
            </div>
          </li>
          <li>
          </li>
        </ul>
        {loginModal(loginModel, closeModal, setSignUpModel, error, setForgetModel)}
        {signUpModal(signUpModel, closeModal, setLoginModel, error)}
        {otp(otpModel, closeModal, mobile, error)}
        {forgotPassword(forgetModel, closeModal, error, setForgetModel)}
      </div>

      <div className="mob-menu-wrapper show-mob">
        <header>
          <div onClick={() => router.push('/')} className="pointer">
            <Image
              src="/assets/svg/logo.svg"
              alt="company logo"
              width={180}
              height={31}
            />
          </div>
          <div onClick={() => setMenu(!menu)}>
            <Image
              src="/assets/svg/ic-menu.svg"
              alt=""
              width={34}
              height={34}
            />
          </div>
        </header>
        <ul className={menu ? "" : 'hide'}>
          {!userLogged && get(user, 'role', '') !== "handyman" &&
            <li className="align-self-center">
              {userLogged ?
                <Link href="/handyman-registration">
                  <a>Become A Handyman</a>
                </Link>
                :
                <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
              }
            </li>
          }
          {userLogged && (
            <>
              <div className="text-center">
                {/* onclick ={()=>router.push('/profilemanagement')}  */}



                <a href="http://localhost:3000/profilemanagement">
                  <img
                    src={get(user, 'picture', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.picture}
                    alt=""
                    width={80}
                    height={80}
                    className="profile-pic-circle"
                  // onclick ={()=>router.push('/profilemanagement')} 
                  /> </a>
                <h4>{get(user, 'fname', '')}</h4>
                <h6>{get(user, 'email', '')}</h6>
              </div>

              {get(user, 'role', '') !== "handyman" &&
                <li className="align-self-center">
                  {userLogged ?
                    <Link href="/handyman-registration">
                      <a>Become A Handyman</a>
                    </Link>
                    :
                    <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
                  }
                </li>
              }

              <li className="align-self-center">
                <Link href="/client-dashboard">
                  <a>My Bookings</a>
                </Link>
              </li>
              {get(user, 'role', '') === "handyman" &&
                <li className="align-self-center">
                  <Link href="/handyman-registration-services">
                    My Services
                </Link>
                </li>
              }{get(user, 'role', '') === "handyman" &&
                <li className="align-self-center">
                  <Link href="/handyman-registration-list">
                    Earnings
                </Link>
                </li>
              }
              {/* <li className="align-self-center">
                <Link href="/index">
                  Switch To Selling
                  </Link>
              </li> */}
              <li className="align-self-center">
                <Link href="/client-dashboard">
                  My Dashboard
                  </Link>
              </li>
              <li className="align-self-center">
                <Link href="/about">
                  <a>Support</a>
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/inbox-redesign-awaiting">
                  Messages
                </Link>
                {/* <span onClick={() => setMessage(!showMessage)} className="posi-rel"> */}
                {/* Messages */}
                {/* <span className={showMessage ? "message-list" : "message-list message-list-hide"}> */}
                {/* <ul>
                      {renderNotification()} */}
                {/* <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>

                        <div className="bell-txt" >
                          {/* changes from here */}
                {/* render() {
                          getNotification = this.state.toDoList.map(function(getNotification){
                          return <li> {getNotification} </li>;
                          }); */}

                {/* <h4>Moving Out Services</h4>
                          <p>Your request for a quotation for <a href="">Moving Out Services</a> has been sent to<a href=""> user1234</a>...</p>
                          <moment> {moment().format('Do MMMM YYYY, hh:mm:ss a')}</moment> */}

                {/* <Moment>{showMessage.dateToFormat }</Moment> */}
                {/* const dateToFormat = '1976-04-19T12:59-0500'; */}

                {/* <Moment>{showMessage}</Moment> */}
                {/* <h6>12:58pm 29-09-2020</h6> */}
                {/* {
                           this.state.getNotification.map((getNotification)=>
                           <div></div> */}


                {/* </div>


                      </li>  */}


                {/* <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li>
                      <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li> */}
                {/* </ul> */}
                {/* <Link href="/inbox-redesign-awaiting">
                  <button className="btn btn-primary">View My Inbox</button></Link>
                  </span>
            </span> */}

              </li>
              <li className="align-self-center">
                <span onClick={signOut}>Logout</span>
              </li>
              {/* <li className="align-self-center">
                <Link href="/">
                  <a>Messages</a>
                </Link>
              </li> */}
            </>
          )
          }
          {!userLogged &&
            <>
              <li onClick={() => setLoginModel(true)} className="align-self-center cursur-pointer">
                <a>Log In</a>
              </li>
              <li onClick={() => setSignUpModel(true)} className="align-self-center cursur-pointer">
                <a>Sign Up</a>
              </li>
            </>
          }
        </ul>
        <div className="sidebar-overlay"></div>
      </div>
    </div>
  );
}
