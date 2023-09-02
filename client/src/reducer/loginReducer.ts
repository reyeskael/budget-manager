export interface LoginState {
    username: string | null,
    password: string | null
}

const initialLoginState: LoginState = {
    username: null,
    password: null
};

export enum LoginReducerActionType {
    LOGIN_ADD = "LOGIN_ADD",
    LOGIN_DELETE = "LOGIN_DELETE",
};

export interface LoginReducerAction {
    type: LoginReducerActionType,
    payload: LoginState
}

export const loginReducer = (state: LoginState = initialLoginState, action: LoginReducerAction) => {
    switch(action.type) {
        case LoginReducerActionType.LOGIN_ADD:
            state = action.payload;
            return state;
        case LoginReducerActionType.LOGIN_DELETE:
            state = initialLoginState;
            return state;
        default:
            return state;
    }
}