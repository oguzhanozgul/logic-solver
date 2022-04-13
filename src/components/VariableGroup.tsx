/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import variable from "../types/variable";
import Variable from "./Variable";

type variables = variable[];

export default function VariableGroup(): React.ReactElement {
  const variableContext = useContext(VariableContext);

  return (
    <div className="variable-group">
      <Button variant="primary" onClick={variableContext.addVariable}>
        Add variable
      </Button>
      {variableContext.variables?.map((element) => {
        return (
          <div key={element.id}>
            <Variable
              variableValues={{ id: element.id, name: element.name, value: element.value }}
              passResolvedValue={variableContext.setVariable}
              removeButtonAction={variableContext.removeVariable}
            />
          </div>
        );
      })}
    </div>
  );
}