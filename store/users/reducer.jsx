import cookieCutter from 'cookie-cutter'
import { get } from "lodash"
// Set initial state
const initialState = {
  mobileSignData: {},
  mobileSignLoading: false,
  emailSignData: {},
  emailSignLoading: false,
  mobileLoginData: {},
  mobileLoginLoading: false,
  emailLoginData: {},
  emailLoginLoading: false,
  otpData: {},
  orderById:{},
  resendOtpData: {},
  needLogin: false,
  userLoading: false,
  user: {},
  orderLoading: false,
  orders: [],
  inboxLoading: false,
  inbox: [],
  chatLoading: false,
  chat: [],
  userInfoLoading: false,
  userInfo: {},
  getCardLoding:false,
  getCardData: {},
  paymentLoding: false,
  paymentData: {},
  addPaymentLoading:false,
  addPayment:{},
  updateUserLoading:false,
  updateUser:{},
  resetPasswordLoading:false,
  resetPassword:{},
  forgetPasswordLoading:false,
  forgetPassword:{},
  mobileSignLoading:false,
  mobileSignData:{},
  messageLoading: false,
  messages: {},
  sendMszLoading: true,
  quotationsLoading: false,
  quotations: {},
  revisionLoading: false,
  revision: {}

  // resetUser:{},
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUIRED': {
      return {
        ...state,
        needLogin: true
      }
    }
    case 'DO_PAYMENT': {
      return {
        ...state,
        cardLoding: true
      }
    }
    case 'DID_PAYMENT': {
      return {
        ...state,
        cardLoding: false,
        cardData: action.data
      }
    }
    case 'GET_MESSAGES': {
      return {
        ...state,
        messageLoading: true,
        messages: {}
      }
    }
    case 'GOT_MESSAGE': {
      return {
        ...state,
        messageLoading: false,
        messages: action.data
      }
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        sendMszLoading: true,
        // messages: {}
      }
    }
    case 'SENT_MESSAGE': {
      return {
        ...state,
        sendMszLoading: false,
        // messages: {}
      }
    }
    case 'CHECKOUT': {
      return {
        ...state,
        paymentLoding: true
      }
    }
    case 'RESET_PAYMENT': {
      return {
        ...state,
        paymentData: {}
      }
    }
    case 'PAYMENT': {
      return {
        ...state,
        paymentLoding: false,
        paymentData: action.data
      }
    }
    case 'RESET_CARD': {
      return {
        ...state,
        cardLoding: true,
        cardData: {}
      }
    }
    case 'GET_CARD': {
      return {
        ...state,
        getCardLoding: true
      }
    }
    case 'GOT_CARD': {
      return {
        ...state,
        getCardLoding: false,
        getCardData: action.data
      }
    }
    case 'LOGIN_RESET': {
      return {
        ...state,
        needLogin: false
      }
    }
    case 'SIGNUP_REQUEST': {
      return {
        ...state,
        mobileSignLoading: true,
      };
    }
    
    case 'REGISTER': {
      cookieCutter.set('token', 'Bearer '+get(action, 'data.jwt'))
      // cookieCutter.set('expires', get(action, 'data.token.expiresIn'))
      cookieCutter.set('path', '/')
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: action.data
      };
    }
    case 'GET_USER': {
      return {
        ...state,
        userLoading: true,
      };
    }
    case 'GOT_USER': {
      return {
        ...state,
        userLoading: false,
        user: action.data
      };
    }
    case 'RESET_USER': {
      return {
        ...state,
        user: {}
      };
    }
    case 'GET_USER_INFO': {
      return {
        ...state,
        userInfoLoading: true,
      };
    }
    case 'GOT_USER_INFO': {
      return {
        ...state,
        userInfoLoading: false,
        userInfo: action.data
      };
    }
    
    case 'GET_CHAT': {
      return {
        ...state,
        chatLoading: true,
      };
    }
    case 'GOT_CHAT': {
   
      return {
     
        ...state,
        chatLoading: false,
        chat: action.data
      };
    }

    case 'GET_QUOTATIONS': {
      return {
        ...state,
        quotationsLoading: true,
      };
    }
    case 'GOT_QUOTATIONS': {
      return {
        ...state,
        quotationsLoading: false,
        quotations: action.data
      };
    }

    case 'ASK_REVISION': {
      return {
        ...state,
        revisionLoading: true,
      };
    }
    case 'ASKED_REVISION': {
      return {
        ...state,
        revisionLoading: false,
        revision: action.data
      };
    }
    case 'RESET_REVISION': {
      return {
        ...state,
        revision: {}
      };
    }

    case 'GET_INBOX': {
      return {
        ...state,
        inboxLoading: true,
      };
    }
    case 'GOT_INBOX': {
      return {
        ...state,
        inboxLoading: false,
        inbox: action.data
      };
    }
    case 'GET_ORDER': {
      return {
        ...state,
        orderLoading: true,
      };
    }
    case 'GOT_ORDER_BY_ID': {
      return {
        ...state,
        orderById: action.data
      }
    }
    case 'GOT_ORDER': {
      return {
        ...state,
        orderLoading: false,
        orders: action.data
      };
    }
    case 'SIGNUP_EMAIL_REQUEST': {
      return {
        ...state,
        emailSignLoading: true,
      };
    }
    case 'REGISTERWITHEMAIL': {
      cookieCutter.set('token', 'Bearer '+get(action, 'data.jwt', ''))
      // cookieCutter.set('expires', get(action, 'data.token.expiresIn'))
      cookieCutter.set('path', '/')
      return {
        ...state,
        emailSignLoading: false,
        emailSignData: action.data
      };
    }
    //login
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        mobileLoginLoading: true,
      };
    }
    case 'LOGIN': {
      cookieCutter.set('token', 'Bearer '+get(action, 'data.token.accessToken'))
      return {
        ...state,
        mobileLoginLoading: false,
        mobileLoginData: action.data
      };
    }
    case 'LOGIN_EMAIL_REQUEST': {
      return {
        ...state,
        emailLoginLoading: true,
      };
    }
    case 'LOGINWITHEMAIL': {
      cookieCutter.set('token', 'Bearer '+get(action, 'data.jwt'))
      // cookieCutter.set('expires', get(action, 'data.token.expiresIn'))
      cookieCutter.set('path', '/')
      return {
        ...state,
        emailLoginLoading: false,
        emailLoginData: action.data
      };
    }
    case 'RESENT_OTP': {
      return {
        ...state,
        resendOtpData: action.data
      };
    }
    case 'RESET_PAYMENTS': {
      return {
        ...state,
        addPayment: {}
      };
    }

    case 'RESET_LOG': {
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: {},
        emailSignData: {},
        mobileLoginLoading: false,
        mobileLoginData: {},
        emailLoginData: {},
        resendOtpData: {},
        emailSignLoading: false,
        emailLoginLoading: false,
        otpData: {}
      };
    }
    case 'VERIFYED_OTP': {
      cookieCutter.set('token', 'Bearer '+get(action, 'data.token.accessToken'))
      cookieCutter.set('expires', get(action, 'data.token.expiresIn'))
      cookieCutter.set('path', '/')
      return {
        ...state,
        otpData: action.data
      }
    }

    case 'ADD_PAYMENT': {
      return {
        ...state,
        addPaymentLoading: true,
        };
      
    }
    case 'ADDED_PAYMENT': {
      return {
        ...state,
        addPaymentLoading: false,
        addPayment: action.data
     
      };
      
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        updateUserLoading: true
      }
    }
    case 'UPDATED_USER': {
      return {
        ...state,
        updateUserLoading: false,
        updateUser: action.data
     
      };
      
    }
    case 'RESETUPDATED_USER':
      {
        return{
          ...state,
          updateUser: {}
        };
      }
      
      case 'RESET_USER':
        {
          return{
            ...state,
            resetPassword: {},
            forgetPassword: {}
          };
        }
     
      
    case 'FORGET_PASSWORD': {
      return {
        ...state,
        forgetPasswordLoading: true,
        };
      
    }
    case 'FORGOT_PASSWORD': {
      return {
        ...state,
        forgetPasswordLoading: false,
        forgetPassword: action.data
     
      };
      
    }
    case 'RESET_PASSWORD': {
      return {
        ...state,
        resetPasswordLoading: true,
        };
      
    }
    case 'RESETED_PASSWORD': {
      return {
        ...state,
        resetPasswordLoading: false,
        resetPassword: action.data
     
      };
    }  
    default:
      return state;
  }
}
