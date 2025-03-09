// components/EditableDate.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableDateProps {
  value: Date;
  onSave: (newDate: Date) => void;
}

export function EditableDate({ value, onSave }: EditableDateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(value);

  const handleSave = () => {
    onSave(date);
    setIsEditing(false);
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <Input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span>{value.toLocaleDateString()}</span>
      )}
    </div>
  );
}
