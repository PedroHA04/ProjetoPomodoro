import {useTaskContext} from "../../Contexts/TaskContext/useContext.ts";
import {getNextCycle} from "../../utils/getNextCycle.ts";
import {getNextCycleType} from "../../utils/getNextCycleType.ts";

export function Tips() {
    const { state } = useTaskContext();
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const tipsForWhenActiveTasks = {
        workTime: <span>Foque por {state.config.workTime}min</span>,
        shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
        longBreakTime: <span>Descanso longo por {state.config.longBreakTime}min</span>
    }

    const tipsForNoActiveTasks = {
        workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
        shortBreakTime: (
            <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
        ),
        longBreakTime: <span>Próximo ciclo é de descanso longo ({state.config.longBreakTime}min)</span>
    }

    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTasks[state.activeTask.type]}
            {!state.activeTask && tipsForNoActiveTasks[nextCycleType]}
        </>
    )
}