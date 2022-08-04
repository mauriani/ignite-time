import { useEffect, useContext } from "react";
import { differenceInSeconds } from "date-fns";
import { CountdownContainer, Separator } from "./styles";
import { CycleContext } from "../../index";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    markCycleAsNull,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  // guarda os segundos da task ativa
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  // guarda os seconds que se passaram
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  // exibe os valores de minutos e segundos
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  // preenche a minha string caso não tenha outro, ou seja meu numero vai ficar 09
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [activeCycle, minutes, seconds]);

  // agora precisamos reduzir o temp - amountSecondsPassed
  useEffect(() => {
    let interval: number;
    // se tiver um ciclo ativo, differenceInSeconds usado pois o set interval passa com um valor aproximado e nao exato
    if (activeCycle) {
      interval = setInterval(() => {
        // pego a data atual e comparo com a data de criação da task, assim consigo verificar quantos segundos passaram
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
          markCycleAsNull();
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    // Essa função serve para "limpar" o que eu estava fazendo no useEffect anterior
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    markCycleAsNull,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
