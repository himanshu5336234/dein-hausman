// Set initial state
const initialState = {
  searchLoading: false,
  searchData: [],
  movingOutData: [],
  detailLoading: false,
  serviceDetails: {},
  moreServiceLoading: false,
  moreServiceData: [],
  inqueryForm: false,
  movingOutLoading: false,
  inqueryData: {},
  wishLoading: false,
  notificationLoading:true,
  notification:[],
  earningLoading:true,
  earning:[],
  proposals:[],
  ws:[]
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    
 case"CONNECTED_WS":{
  console.log(action.data,"cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd")
  return{
    ...state,
    ws:action.data
  }
}

    case 'GOT_PROPOSAL': {
      
      return {
        ...state,
        searchLoading: true,
        proposals: action.data
      };
    }
    case 'SEARCH_REQUEST': {
      return {
        ...state,
        searchLoading: true,
      };
    }
    case 'SEARCH_RESET': {
      return {
        ...state,
        searchData: {},
      };
    }
    case 'SET_WISHLIST': {
      return {
        ...state,
        wishLoading: false,
      };
    }
    case 'ADD_WISH': {
      return {
        ...state,
        wishLoading: true,
      };
    }
    case 'REMOVE_WISH': {
      return {
        ...state,
        wishLoading: true,
      };
    }
    case 'SEARCH_RESULT': {
      return {
        ...state,
        searchLoading: false,
        searchData: action.data
      };
    }
    case 'SEARCH_BY_ID': {
      return {
        ...state,
        searchByIdLoading: true,
        movingOutLoading: true,
      };
    }
    case 'GET_SERVICE': {
      return {
        ...state,
        searchByIdLoading: true,
      };
    }
    case 'GOT_SERVICE': {
      return {
        ...state,
        searchByIdLoading: false,
        searchByIdData: action.data
      };
    }
    case 'GET_NOTIFICATION': {
      return {
        ...state,
        notificationLoading: true,
      };
    }
    case 'GOT_NOTIFICATION': {
      return {
        ...state,
        notificationLoading: false,
        notification: action.data
      };
    }
    case 'GOT_MOVING_OUT': {
      return {
        ...state,
        movingOutLoading: false,
        movingOutData: action.data
      };
    }
    case 'SERVICE_DETAILS': {
      return {
        ...state,
        detailLoading: true,
      };
    }
    case 'GOT_SERVICE_DETAILS': {
      return {
        ...state,
        detailLoading: false,
        serviceDetails: action.data
      };
    }
    case 'MORE_SERVICE': {
      return {
        ...state,
        moreServiceLoading: true,
      };
    }
    case 'GOT_MORE_SERVICE': {
      return {
        ...state,
        moreServiceLoading: false,
        moreServiceData: action.data
      };
    }
    case 'FORM_REQUEST': {
      return {
        ...state,
        inqueryForm: true,
      };
    }
    case 'POST_INQUERY': {
      return {
        ...state,
        inqueryForm: false,
        inqueryData: action.data
      };
    }
    case 'RESET_FORM': {
      return {
        ...state,
        inqueryData: {},
        detailLoading: false,
        moreServiceLoading: false
      };
    }
    case 'RESET_SERVICE': {
      return {
        ...state,
        searchLoading: false,
        searchData: []
      };
    }
    case 'GET_EARNING': {
      return {
        ...state,
        earningLoading: true,
      }
    };
    case 'GOT_EARNING': {
      return {
        ...state,
        earningLoading: false,
        earning: action.data
      }
    };
    default:
      return state;
  }
}
