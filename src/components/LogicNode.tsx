/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import operatorType from "../types/operatorType";
import "../App.css";
import Operand from "./Operand";
import Operator from "./Operator";
import Operation from "../functions/Operation";

type Props = {
  passResolvedValue: (val: boolean) => void;
};

type OpAndOpValues = {
  leftOperandValue: boolean;
  rightOperandValue: boolean;
  operatorType: operatorType;
};

export default function LogicNode({ passResolvedValue }: Props): React.ReactElement {
  const [opAndOpValues, setOpAndOpValues] = useState<OpAndOpValues>({
    leftOperandValue: false,
    rightOperandValue: false,
    operatorType: operatorType.AND,
  });
  const [resolvedValue, setResolvedValue] = useState<boolean>(false);

  // Watch for changes in the operator or operand values and calculate the resolved value of this node:
  useEffect(() => {
    setResolvedValue(
      Operation(opAndOpValues.operatorType, opAndOpValues.leftOperandValue, opAndOpValues.rightOperandValue),
    );
  }, [opAndOpValues]);

  // Watch for changes in resolved value of this node and pass it above:
  useEffect(() => {
    if (passResolvedValue) {
      passResolvedValue(resolvedValue);
    }
  }, [resolvedValue]);

  // Handle changes in operand values and setState
  const handleOperandValueChange = (position: "left" | "right", value: boolean): void => {
    const newValuesState: OpAndOpValues = {
      leftOperandValue: position === "left" ? value : opAndOpValues.leftOperandValue,
      rightOperandValue: position === "right" ? value : opAndOpValues.rightOperandValue,
      operatorType: opAndOpValues.operatorType,
    };
    setOpAndOpValues(newValuesState);
  };

  // Handle changes in operator value and setState
  const handleOperatorValueChange = (value: operatorType): void => {
    const newValuesState: OpAndOpValues = {
      leftOperandValue: opAndOpValues.leftOperandValue,
      rightOperandValue: opAndOpValues.rightOperandValue,
      operatorType: opAndOpValues.operatorType,
    };
    switch (value) {
      case operatorType.AND:
        newValuesState.operatorType = operatorType.AND;
        break;
      case operatorType.OR:
        newValuesState.operatorType = operatorType.OR;
        break;
      case operatorType.XOR:
        newValuesState.operatorType = operatorType.XOR;
        break;
      case operatorType.NAND:
        newValuesState.operatorType = operatorType.NAND;
        break;
      case operatorType.NOR:
        newValuesState.operatorType = operatorType.NOR;
        break;
      default:
    }
    setOpAndOpValues(newValuesState);
  };

  return (
    <div className={`node ${resolvedValue ? "truthy" : "falsy"}`}>
      <div className="result-display">{resolvedValue.toString()}</div>
      <div className="operand-group">
        <Operand position="left" passOperandValue={handleOperandValueChange} />
      </div>
      <Operator passOperatorType={handleOperatorValueChange} />
      <div className="operand-group">
        <Operand position="right" passOperandValue={handleOperandValueChange} />
      </div>
    </div>
  );
}
