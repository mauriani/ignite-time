import { createContext, useState, ReactNode } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  markCycleAsNull: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CyclesContextType);

// typagem do filho
interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // guarda o tanto de segundos que passou desde que a task foi criada
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // guarda as informações da task ativa
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function markCycleAsNull() {
    setActiveCycleId(null);
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: any) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        markCycleAsNull,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
