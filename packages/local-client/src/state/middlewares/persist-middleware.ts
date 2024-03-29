import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from '../actions';
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({ dispatch, getState }: {
    dispatch: Dispatch<Action>, getState: () => RootState;
}) => {
    let timer: any;
    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);

            if ([
                ActionType.MOVE_CELL,
                ActionType.UPDATE_CELL,
                ActionType.INSERT_CELL_AFTER,
                ActionType.DELETE_CELL
            ].includes(action.type)
            ) {
                if (timer) {
                    clearTimeout(timer);
                }

                setTimeout(() => {
                    saveCells()(dispatch, getState)
                }, 250);
            }
        }
    }
}
