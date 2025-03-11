import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface FieldPairProps {
  index: number;
  onDelete: () => void;
}

const FieldPair: React.FC<FieldPairProps> = ({ index, onDelete }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const inputName = `fieldPairs.${index}.inputValue`;
  const selectName = `fieldPairs.${index}.selectValue`;

  const inputError = errors.fieldPairs?.[index]?.inputValue;
  const selectError = errors.fieldPairs?.[index]?.selectValue;

  return (
    <div className="field-pair">
      <div className="field-wrapper">
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Enter text"
              className={`w-full ${inputError ? "border-destructive" : ""}`}
              {...field}
            />
          )}
        />
        {inputError && (
          <span className="error-message">
            {inputError.message?.toString()}
          </span>
        )}
      </div>

      <div className="field-wrapper">
        <Controller
          name={selectName}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={`w-full ${selectError ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {selectError && (
          <span className="error-message">
            {selectError.message?.toString()}
          </span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="delete-button mt-1"
        type="button"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default FieldPair;
