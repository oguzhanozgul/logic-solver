/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import variable from "../types/variable";

export default function VariableAdder(): React.ReactElement {
  const variableContext = useContext(VariableContext);

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [variableName, setVariableName] = useState<string | null>(null);

  const handleMainAddButtonClick = (): void => {
    setVariableName(null);
    setAlertShow(false);
    setModalShow(true);
  };

  const handleCancelClick = (): void => {
    setModalShow(false);
  };

  const handleAddClick = (): void => {
    if (variableName !== null) {
      const newVariable: variable | null = variableContext.addVariable(variableName);
      if (newVariable === null) {
        setAlertShow(true);
        return;
      }
      setModalShow(false);
    }
    setModalShow(false);
  };

  const handleVariableNameChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setVariableName(target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleMainAddButtonClick}>
        Add variable
      </Button>
      <br />

      <Modal show={modalShow} onHide={handleCancelClick} size="sm" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add variable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddClick();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter variable name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                maxLength={8}
                onChange={handleVariableNameChange}
              />
            </Form.Group>
          </Form>
          <Alert key="1" variant="danger" show={alertShow} dismissible onClose={() => setAlertShow(false)}>
            Variable &quot;{variableName}&quot; already exists.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
