import React, { createContext, useState, useEffect } from "react";
import variable from "../types/variable";

type Props = {
  children: React.ReactNode;
};

type VariableContextType = {
  variables: variable[];
  addVariable: () => void;
  setVariable: (x: variable) => void;
  removeVariable: (x: variable) => void;
  getVariableByName: (x: string) => variable | null;
  getVariableById: (x: number) => variable | null;
};

const defaultState: VariableContextType = {
  variables: [],
  addVariable: () => {},
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

  const addVariable = (): void => {
    if (variables) {
      const newId = lastId + 1;
      setLastID(newId);
      const newVariables = [...variables];
      newVariables.push({ id: newId, name: "", value: false });
      setVariables(newVariables);
    } else {
      setVariables([{ id: 0, name: "", value: false }]);
    }
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
