
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const roles = [
  { value: "ceo", label: "CEO" },
  { value: "staff", label: "Staff" },
];

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 w-full">
      <Label className="mb-2 block">เลือกบทบาท (Role):</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex gap-6"
      >
        {roles.map((r) => (
          <div key={r.value} className="flex items-center space-x-2">
            <RadioGroupItem value={r.value} id={`role-${r.value}`} />
            <Label htmlFor={`role-${r.value}`}>{r.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RoleSelector;
