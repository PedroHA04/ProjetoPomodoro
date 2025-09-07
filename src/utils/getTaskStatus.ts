import type {TaskModel} from "../models/TaskModel.ts";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
    if(task.completeDate) return 'Completa';
    if(task.interruptDate) return 'Interompida';
    if (task.id === activeTask?.id) return 'Em progresso'
    return 'Abondonada'
}