import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { VariableContextProvider } from "./contexts/variableContext";
import LogicNode from "./components/LogicNode";
import VariableGroup from "./components/Variable.group";

function App(): React.ReactElement {
  const [finalResult, setFinalResult] = useState<boolean | null>(null);

  const displayFinalResult = (value: boolean): void => {
    setFinalResult(value);
  };

  return (
    <VariableContextProvider>
      <>
        <div className="App">
          <h2>Logic Solver</h2>
          <h4>Final result is: {finalResult?.toString()}</h4>
          <br />
        </div>
        <div className="working-area">
          <VariableGroup />
          <LogicNode passResolvedValue={displayFinalResult} />
        </div>
      </>
    </VariableContextProvider>
  );
}

export default App;
