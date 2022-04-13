import operatorType from "../types/operatorType";

export default function Operation(
  operator: operatorType,
  leftOperandValue: boolean,
  rightOperandValue: boolean,
): boolean {
  let result: boolean = false;
  switch (operator) {
    case operatorType.AND:
      result = leftOperandValue && rightOperandValue;
      break;
    case operatorType.OR:
      result = leftOperandValue || rightOperandValue;
      break;
    case operatorType.NOT:
      result = !leftOperandValue;
      break;
    case operatorType.XOR:
      result = (leftOperandValue && !rightOperandValue) || (!leftOperandValue && rightOperandValue);
      break;
    case operatorType.NAND:
      result = !(leftOperandValue && rightOperandValue);
      break;
    case operatorType.NOR:
      result = !(leftOperandValue || rightOperandValue);
      break;
    default:
      break;
  }
  return result;
}
