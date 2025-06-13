
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Stethoscope, 
  CalendarDays, 
  FileText, 
  Users, 
  Pill, 
  Activity,
  Clock,
  MessageSquare
} from "lucide-react";

interface DoctorMenuProps {
  onMenuSelect: (menu: string) => void;
}

const menuItems = [
  {
    id: "appointments",
    title: "Today's Appointments",
    description: "View and manage today's patient appointments",
    icon: CalendarDays,
    color: "bg-blue-500"
  },
  {
    id: "patients",
    title: "Patient Records",
    description: "Access patient medical history and records",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: "consultations",
    title: "Consultations",
    description: "Current and upcoming consultations",
    icon: Stethoscope,
    color: "bg-purple-500"
  },
  {
    id: "prescriptions",
    title: "Prescriptions",
    description: "Manage prescriptions and medications",
    icon: Pill,
    color: "bg-orange-500"
  },
  {
    id: "medical-reports",
    title: "Medical Reports",
    description: "Generate and view medical reports",
    icon: FileText,
    color: "bg-indigo-500"
  },
  {
    id: "vitals",
    title: "Patient Vitals",
    description: "Monitor patient vital signs and health metrics",
    icon: Activity,
    color: "bg-red-500"
  },
  {
    id: "schedule",
    title: "My Schedule",
    description: "View and manage your work schedule",
    icon: Clock,
    color: "bg-teal-500"
  },
  {
    id: "notes",
    title: "Clinical Notes",
    description: "Patient notes and observations",
    icon: MessageSquare,
    color: "bg-yellow-500"
  }
];

export function DoctorMenu({ onMenuSelect }: DoctorMenuProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Portal</h2>
        <p className="text-gray-600">Manage your patients and consultations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onMenuSelect(item.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMenuSelect(item.id);
                  }}
                >
                  Open {item.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
