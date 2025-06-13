
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  CalendarDays, 
  DollarSign, 
  Settings, 
  FileText,
  UserPlus,
  Building
} from "lucide-react";

interface CeoMenuProps {
  onMenuSelect: (menu: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Overview of clinic performance",
    icon: BarChart3,
    color: "bg-blue-500"
  },
  {
    id: "staff-management",
    title: "Staff Management",
    description: "Manage doctors, nurses, and staff",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: "appointments",
    title: "Appointments",
    description: "View and manage all appointments",
    icon: CalendarDays,
    color: "bg-purple-500"
  },
  {
    id: "financial",
    title: "Financial Reports",
    description: "Revenue, expenses, and analytics",
    icon: DollarSign,
    color: "bg-yellow-500"
  },
  {
    id: "patients",
    title: "Patient Management",
    description: "Patient records and history",
    icon: UserPlus,
    color: "bg-indigo-500"
  },
  {
    id: "clinic-settings",
    title: "Clinic Settings",
    description: "Configure clinic operations",
    icon: Building,
    color: "bg-orange-500"
  },
  {
    id: "reports",
    title: "Reports",
    description: "Generate various reports",
    icon: FileText,
    color: "bg-red-500"
  },
  {
    id: "system-settings",
    title: "System Settings",
    description: "System configuration and preferences",
    icon: Settings,
    color: "bg-gray-500"
  }
];

export function CeoMenu({ onMenuSelect }: CeoMenuProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">CEO Dashboard</h2>
        <p className="text-gray-600">Manage your clinic operations</p>
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
