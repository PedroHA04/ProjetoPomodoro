import {Container} from "../../components/Container";
import {MainTemplate} from "../../Templates/MainTemplate";
import {Heading} from "../../components/Heading";
import {DefaultInput} from "../../components/DefaultInput";
import {DefaultButton} from "../../components/DefaultButton";
import {SaveIcon} from "lucide-react";
import {useEffect, useRef} from "react";
import {useTaskContext} from "../../Contexts/TaskContext/useContext.ts";
import {showMessage} from "../../adapters/showMessage.ts";
import {TaskActionsTypes} from "../../Contexts/TaskContext/taskActions.ts";

export function Settings() {
    const { state, dispatch } = useTaskContext();

    const workTimeRef = useRef<HTMLInputElement>(null);
    const shortBreakTimeRef = useRef<HTMLInputElement>(null);
    const longBreakTimeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = "Configurações";
    }, []);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formErros = []

        const workTime = Number(workTimeRef.current?.value);
        const shortBreakTime = Number(shortBreakTimeRef.current?.value);
        const longBreakTime = Number(longBreakTimeRef.current?.value);

        if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErros.push('Digite apenas numeros nos campos');
        }

        if (workTime < 1 || workTime > 25) {
            formErros.push('Digite valores entre 1 e 25 para foco');
        }

        if (shortBreakTime < 1 || shortBreakTime > 10) {
            formErros.push('Digite valores entre 1 e 10 para descanso curto');
        }

        if (longBreakTime < 1 || longBreakTime > 15) {
            formErros.push('Digite valores entre 1 e 15 para descanso longo');
        }

        if (formErros.length > 0) {
            formErros.forEach((error) => {
                showMessage.error(error)
            })
            return
        }

        dispatch({type: TaskActionsTypes.CHANGE_SETTINGS,
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime,
            }})

        showMessage.success('Configurações salvas.')
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>

            <Container>
                <p style={{ textAlign: "center" }}>
                    Configure o tempo de foco, descanso curto, descanso longo
                </p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} className="form">
                    <div className="forRow">
                        <DefaultInput
                            id="workTime"
                            labelText="Foco"
                            ref={workTimeRef}
                            defaultValue={state.config.workTime}
                            type='number'
                        />
                    </div>

                    <div className="forRow">
                        <DefaultInput
                            id="shortBreakTime"
                            labelText="Descanso curto"
                            ref={shortBreakTimeRef}
                            defaultValue={state.config.shortBreakTime}
                            type='number'
                        />
                    </div>

                    <div className="forRow">
                        <DefaultInput
                            id="longBreakTime"
                            labelText="Descanso longo"
                            ref={longBreakTimeRef}
                            defaultValue={state.config.longBreakTime}
                            type='number'
                        />
                    </div>

                    <div className="forRow">
                        <DefaultButton
                            icon={<SaveIcon />}
                            aria-label="Salvar configurações"
                            title="Salvar"
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}
