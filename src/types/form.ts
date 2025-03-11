export interface FieldPair {
  id: string;
  inputValue: string;
  selectValue: string;
}

export interface FormState {
  fieldPairs: FieldPair[];
}
