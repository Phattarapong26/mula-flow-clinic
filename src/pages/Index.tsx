
import { useState } from "react";
import { RoleSelection } from "@/components/RoleSelection";
import { SystemLayout } from "@/components/SystemLayout";
import { CeoMenu } from "@/components/CeoMenu";
import { DoctorMenu } from "@/components/DoctorMenu";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedMenu(null);
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    console.log(`Selected menu: ${menu} for role: ${selectedRole}`);
  };

  const handleLogout = () => {
    setSelectedRole(null);
    setSelectedMenu(null);
  };

  // Show role selection if no role is selected
  if (!selectedRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Show menu based on selected role
  const renderMenu = () => {
    switch (selectedRole) {
      case "ceo":
        return <CeoMenu onMenuSelect={handleMenuSelect} />;
      case "doctor":
        return <DoctorMenu onMenuSelect={handleMenuSelect} />;
      case "nurse":
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nurse Portal</h2>
            <p className="text-gray-600">Nurse menu coming soon...</p>
          </div>
        );
      case "receptionist":
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Receptionist Portal</h2>
            <p className="text-gray-600">Receptionist menu coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
            <p className="text-gray-600">Please select a valid role.</p>
          </div>
        );
    }
  };

  return (
    <SystemLayout
      userRole={selectedRole}
      userName={`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`}
      onLogout={handleLogout}
    >
      {renderMenu()}
    </SystemLayout>
  );
};

export default Index;
