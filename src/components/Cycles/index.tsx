import { useTaskContext } from '../../Contexts/TaskContext/useContext';
import { getNextCycle } from '../../utils/getNextCycle';
import styles from './styles.module.css';
import {getNextCycleType} from "../../utils/getNextCycleType.ts";

export function Cycles() {
    const { state } = useTaskContext();

    const cycleStep = Array.from({ length: state.currentCycle });
    const cylceDescriptionMap = {
        workTime: 'foco',
        shortBreakTime: 'descanso curto',
        longBreakTime: 'descanso longo'
    };

    return (
        <div className={styles.cycles}>
            <span>Ciclos</span>

            <div className={styles.cycleDots}>
                {cycleStep.map((_, index) => {
                    const nextCycle = getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);
                    return (
                        <span
                            key={`${nextCycleType}_${nextCycle}`}
                            className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                            aria-label={`Indicador de ciclo de ${cylceDescriptionMap[nextCycleType]}`}
                            title={`Indicador de ciclo de ${cylceDescriptionMap[nextCycleType]}`}
                        ></span>
                    );
                })}
            </div>
        </div>
    );
}
