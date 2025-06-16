import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import RoleSelector from "@/components/auth/RoleSelector";
import SecureInput from "@/components/security/SecureInput";
import { loginSchema, validateForm } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "ceo"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const validation = validateForm(formData, loginSchema);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        toast({
          title: "ข้อมูลไม่ถูกต้อง",
          description: "กรุณาตรวจสอบข้อมูลที่กรอก",
          variant: "destructive"
        });
        return;
      }

      // Clear errors
      setErrors({});

      // Attempt login
      await login(validation.data.username, validation.data.password);
      
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "กำลังโหลดหน้าหลัก...",
      });

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: error instanceof Error ? error.message : "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-slate-100 to-indigo-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">
          ระบบเข้าสู่ระบบ
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              ชื่อผู้ใช้
            </label>
            <SecureInput
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              validation={{
                pattern: /^[a-zA-Z0-9_]+$/,
                maxLength: 50,
                required: true
              }}
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              รหัสผ่าน
            </label>
            <SecureInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              validation={{
                minLength: 8,
                maxLength: 128,
                required: true
              }}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>
          
          <RoleSelector 
            value={formData.role} 
            onChange={(value) => handleInputChange('role', value)} 
          />
          {errors.role && (
            <p className="text-sm text-red-600 mt-1">{errors.role}</p>
          )}
          
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
