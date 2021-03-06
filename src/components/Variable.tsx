/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import variable from "../types/variable";
import VariableName from "./Variable.name";

type Props = {
  variableValues: variable;
  passResolvedValue: (val: variable) => void;
  removeButtonAction: (val: variable) => void;
};

export default function Variable({
  variableValues,
  passResolvedValue,
  removeButtonAction,
}: Props): React.ReactElement {
  const [resolvedValue, setResolvedValue] = useState<variable>({
    id: variableValues.id,
    name: variableValues.name,
    value: variableValues.value,
  });

  // Watch for changes in resolved value of this node and pass it above:
  useEffect(() => {
    passResolvedValue(resolvedValue);
  }, [resolvedValue]);

  // Watch for changes in the option selected by the user and setState:
  const handleSelectChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    let newState: variable;
    if (target.value === "true") {
      newState = {
        id: resolvedValue.id,
        name: resolvedValue.name,
        value: true,
      };
    } else {
      newState = {
        id: resolvedValue.id,
        name: resolvedValue.name,
        value: false,
      };
    }
    setResolvedValue(newState);
  };

  // Watch for changes in the option selected by the user and setState:
  const handleNameChange = (newName: string): void => {
    const newState: variable = {
      id: resolvedValue.id,
      name: newName,
      value: resolvedValue.value,
    };
    setResolvedValue(newState);
  };

  const handleDeleteButtonClick = (): void => {
    removeButtonAction(resolvedValue);
  };

  return (
    <div className={`variable ${resolvedValue.value ? "truthy" : "falsy"}`}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col xs={4}>
            <VariableName givenValues={resolvedValue} passVariableName={handleNameChange} />
          </Col>
          <Col xs={1}>
            <Form.Label>=</Form.Label>
          </Col>
          <Col xs={5}>
            <Form.Select
              onChange={(e) => handleSelectChange(e)}
              defaultValue={resolvedValue.value ? "true" : "false"}
              size="sm"
            >
              <option value="true">TRUE</option>
              <option value="false">FALSE</option>
            </Form.Select>
          </Col>
          <Col xs={1}>
            <Button variant="danger" onClick={handleDeleteButtonClick} size="sm">
              x
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
