
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];


const formSchema = z.object({
  fields: z.array(
    z.object({
      input: z.string().min(1, { message: "Input is required" }),
      select: z.string().min(1, { message: "Selection is required" }),
    })
  ).min(1),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fields: [{ input: "", select: "" }],
    },
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

 
  const formValues = watch();


  const onSubmit = async (data: FormValues) => {
    try {
     
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast.success("Form submitted successfully");
      
      
      console.log("Form data:", data);
  
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  
  const addNewField = () => {
    append({ input: "", select: "" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dynamic Form</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-3">
                <div className="flex-grow space-y-1">
                  <Controller
                    control={control}
                    name={`fields.${index}.input`}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          placeholder="Enter value"
                          className={`w-full ${
                            errors.fields?.[index]?.input ? "border-red-500" : ""
                          }`}
                        />
                        {errors.fields?.[index]?.input && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.fields[index]?.input?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="flex-grow space-y-1">
                  <Controller
                    control={control}
                    name={`fields.${index}.select`}
                    render={({ field }) => (
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              errors.fields?.[index]?.select ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.fields?.[index]?.select && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.fields[index]?.select?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      className="flex-shrink-0 h-10 w-10 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addNewField}
              className="mt-2 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Field
            </Button>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </form>
      </div>

     
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Form State</h3>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Input Value</TableHead>
                <TableHead>Select Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formValues.fields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{field.input || "—"}</TableCell>
                  <TableCell>
                    {field.select
                      ? OPTIONS.find((o) => o.value === field.select)?.label || field.select
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Form;
