import React, { useEffect, useState } from "react";
import { TodosDayList } from "./TodosDayList";
import { TodosInitButton } from "./TodosInitButton";
import { TodosPanel } from "./TodosPanel";
import { TodosWeekSummaryPanel } from "./TodosWeekSummaryPanel";

export function Todos() {
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const handler = () => setCounter(counter + 1);
    window.addEventListener("focus", handler);
    return () => {
      window.removeEventListener("focus", handler);
    };
  }, [counter, setCounter]);

  return (
    <div className="todos">
      {/* use key to re-mount the init button when the browser gains focus so that
      when toolkit re-gains focus after long unuse it knows whether it should
      display the init button or not */}
      <TodosInitButton key={counter} />
      <TodosDayList />
      <TodosPanel />
      <TodosWeekSummaryPanel />
    </div>
  );
}
