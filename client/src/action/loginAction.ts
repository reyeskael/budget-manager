import { LoginReducerAction, LoginReducerActionType, LoginState } from "../reducer/loginReducer";

export const addLogin = (payload: LoginState): LoginReducerAction => ({
    type: LoginReducerActionType.LOGIN_ADD,
    payload
});