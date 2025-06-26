import { useState, useEffect } from "react";
import { CheckIcon, User, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


interface AssignStudentsFormProps {
  eventId: number;
  eventName: string;
  open: boolean;
  studentsAsigned: number[]
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AssignStudentsForm = ({
  eventId,
  eventName,
  open,
  onOpenChange,
  onSuccess,
  studentsAsigned
}: AssignStudentsFormProps) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  interface Student {
    id: number;
    name: string;
  }

  const [mockStudents, setMockStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/v1/students");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setMockStudents(data);
        setSelectedStudents(studentsAsigned);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students. Please try again.");
      }
    };

    fetchStudents();
  }, []);

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === mockStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(mockStudents.map(student => student.id));
    }
  };

  const handleSubmit = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to assign");
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmAssignment = async () => {
    setIsSubmitting(true);
    setShowConfirmDialog(false);

    try {
      const formData = new FormData();
      formData.append("studentIdsToAssign", JSON.stringify(selectedStudents));
      formData.append('eventId', eventId.toString());
      const response = await fetch('/api/v1/event-assignment', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      toast.success(`Se asignaron ${selectedStudents.length} estudiantes al evento: ${eventName}`);
      setSelectedStudents([]);
      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error assigning students:", error);
      toast.error("Failed to assign students. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Student List Item Component
  const StudentListItem = ({
    student,
    isSelected,
    onToggle
  }: {
    student: Student;
    isSelected: boolean;
    onToggle: () => void;
  }) => (
    <div
      key={student.id}
      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted"
    >
      <Checkbox
        id={`student-${student.id}`}
        checked={isSelected}
        onCheckedChange={onToggle}
      />
      <label
        htmlFor={`student-${student.id}`}
        className="flex-1 flex items-center cursor-pointer"
      >
        <div className="h-8 w-8 rounded-full bg-muted-foreground/10 flex items-center justify-center mr-2">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-sm font-medium">{student.name}</div>
        </div>
      </label>
    </div>
  );

  // Student List Component
  const StudentList = ({
    students,
    selectedStudents,
    onStudentToggle,
    onSelectAll
  }: {
    students: Student[];
    selectedStudents: number[];
    onStudentToggle: (id: number) => void;
    onSelectAll: () => void;
  }) => (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="selectAll"
            checked={selectedStudents.length === students.length}
            onCheckedChange={onSelectAll}
          />
          <label
            htmlFor="selectAll"
            className="text-sm font-medium cursor-pointer"
          >
            Select All
          </label>
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedStudents.length} of {students.length} selected
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="space-y-2 pr-1">
          {students.map((student) => (
            <StudentListItem
              key={student.id}
              student={student}
              isSelected={selectedStudents.includes(student.id)}
              onToggle={() => onStudentToggle(student.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-lg">
          {/*Header*/}
          <SheetHeader>
            <SheetTitle>Assign Students to Event</SheetTitle>
            <SheetDescription>
              Select the students you want to assign to "{eventName}"
            </SheetDescription>
          </SheetHeader>

          {/*Students List*/}
          <div className="flex-1 overflow-hidden">
            <StudentList
              students={mockStudents}
              selectedStudents={selectedStudents}
              onStudentToggle={handleStudentToggle}
              onSelectAll={handleSelectAll}
            />
          </div>

          {/*Buttons*/}
          <div className="flex flex-row gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2"
              disabled={selectedStudents.length === 0 || isSubmitting}
            >
              <Users className="h-4 w-4" />
              Assign {selectedStudents.length > 0 && selectedStudents.length} Student{selectedStudents.length !== 1 && 's'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Student Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to assign {selectedStudents.length} student{selectedStudents.length !== 1 && 's'} to "{eventName}"?
              This will send notifications to the students and their guardians.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAssignment}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <CheckIcon className="mr-2 h-4 w-4" />
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AssignStudentsForm;