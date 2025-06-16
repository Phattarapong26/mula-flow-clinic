
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BranchFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (branch: { id?: string; name: string; address: string; manager: string; area: string; status?: string; }) => void;
  initialBranch?: { id?: string; name: string; address: string; manager: string; area: string; status?: string; };
}

const BranchFormDialog: React.FC<BranchFormDialogProps> = ({
  open,
  onClose,
  onSave,
  initialBranch,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    setName(initialBranch?.name || "");
    setAddress(initialBranch?.address || "");
    setManager(initialBranch?.manager || "");
    setArea(initialBranch?.area || "");
  }, [initialBranch, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialBranch?.id ? { id: initialBranch.id } : {}),
      name,
      address,
      manager,
      area,
      status: initialBranch?.status || "active",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialBranch ? "แก้ไขสาขา" : "เพิ่มสาขา"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm text-gray-700">ชื่อสาขา</label>
              <Input required value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อสาขา" />
            </div>
            <div>
              <label className="text-sm text-gray-700">ที่อยู่</label>
              <Input required value={address} onChange={e => setAddress(e.target.value)} placeholder="ที่อยู่" />
            </div>
            <div>
              <label className="text-sm text-gray-700">ผู้จัดการสาขา</label>
              <Input required value={manager} onChange={e => setManager(e.target.value)} placeholder="ผู้จัดการ" />
            </div>
            <div>
              <label className="text-sm text-gray-700">พื้นที่ (เช่น สยาม, เอกมัย, ...)</label>
              <Input required value={area} onChange={e => setArea(e.target.value)} placeholder="พื้นที่" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>ยกเลิก</Button>
            <Button type="submit">{initialBranch ? "บันทึก" : "เพิ่ม"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BranchFormDialog;
