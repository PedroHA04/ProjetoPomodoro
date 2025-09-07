import {PlayCircleIcon, StopCircleIcon} from "lucide-react";
import {Cycles} from "../Cycles";
import {DefaultButton} from "../DefaultButton";
import {DefaultInput} from "../DefaultInput";
import type React from "react";
import {useRef} from "react";
import type {TaskModel} from "../../models/TaskModel";
import {useTaskContext} from "../../Contexts/TaskContext/useContext";
import {getNextCycle} from "../../utils/getNextCycle";
import {getNextCycleType} from "../../utils/getNextCycleType";
import {TaskActionsTypes} from "../../Contexts/TaskContext/taskActions.ts";
import {Tips} from "../Tips";
import {showMessage} from "../../adapters/showMessage.ts";

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();
        if (!taskName) {
            showMessage.warn('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        dispatch({type: TaskActionsTypes.START_TASK, payload: newTask})
        showMessage.success('Tarefa iniciada')
    }

    function handleInterruptedTask() {
        showMessage.dismiss()
        showMessage.info('Tarefa interrompida')
        dispatch({type: TaskActionsTypes.INTERRUPT_TASK})
    }

    return (
        <form onSubmit={handleCreateNewTask} className="form">
            <div className="forRow">
                <DefaultInput
                    labelText="task"
                    type="text"
                    id="meuInput"
                    placeholder="Digite algo"
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                    defaultValue={lastTaskName}
                />
            </div>

            <div className="forRow">
                <Tips />
            </div>

            {state.currentCycle > 0 && (
                <div className="forRow">
                    <Cycles />
                </div>
            )}

            <div className="forRow">
                {!state.activeTask ? (<DefaultButton aria-label='Iniciar nova tarefa' title='Nova tarefa' type='submit' icon={<PlayCircleIcon />}
                                                     key='Enviar Formulário'/>) : (
                    <DefaultButton aria-label='Interruper tarefa' title='Parar tarefa' type='button'
                                   color='red' icon={<StopCircleIcon />}
                                   onClick={handleInterruptedTask}
                                   key='Nao enviar'/>
                )}
            </div>
        </form>
    );
}