
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Stethoscope, Users, CalendarCheck } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const roles = [
  {
    id: "ceo",
    title: "CEO/Admin",
    description: "Manage clinic operations, staff, and business analytics",
    icon: UserCog,
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Patient consultations, medical records, and treatment plans",
    icon: Stethoscope,
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    id: "nurse",
    title: "Nurse",
    description: "Patient care, medication management, and vital signs",
    icon: Users,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    id: "receptionist",
    title: "Receptionist",
    description: "Appointments, patient registration, and front desk operations",
    icon: CalendarCheck,
    color: "bg-orange-500 hover:bg-orange-600"
  }
];

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Mula Flow Clinic
          </h1>
          <p className="text-xl text-gray-600">
            Select your role to continue
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {role.description}
                  </CardDescription>
                  <Button 
                    className={`w-full mt-4 ${role.color} text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
