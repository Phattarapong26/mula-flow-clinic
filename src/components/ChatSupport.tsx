
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ChatSupportProps {
  onClose: () => void;
}

const ChatSupport = ({ onClose }: ChatSupportProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Chat Support
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            สวัสดีครับ! มีอะไรให้ช่วยเหลือไหมครับ?
          </p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="พิมพ์ข้อความของคุณ..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-600 transition-colors">
              ส่งข้อความ
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSupport;
