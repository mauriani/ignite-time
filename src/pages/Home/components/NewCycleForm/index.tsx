import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CyclesContext";

import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id={"task"}
        list={"task-suggestions"}
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="banana"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id={"minutesAmount"}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
