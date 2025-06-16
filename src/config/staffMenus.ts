
import {
  Users,
  UserCheck,
  Plus,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  Activity,
  Timer,
  Package,
  Receipt,
  CreditCard,
  DollarSign,
  MessageCircle,
  Briefcase,
  Phone,
  MessageSquare,
  Settings,
  CheckSquare,
  BarChart3,
  Warehouse,
  Eye
} from 'lucide-react';

import { MenuItem } from './systemMenus';

export const staffMenus = {
  patients: [
    { icon: Users, label: 'รายชื่อผู้ป่วย', path: '/staff/patients' },
    { icon: UserCheck, label: 'ข้อมูลผู้ป่วย', path: '/staff/patients/info' },
    { icon: Plus, label: 'เพิ่มผู้ป่วยใหม่', path: '/staff/patients/create' },
    { icon: FileText, label: 'ประวัติการรักษา', path: '/staff/patients/history' }
  ],
  appointments: [
    { icon: Calendar, label: 'รายการนัด', path: '/staff/appointments' },
    { icon: Clock, label: 'ปฏิทินนัดหมาย', path: '/staff/appointments/calendar' },
    { icon: Plus, label: 'จองนัดใหม่', path: '/staff/appointments/create' },
    { icon: AlertCircle, label: 'นัดวันนี้', path: '/staff/appointments/today' }
  ],
  treatments: [
    { icon: Activity, label: 'บันทึกการรักษา', path: '/staff/treatments' },
    { icon: Plus, label: 'สร้างบันทึกใหม่', path: '/staff/treatments/create' },
    { icon: Timer, label: 'ประวัติการรักษา', path: '/staff/treatments/history' },
    { icon: Package, label: 'คอร์สรักษา', path: '/staff/treatments/courses' }
  ],
  invoicing: [
    { icon: Receipt, label: 'ออกใบเสร็จ', path: '/staff/invoicing' },
    { icon: CreditCard, label: 'รับชำระเงิน', path: '/staff/invoicing/payment' },
    { icon: Plus, label: 'สร้างใบเสร็จใหม่', path: '/staff/invoicing/create' },
    { icon: DollarSign, label: 'ติดตามการชำระ', path: '/staff/invoicing/tracking' }
  ],
  followup: [
    { icon: MessageCircle, label: 'ติดตามลูกค้า', path: '/staff/followup' },
    { icon: Plus, label: 'สร้างการติดตาม', path: '/staff/followup/create' },
    { icon: Briefcase, label: 'งานที่ได้รับมอบหมาย', path: '/staff/followup/tasks' },
    { icon: Phone, label: 'โทรติดตาม', path: '/staff/followup/calls' }
  ],
  chat: [
    { icon: MessageSquare, label: 'แชทสนับสนุน', path: '/staff/chat' },
    { icon: MessageCircle, label: 'LINE / Facebook', path: '/staff/chat/social' },
    { icon: Timer, label: 'ประวัติการแชท', path: '/staff/chat/history' },
    { icon: Settings, label: 'ตั้งค่าแชท', path: '/staff/chat/settings' }
  ],
  tasks: [
    { icon: CheckSquare, label: 'รายการงาน', path: '/staff/tasks' },
    { icon: Calendar, label: 'ปฏิทินงาน', path: '/staff/tasks/calendar' },
    { icon: BarChart3, label: 'วิเคราะห์ประสิทธิภาพ', path: '/staff/tasks/analytics' },
    { icon: Plus, label: 'สร้างงานใหม่', path: '/staff/tasks/create' }
  ],
  product: [
    { icon: Warehouse, label: 'คลังสินค้า', path: '/staff/product/inventory' },
    { icon: Receipt, label: 'คำสั่งซื้อ', path: '/staff/product/orders' },
    { icon: Package, label: 'แคตตาล็อก', path: '/staff/product/catalog' }
  ],
  claim: [
    { icon: FileText, label: 'ภาพรวมเคลม', path: '/staff/claim' },
    { icon: Plus, label: 'สร้างเคลมใหม่', path: '/staff/claim/create' },
    { icon: Clock, label: 'ประวัติเคลม', path: '/staff/claim/history' },
    { icon: Eye, label: 'ติดตามสถานะ', path: '/staff/claim/tracking' }
  ]
};
