import React from "react";
import { FieldPair } from "../types/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FormStateDisplayProps {
  fieldPairs: FieldPair[];
}

const FormStateDisplay: React.FC<FormStateDisplayProps> = ({ fieldPairs }) => {
  if (!fieldPairs.length) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Form State</h3>
        <p className="text-muted-foreground">
          No data yet. Please fill and submit the form.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">Form State</h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Field #</TableHead>
            <TableHead>Input Value</TableHead>
            <TableHead>Select Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fieldPairs.map((pair, index) => (
            <TableRow key={pair.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{pair.inputValue || "-"}</TableCell>
              <TableCell>{pair.selectValue || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FormStateDisplay;
