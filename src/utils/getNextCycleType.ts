import type { TaskModel } from "../models/TaskModel.ts";

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
    if (currentCycle % 8 === 0) return "longBreakTime";
    if (currentCycle % 2 === 0) return "shortBreakTime";
    return "workTime"; // corrigido para minúsculo
}
