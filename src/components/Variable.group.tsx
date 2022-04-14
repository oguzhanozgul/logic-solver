/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import variable from "../types/variable";
import Variable from "./Variable";
import VariableAdder from "./Variable.adder";

export default function VariableGroup(): React.ReactElement {
  const variableContext = useContext(VariableContext);

  const [variables, setVariables] = useState<variable[] | null>(null);

  // useEffect(() => {
  //   setVariables(variableContext.variables);
  // }, [variableContext]);

  return (
    <div className="variable-group">
      <VariableAdder />
      {variableContext.variables?.map((element) => {
        return (
          <div key={element.id}>
            <Variable
              variableValues={{ id: element.id, name: element.name, value: element.value }}
              passResolvedValue={variableContext.setVariable}
              removeButtonAction={variableContext.removeVariable}
            />
            {/* {variables?.map((element) => {
        return (
          <div key={element.id}>
            <Variable
              variableValues={{ id: element.id, name: element.name, value: element.value }}
              passResolvedValue={variableContext.setVariable}
              removeButtonAction={variableContext.removeVariable}
            /> */}
          </div>
        );
      })}
    </div>
  );
}
