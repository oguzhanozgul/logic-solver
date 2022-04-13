/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import operatorType from "../types/operatorType";
import "../App.css";

type Props = {
  passOperatorType: (type: operatorType) => void;
};

export default function Operator({ passOperatorType }: Props): React.ReactElement {
  function handleChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    passOperatorType(target.value as operatorType);
  }

  return (
    <div className="operator">
      {/* <select id="val" onChange={(e) => handleChange(e)} defaultValue={operatorType.AND}>
        {Object.keys(operatorType)}
        <option value={operatorType.AND}>AND</option>
        <option value={operatorType.OR}>OR</option>
        <option value={operatorType.XOR}>XOR</option>
        <option value={operatorType.NAND}>NAND</option>
        <option value={operatorType.NOR}>NOR</option>
      </select> */}
      <Form.Select id="val" onChange={(e) => handleChange(e)} defaultValue={operatorType.AND}>
        <option value={operatorType.AND}>AND</option>
        <option value={operatorType.OR}>OR</option>
        <option value={operatorType.XOR}>XOR</option>
        <option value={operatorType.NAND}>NAND</option>
        <option value={operatorType.NOR}>NOR</option>
      </Form.Select>
    </div>
  );
}
