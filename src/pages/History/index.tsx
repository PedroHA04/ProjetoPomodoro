import {Container} from "../../components/Container";
import {MainTemplate} from "../../Templates/MainTemplate";
import {Heading} from "../../components/Heading";
import {DefaultButton} from "../../components/DefaultButton";
import {TrashIcon} from "lucide-react";

import styles from './styles.module.css'
import {useTaskContext} from "../../Contexts/TaskContext/useContext.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {getTaskStatus} from "../../utils/getTaskStatus.ts";
import {useEffect, useState} from "react";
import {sortTasks, type SortTasksOptions} from "../../utils/sortTasks.ts";
import {showMessage} from "../../adapters/showMessage.ts";
import {TaskActionsTypes} from "../../Contexts/TaskContext/taskActions.ts";

export function History() {
    const {state, dispatch} = useTaskContext();
    const [confirmClearHistory, setConfirmClearHistory] = useState<boolean>(false);
    const hasTasks = state.tasks.length > 0;

    const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
        () => {
        return {
          tasks: sortTasks({ tasks: state.tasks} ),
            field: 'startDate',
            direction: 'desc',
        };
    });

    function handleSortTasks({field}: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

        setSortTasksOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTasksOptions.tasks,
                field,
            }),
            direction: newDirection,
            field,
        })
    }

    useEffect(() => {
        setSortTasksOptions(prevState => ({
            ...prevState,
            tasks: sortTasks({
                tasks: state.tasks,
                direction: prevState.direction,
                field: prevState.field,
            })
        }))
    }, [state.tasks])

    useEffect(() => {
        document.title = "Histórico";
    }, []);

    useEffect(() => {
        if (!confirmClearHistory) return;
        dispatch({ type: TaskActionsTypes.RESET_STATE})
        setConfirmClearHistory(false)
    }, [confirmClearHistory, dispatch])

    useEffect(() => {
        return () => {
            showMessage.dismiss();
        }
    }, []);

    function handleResetHistory() {
        showMessage.dismiss()
        showMessage.confirm('Tem certeza?', (confirmation) => {
            setConfirmClearHistory(confirmation)
        })
    }

  return (
    <MainTemplate>
      <Container>
        <Heading>
            <span>History</span>
            {hasTasks && (
            <span className={styles.buttonContainer}>
                <DefaultButton icon={<TrashIcon />} color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}/>
            </span>
            )}
        </Heading>
      </Container>

      <Container>
          {hasTasks && (
         <div className={styles.resposiveTable}>
             <table>
                 <thead>
                    <tr>
                       <th onClick={() => handleSortTasks({field: 'name'})} className={styles.thSort}>Tarefa ↕</th>
                       <th onClick={() => handleSortTasks({field: 'duration'})} className={styles.thSort}>Duração ↕</th>
                       <th onClick={() => handleSortTasks({field: 'startDate'})} className={styles.thSort}>Data ↕</th>
                       <th>Status</th>
                       <th>Tipo</th>
                    </tr>
                 </thead>

                 <tbody>
                 {sortTasksOptions.tasks.map(task => {
                     const taskTypeDictionary: Record<string, string> = {
                         workTime: "Foco",
                         shortBreakTime: "Descanso curto",
                         longBreakTime: "Descanso longo",
                     }

                     return (
                     <tr key={task.id}>
                         <td>{task.name}</td>
                         <td>{task.duration}min</td>
                         <td>{formatDate(task.startDate)}</td>
                         <td>{getTaskStatus(task, state.activeTask)}</td>
                         <td>{taskTypeDictionary[task.type]}</td>
                     </tr>
                     )
                 })}
                 </tbody>
             </table>
         </div>
         )}

          {!hasTasks && (
              <p style={{ textAlign: 'center', fontWeight: 'bold'}}>Ainda não exixtem taferas criadas</p>
          )}
      </Container>
    </MainTemplate>
  )
}
