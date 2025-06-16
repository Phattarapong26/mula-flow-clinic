
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  FileText, 
  Calendar,
  Edit,
  CreditCard
} from 'lucide-react';
import { Patient } from '@/data/patientMockData';

interface PatientProfileProps {
  patient: Patient;
  onEdit?: () => void;
}

const PatientProfile = ({ patient, onEdit }: PatientProfileProps) => {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            ข้อมูลส่วนตัว
          </CardTitle>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              แก้ไข
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{patient.fullName}</h2>
              <p className="text-gray-600">
                อายุ {calculateAge(patient.dateOfBirth)} ปี • 
                {patient.gender === 'male' ? ' ชาย' : patient.gender === 'female' ? ' หญิง' : ' อื่นๆ'}
              </p>
              <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                {patient.status === 'active' ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">วันเกิด</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{new Date(patient.dateOfBirth).toLocaleDateString('th-TH')}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">หมายเลขผู้ป่วย</label>
              <p className="font-mono">{patient.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">เบอร์โทรศัพท์</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{patient.phone}</span>
              </div>
            </div>
            {patient.email && (
              <div>
                <label className="text-sm font-medium text-gray-500">อีเมล</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{patient.email}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            ที่อยู่
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{patient.address.street}</p>
          <p>{patient.address.district} {patient.address.province} {patient.address.postalCode}</p>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            ผู้ติดต่อฉุกเฉิน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-semibold">{patient.emergencyContact.name}</p>
            <p className="text-gray-600">{patient.emergencyContact.relationship}</p>
            <p className="text-gray-600">{patient.emergencyContact.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            ประวัติการรักษา
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">ประวัติการแพ้</label>
            <div className="mt-1">
              {patient.medicalHistory.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="text-red-700 border-red-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">ไม่มี</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">โรคประจำตัว</label>
            <div className="mt-1">
              {patient.medicalHistory.chronicDiseases.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.chronicDiseases.map((disease, index) => (
                    <Badge key={index} variant="outline" className="text-orange-700 border-orange-200">
                      {disease}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">ไม่มี</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">ยาที่ใช้ประจำ</label>
            <div className="mt-1">
              {patient.medicalHistory.currentMedications.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.currentMedications.map((medication, index) => (
                    <Badge key={index} variant="outline" className="text-blue-700 border-blue-200">
                      {medication}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">ไม่มี</span>
              )}
            </div>
          </div>

          {patient.medicalHistory.bloodType && (
            <div>
              <label className="text-sm font-medium text-gray-500">กรุ๊ปเลือด</label>
              <p className="font-semibold text-red-600">{patient.medicalHistory.bloodType}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insurance Information */}
      {patient.insuranceInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              ข้อมูลประกันสุขภาพ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-gray-500">บริษัทประกัน</label>
                <p>{patient.insuranceInfo.provider}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">หมายเลขกรมธรรม์</label>
                <p className="font-mono">{patient.insuranceInfo.policyNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">วันหมดอายุ</label>
                <p>{new Date(patient.insuranceInfo.expiryDate).toLocaleDateString('th-TH')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Notes */}
      {patient.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              หมายเหตุ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patient.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientProfile;
