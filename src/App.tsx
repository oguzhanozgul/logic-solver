import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { VariableContextProvider } from "./contexts/variableContext";
import LogicNode from "./components/LogicNode";
import variable from "./types/variable";
import VariableGroup from "./components/VariableGroup";

function App(): React.ReactElement {
  // Handle changes in operand values and setState
  const displayFinalResult = (value: boolean): React.ReactNode => {
    console.log(`Final result ${value}`);
    return { value };
  };

  // Handle changes in operand values and setState
  const mockVariableValues = (value: variable[]): React.ReactNode => {
    return { value };
  };

  return (
    <VariableContextProvider>
      <>
        <div className="App">
          <h2>Logic Solver</h2>
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
