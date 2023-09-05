import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { savingsReducer } from './savingsReducer';

const rootReducer = combineReducers({
    loginReducer,
    savingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;