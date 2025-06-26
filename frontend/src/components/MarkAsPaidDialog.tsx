import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, Upload, X, FileText } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    paymentAmount: z.string().min(1, "Amount is required"),
    paymentDate: z.date({
        required_error: "Payment date is required",
    }),
    receiptFiles: z.array(z.instanceof(File)).optional(),
});


type FormValues = z.infer<typeof formSchema>;

interface MarkAsPaidDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    studentId: number;
    studentName: string;
    eventAmount: number;
    eventID: number;
    onSuccess: () => void;
}

export function MarkAsPaidDialog({
    open,
    onOpenChange,
    studentId,
    studentName,
    eventAmount,
    eventID,
    onSuccess,
}: MarkAsPaidDialogProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            paymentAmount: eventAmount.toString(),
            receiptFiles: [],
        },
    });

    useEffect(() => {
        if (open) {
          setFiles([]);
          form.reset({
            paymentAmount: eventAmount.toString(),
            receiptFiles: [],
          });
        }
      }, [open, eventAmount, form]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        form.setValue("receiptFiles", [...files, ...selectedFiles]);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        form.setValue("receiptFiles", newFiles);
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('paymentAmount', data.paymentAmount);
            formData.append('paymentDate', data.paymentDate.toISOString());
            files.forEach((file) => {
                formData.append('files', file);
            });


            const response = await fetch(`/api/v1/event/${eventID}/student/${studentId}/payment`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add student');
            }

            onSuccess();
            onOpenChange(false);
        } catch (error) {

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Actualizar estado de pago</DialogTitle>
                    <DialogDescription>
                        Ingresa los detalles del pago para: <strong>{studentName}</strong>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="paymentAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                step="1"
                                                placeholder="0"
                                                className="pl-9"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="paymentDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha de pago</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Selecciona fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}

                                                className="p-3 pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Comprobantes</FormLabel>
                            <div className="grid w-full items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Subir comprobantes
                                </Button>
                                <Input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                {files.length > 0 && (
                                    <div className="border rounded-md p-2 space-y-2">
                                        <p className="text-sm text-muted-foreground">Archivos subidos:</p>
                                        <div className="space-y-2">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                                                    <div className="flex items-center">
                                                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        <span className="text-sm truncate max-w-[280px]">{file.name}</span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFile(index)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Limpiar</span>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormItem>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Subir pago"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}