import React, { createContext, useState, useEffect } from "react";
import variable from "../types/variable";

type Props = {
  children: React.ReactNode;
};

type VariableContextType = {
  variables: variable[];
  addVariable: (x: string) => variable | null;
  setVariable: (x: variable) => void;
  removeVariable: (x: variable) => void;
  getVariableByName: (x: string) => variable | null;
  getVariableById: (x: number) => variable | null;
};

const defaultState: VariableContextType = {
  variables: [],
  addVariable: (x: string): variable | null => {
    return null;
  },
  setVariable: (x: variable) => {},
  removeVariable: (x: variable) => {},
  getVariableByName: (x: string): variable | null => {
    return null;
  },
  getVariableById: (x: number): variable | null => {
    return null;
  },
};

// create context
const VariableContext = createContext<VariableContextType>(defaultState);

function VariableContextProvider({ children }: Props): React.ReactElement {
  const [variables, setVariables] = useState<variable[]>([]);
  const [lastId, setLastID] = useState<number>(0);

  useEffect(() => {
    console.log("Variable list:");
    variables?.forEach((x) => console.log(x));
  }, [variables]);

  const getVariableByName = (variableName: string): variable | null => {
    const indexOfVariable = variables.findIndex((element) => {
      return element.name === variableName;
    });
    if (indexOfVariable > -1) {
      return variables[indexOfVariable];
    }
    return null;
  };

  const getVariableById = (variableId: number): variable | null => {
    const indexOfVariable = variables.findIndex((element) => {
      return element.id === variableId;
    });
    if (indexOfVariable > -1) {
      return variables[indexOfVariable];
    }
    return null;
  };

  const addVariable = (variableName: string): variable | null => {
    if (variables?.length > 0) {
      // check if variable name exists push it to the state
      if (getVariableByName(variableName) === null) {
        const newId = lastId + 1;
        setLastID(newId);
        const newVariables = [...variables];

        const addedVariable: variable = { id: newId, name: variableName, value: false };
        newVariables.push(addedVariable);
        setVariables(newVariables);
      }
    } else {
      const addedVariable: variable = { id: 0, name: variableName, value: false };
      setVariables([addedVariable]);
      return addedVariable;
    }
    return null;
  };

  const setVariable = (variableNameAndValue: variable): void => {
    if (variables) {
      const newVariables = [...variables];
      const indexOfVariable = newVariables.findIndex((element) => {
        return element.id === variableNameAndValue.id;
      });
      newVariables[indexOfVariable].name = variableNameAndValue.name;
      newVariables[indexOfVariable].value = variableNameAndValue.value;
      setVariables(newVariables);
    }
  };

  const removeVariable = (variableNameAndValue: variable): void => {
    // remove the variable from the list
    if (variables) {
      const newVariables = [...variables];
      const indexOfVariable = newVariables.findIndex((element) => {
        return element.id === variableNameAndValue.id;
      });
      if (indexOfVariable > -1) {
        newVariables.splice(indexOfVariable, 1);
      }
      setVariables(newVariables);
    }
  };

  return (
    <VariableContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        variables,
        addVariable,
        setVariable,
        removeVariable,
        getVariableByName,
        getVariableById,
      }}
    >
      {children}
    </VariableContext.Provider>
  );
}

export { VariableContext, VariableContextProvider };
