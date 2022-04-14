/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import variable from "../types/variable";

export default function VariableAdder(): React.ReactElement {
  const variableContext = useContext(VariableContext);

  const [show, setShow] = useState<boolean>(false);
  //  variableContext.addVariable("dneme");

  const handleMainAddButtonClick = (): void => {
    setShow(true);
  };

  const handleCancelClick = (): void => {
    setShow(false);
  };

  const handleAddClick = (): void => {
    const newVariable: variable | null = variableContext.addVariable("deneme");
    if (newVariable === null) {
      // show alert
      return;
    }
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleMainAddButtonClick}>
        Add variable
      </Button>
      <br />
      <Modal show={show} onHide={handleCancelClick} size="sm" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add variable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Variable name</Form.Label>
              <Form.Control type="text" placeholder="" autoFocus maxLength={8} />
            </Form.Group>
          </Form>
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
