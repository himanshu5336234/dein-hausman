import {combineReducers} from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import user from './users/reducer';
import services from './services/reducer';
import handyman from './handyman/reducer';

// Combine all
const appReducer = combineReducers({
  user,
  services,
  handyman
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = action.type === 'RESET' ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
