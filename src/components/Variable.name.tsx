/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import "../App.css";
import { VariableContext } from "../contexts/variableContext";
import variable from "../types/variable";

type Props = {
  givenValues: variable;
  passVariableName: (val: string) => void;
};

export default function VariableName({ givenValues, passVariableName }: Props): React.ReactElement {
  const variableContext = useContext(VariableContext);

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [variableNameInModal, setVariableNameInModal] = useState<string>(givenValues.name);

  const handleVariableNameClick = (): void => {
    setAlertShow(false);
    setModalShow(true);
  };

  const handleCancelClick = (): void => {
    setModalShow(false);
  };

  const handleChangeClick = (): void => {
    if (variableNameInModal !== null) {
      const checkedVariable: variable | null = variableContext.getVariableByName(variableNameInModal);
      if (checkedVariable === null) {
        passVariableName(variableNameInModal);
        setModalShow(false);
        return;
      }
      // if here, there is another variable with the same name (but a different id)
      setAlertShow(true);
      return;
    }
    setModalShow(false);
  };

  const handleVariableNameChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setAlertShow(false);
    setVariableNameInModal(target.value);
  };

  const handleOnFocus = (): void => {
    setAlertShow(false);
  };

  return (
    <>
      <Form.Control
        id="name"
        type="text"
        maxLength={8}
        value={givenValues.name}
        size="sm"
        readOnly
        onClick={handleVariableNameClick}
      />

      <Modal show={modalShow} onHide={handleCancelClick} size="sm" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Change variable name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeClick();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter new name for &quot;{givenValues.name}&quot;</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                maxLength={8}
                onChange={handleVariableNameChange}
                onFocus={handleOnFocus}
              />
            </Form.Group>
          </Form>

          <Alert key="1" variant="danger" show={alertShow} dismissible onClose={() => setAlertShow(false)}>
            Variable &quot;{variableNameInModal}&quot; already exists.
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChangeClick}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
