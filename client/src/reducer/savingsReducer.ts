import { SavingsFrequency } from "../types/savingsType";

export interface SavingsState {
    _id: string | null,
    name: string | null,
    amount: number | null,
    frequency: SavingsFrequency | null,
    dateToFinish: Date | null,
    profileId: string | null,
    currentAmount?: number
}

const initialSavingsState: SavingsState = {
    _id: null,
    name: null,
    amount: null,
    frequency: null,
    dateToFinish: null,
    profileId: null
};

export enum SavingsReducerActionType {
    SAVINGS_SELECT = "SAVINGS_SELECT",
    SAVINGS_DESELECT = "SAVINGS_DESELECT",
};

export interface SavingsReducerAction {
    type: SavingsReducerActionType,
    payload: SavingsState
}

export const savingsReducer = (state: SavingsState = initialSavingsState, action: SavingsReducerAction) => {
    switch(action.type) {
        case SavingsReducerActionType.SAVINGS_SELECT:
            state = action.payload;
            return state;
        case SavingsReducerActionType.SAVINGS_DESELECT:
            state = initialSavingsState;
            return state;
        default:
            return state;
    }
}