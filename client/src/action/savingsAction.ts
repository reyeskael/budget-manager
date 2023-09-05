import { SavingsReducerAction, SavingsReducerActionType, SavingsState } from "../reducer/savingsReducer";

export const selectSavings = (payload: SavingsState): SavingsReducerAction => ({
    type: SavingsReducerActionType.SAVINGS_SELECT,
    payload
});

export const deselectSavings = (payload: SavingsState): SavingsReducerAction => ({
    type: SavingsReducerActionType.SAVINGS_DESELECT,
    payload
});