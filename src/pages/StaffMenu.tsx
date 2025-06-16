
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Calendar, Users, FileText, MessageSquare, DollarSign, UserCheck, Package, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import MenuCard from "@/components/MenuCard";
import ChatSupport from "@/components/ChatSupport";
import { useAuth } from "@/contexts/AuthContext";

const StaffMenu = () => {
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    toast({
      title: "ออกจากระบบ",
      description: "กำลังออกจากระบบ...",
    });
    
    logout();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[100px]">
      {/* Header with Logo */}
      <header className="w-full flex justify-center py-8">
        <Logo />
      </header>

      {/* System Name */}
      <div className="w-full text-center text-teal-700 text-lg font-semibold tracking-wide mb-6">
        Staff Portal - Clinic Management
      </div>
      
      <hr className="max-w-4xl mx-auto w-full border-t border-teal-700/30 mb-8" />

      {/* Main Content */}
      <main className="flex-grow flex items-start justify-center px-6 pb-10">
        <div className="w-full max-w-4xl">
          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* 1. Task */}
            <Link to="/staff/tasks" className="block">
              <MenuCard 
                title="Task"
                icon={<Calendar size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
              />
            </Link>
            {/* 2. Appointment */}
            <Link to="/staff/appointments" className="block">
              <MenuCard 
                title="Appointment" 
                icon={<UserCheck size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1573497161079-f3fd25cc6b90?auto=format&fit=crop&w=400&q=80"
              />
            </Link>
            {/* 3. Claim */}
            <Link to="/staff/claim" className="block">
              <MenuCard 
                title="Claim"
                icon={<FileText size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
              />
            </Link>
            {/* 4. Product */}
            <Link to="/staff/product" className="block">
              <MenuCard 
                title="Product"
                icon={<Package size={32} />} 
                variant="secondary" 
              />
            </Link>
            {/* 5. Bill */}
            <Link to="/staff/invoicing" className="block">
              <MenuCard 
                title="Bill" 
                icon={<DollarSign size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
              />
            </Link>
            {/* 6. Chat Support */}
            <Link to="/staff/chat" className="block">
              <MenuCard 
                title="Chat Support"
                icon={<MessageSquare size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80"
              />
            </Link>
            {/* 7. Patient Management (spans 2 columns like Branch in main menu) */}
            <Link to="/staff/patients" className="block md:col-span-2">
              <MenuCard 
                title="Patient Management" 
                icon={<Users size={32} />} 
                variant="primary" 
                backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80"
                className="h-full"
              />
            </Link>
          </div>
          
          {/* Logout Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-md"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center justify-center bg-teal-700 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
          aria-label="Chat Support"
        >
          <span className="mr-2 hidden sm:inline">Chat Support</span>
          <MessageSquare size={24} />
        </button>
      </div>

      {/* Chat Support Dialog */}
      {isChatOpen && <ChatSupport onClose={() => setIsChatOpen(false)} />}

      {/* Footer */}
      <footer className="w-full text-center p-4 mt-8 text-teal-700">
        © 2025 Mula Global. สงวนลิขสิทธิ์ทั้งหมด
      </footer>
    </div>
  );
};

export default StaffMenu;
