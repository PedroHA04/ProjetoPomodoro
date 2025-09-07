import type {TaskModel} from "../../models/TaskModel.ts";
import type {TaskStateModel} from "../../models/TaskStateModel.ts";

// @ts-expect-error: TS não consegue inferir corretamente a action START_TASK
export enum TaskActionsTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
    COUNT_DOWN = 'COUNT_DOWN',
    COMPLETE_TASK = 'COMPLETE_TASK',
    CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskActionsModel = {
  type: TaskActionsTypes.START_TASK,
    payload: TaskModel;
} | {
    type: TaskActionsTypes.INTERRUPT_TASK,
} | {
    type: TaskActionsTypes.RESET_STATE,
} | {
    type: TaskActionsTypes.COUNT_DOWN,
    payload: { secondsRemaining: number };
} | {
    type: TaskActionsTypes.COMPLETE_TASK,
} | {
    type: TaskActionsTypes.CHANGE_SETTINGS,
    payload: TaskStateModel['config'];
};
