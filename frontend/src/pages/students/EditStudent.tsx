import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<{ name: string; avatar: string; notes: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/student/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student:", error));
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const response = await fetch(`/api/v1/student/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/students");
      } else {
        alert("Error saving student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save student");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setStudent((prev) => (prev ? { ...prev, avatar: imageUrl } : null));
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        {student ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
              <label htmlFor="avatar-input" className="cursor-pointer">
                <img
                  src={"/profile_pics/" + student.avatar}
                  alt="Student Avatar"
                  className="w-24 h-24 mx-auto rounded-full object-cover border"
                />
              </label>
              <Input
                id="avatar-input"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <Input name="name" required defaultValue={student.name} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Notes</label>
              <Textarea name="notes" rows={4} required defaultValue={student.notes} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        ) : (
          <p className="text-center text-gray-500">Loading student data...</p>
        )}
        <div id="loading-indicator" className={loading ? "block" : "hidden"}>
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </CardContent>
    </Card>
  );
}
