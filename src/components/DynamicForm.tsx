import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import FieldPair from "./FieldPair";
import FormStateDisplay from "./FormStateDisplay";
import { FieldPair as FieldPairType, FormState } from "@/types/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fieldPairs: z
    .array(
      z.object({
        id: z.string(),
        inputValue: z.string().min(1, "Input is required"),
        selectValue: z.string().min(1, "Selection is required"),
      })
    )
    .min(1, "At least one field pair is required"),
});

const DynamicForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FieldPairType[]>([]);
  const { toast } = useToast();

  const methods = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldPairs: [{ id: uuidv4(), inputValue: "", selectValue: "" }],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const fieldPairs = watch("fieldPairs");

  const addFieldPair = () => {
    setValue("fieldPairs", [
      ...fieldPairs,
      { id: uuidv4(), inputValue: "", selectValue: "" },
    ]);
  };

  const removeFieldPair = (index: number) => {
    if (fieldPairs.length === 1) {
      toast({
        title: "Cannot remove",
        description: "At least one field pair is required",
        variant: "destructive",
      });
      return;
    }

    const newFieldPairs = [...fieldPairs];
    newFieldPairs.splice(index, 1);
    setValue("fieldPairs", newFieldPairs);
  };

  const onSubmit = (data: FormState) => {
    setSubmittedData(data.fieldPairs);
    toast({
      title: "Form submitted",
      description: `Successfully submitted ${data.fieldPairs.length} field pairs`,
    });
  };

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-6">Dynamic Form</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fieldPairs.map((field, index) => (
            <FieldPair
              key={field.id}
              index={index}
              onDelete={() => removeFieldPair(index)}
            />
          ))}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="button" onClick={addFieldPair} className="add-button">
              <Plus size={18} /> Add Field Pair
            </Button>

            <Button
              type="submit"
              className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm"
            >
              Submit Form
            </Button>
          </div>

          {errors.fieldPairs &&
            typeof errors.fieldPairs === "object" &&
            "message" in errors.fieldPairs && (
              <p className="text-destructive">
                {errors.fieldPairs.message?.toString()}
              </p>
            )}
        </form>
      </FormProvider>

      <FormStateDisplay fieldPairs={submittedData} />
    </div>
  );
};

export default DynamicForm;
