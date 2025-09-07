import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplate } from "../../Templates/MainTemplate";
import {useEffect} from "react";

export function Home() {
    useEffect(() => {
        document.title = "Técnica Pomodoro";
    }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  )
}
