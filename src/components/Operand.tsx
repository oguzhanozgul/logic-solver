/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import LogicNode from "./LogicNode";
import variable from "../types/variable";

type Props = {
  position: "left" | "right";
  passOperandValue: (position: "left" | "right", val: boolean) => void;
};

export default function Operand({ position, passOperandValue }: Props): React.ReactElement {
  const variableContext = useContext(VariableContext);

  const [operandValueSelection, setOperandValueSelection] = useState<string>("false");
  const [operandVariable, setOperandVariable] = useState<variable | null>(null);
  const [resolvedValue, setResolvedValue] = useState<boolean>(false);

  // Watch for changes in the option selected by the user and setStates:
  function handleChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    if (target.value === "true") {
      setOperandValueSelection("true");
      setOperandVariable(null);
      setResolvedValue(true);
      return;
    }
    if (target.value === "false") {
      setOperandValueSelection("false");
      setOperandVariable(null);
      setResolvedValue(false);
      return;
    }
    if (target.value === "operation") {
      setOperandValueSelection("operation");
      setOperandVariable(null);
      return;
    }
    // else, check if the target.value is a defined variable, and set the value accordingly.
    const returnedVariable = variableContext.getVariableByName(target.value);
    setOperandValueSelection(target.value);
    if (returnedVariable) {
      setResolvedValue(returnedVariable?.value);
      setOperandVariable({
        id: returnedVariable.id,
        name: returnedVariable.name,
        value: returnedVariable.value,
      });
    }
  }

  // Handle subNode result and setState:
  const handleSubNodeResult = (value: boolean): void => {
    if (value) {
      setResolvedValue(true);
    } else {
      setResolvedValue(false);
    }
  };

  // Watch for changes in the resolved value of this operand and pass it above:
  useEffect((): void => {
    passOperandValue(position, resolvedValue);
  }, [resolvedValue]);

  // check if the operand value is another operations result (a new logic node) and
  // if so, create a new node under this operand
  const nodeRender = (): React.ReactNode => {
    if (operandValueSelection === "operation") {
      return (
        <>
          <br />
          <LogicNode passResolvedValue={handleSubNodeResult} />
        </>
      );
    }
    return null;
  };

  useEffect((): void => {
    // run everytime the list of defined variables change
    // check if the current selection is a defined variable name
    if (operandVariable !== null) {
      // check if the variable still exists in the list of defined variables
      const possiblyUpdatedVariable = variableContext.getVariableById(operandVariable.id);
      if (possiblyUpdatedVariable !== null) {
        // check if the current selection has changed value, and update resolved value
        if (possiblyUpdatedVariable.value !== operandVariable.value) {
          const newOperandVariable = {
            id: operandVariable.id,
            name: operandVariable.name,
            value: possiblyUpdatedVariable.value,
          };
          setOperandVariable(newOperandVariable);
          setResolvedValue(possiblyUpdatedVariable.value);
        }
      } else {
        // being here means our selected variable was deleted
        setOperandValueSelection("true");
        setOperandVariable(null);
        setResolvedValue(true);
        console.log("you deleted my variable :(");
      }
    }
  }, [variableContext.variables]);

  return (
    <div className={`operand ${resolvedValue ? "truthy" : "falsy"}`}>
      {operandVariable ? <label htmlFor="val">Variable: </label> : <label htmlFor="val">Value: </label>}
      <select id="val" className="short-width" onChange={(e) => handleChange(e)} defaultValue="false">
        <option value="true">TRUE</option>
        <option value="false">FALSE</option>
        <option value="operation">Operation...</option>
        {variableContext.variables?.map((element) => {
          return (
            <option value={element.name} key={element.id}>
              {element.name}
            </option>
          );
        })}
      </select>
      {nodeRender()}
    </div>
  );
}
