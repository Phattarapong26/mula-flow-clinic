import { httpClient } from '@/utils/httpClient';
import { sanitizeObject } from '@/utils/security';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicDiseases: string[];
    currentMedications: string[];
    bloodType?: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  registrationDate: string;
  lastVisitDate?: string;
  branchId: string;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface PatientCreateInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicDiseases: string[];
    currentMedications: string[];
    bloodType?: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  branchId: string;
  notes?: string;
}

class PatientService {
  async getPatients(params?: {
    search?: string;
    status?: Patient['status'];
    branchId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Patient[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.branchId) queryParams.append('branchId', params.branchId);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await httpClient.get<{ data: Patient[]; total: number }>(`/api/patients?${queryParams.toString()}`, { requireAuth: true });
      return {
        data: sanitizeObject(response.data.data),
        total: response.data.total
      };
    } catch (error) {
      toast.error('Failed to load patients');
      throw error;
    }
  }

  async getPatientById(id: string): Promise<Patient> {
    try {
      const response = await httpClient.get<Patient>(`/api/patients/${id}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to load patient details');
      throw error;
    }
  }

  async createPatient(data: PatientCreateInput): Promise<Patient> {
    try {
      // Sanitize input data
      const sanitizedData = {
        ...data,
        firstName: DOMPurify.sanitize(data.firstName),
        lastName: DOMPurify.sanitize(data.lastName),
        email: data.email ? DOMPurify.sanitize(data.email) : undefined,
        address: {
          ...data.address,
          street: DOMPurify.sanitize(data.address.street),
          district: DOMPurify.sanitize(data.address.district),
          province: DOMPurify.sanitize(data.address.province),
          postalCode: DOMPurify.sanitize(data.address.postalCode)
        },
        emergencyContact: {
          ...data.emergencyContact,
          name: DOMPurify.sanitize(data.emergencyContact.name),
          relationship: DOMPurify.sanitize(data.emergencyContact.relationship),
          phone: DOMPurify.sanitize(data.emergencyContact.phone)
        },
        notes: data.notes ? DOMPurify.sanitize(data.notes) : undefined
      };

      const response = await httpClient.post<Patient>('/api/patients', sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to create patient');
      throw error;
    }
  }

  async updatePatient(id: string, data: Partial<PatientCreateInput>): Promise<Patient> {
    try {
      // Sanitize input data
      const sanitizedData: Partial<PatientCreateInput> = {};

      // Handle string fields
      if (data.firstName) sanitizedData.firstName = DOMPurify.sanitize(data.firstName);
      if (data.lastName) sanitizedData.lastName = DOMPurify.sanitize(data.lastName);
      if (data.email) sanitizedData.email = DOMPurify.sanitize(data.email);
      if (data.phone) sanitizedData.phone = DOMPurify.sanitize(data.phone);

      // Handle address
      if (data.address) {
        sanitizedData.address = {
          street: DOMPurify.sanitize(data.address.street),
          district: DOMPurify.sanitize(data.address.district),
          province: DOMPurify.sanitize(data.address.province),
          postalCode: DOMPurify.sanitize(data.address.postalCode)
        };
      }

      // Handle emergency contact
      if (data.emergencyContact) {
        sanitizedData.emergencyContact = {
          name: DOMPurify.sanitize(data.emergencyContact.name),
          relationship: DOMPurify.sanitize(data.emergencyContact.relationship),
          phone: DOMPurify.sanitize(data.emergencyContact.phone)
        };
      }

      // Handle notes
      if (data.notes) sanitizedData.notes = DOMPurify.sanitize(data.notes);

      // Handle other fields
      if (data.dateOfBirth) sanitizedData.dateOfBirth = data.dateOfBirth;
      if (data.gender) sanitizedData.gender = data.gender;
      if (data.medicalHistory) sanitizedData.medicalHistory = data.medicalHistory;
      if (data.insuranceInfo) sanitizedData.insuranceInfo = data.insuranceInfo;
      if (data.branchId) sanitizedData.branchId = data.branchId;

      const response = await httpClient.put<Patient>(`/api/patients/${id}`, sanitizedData, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to update patient');
      throw error;
    }
  }

  async deletePatient(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/patients/${id}`, { requireAuth: true });
      toast.success('Patient deleted successfully');
    } catch (error) {
      toast.error('Failed to delete patient');
      throw error;
    }
  }

  async searchPatients(query: string): Promise<Patient[]> {
    try {
      const response = await httpClient.get<Patient[]>(`/api/patients/search?q=${encodeURIComponent(query)}`, { requireAuth: true });
      return sanitizeObject(response.data);
    } catch (error) {
      toast.error('Failed to search patients');
      throw error;
    }
  }
}

export const patientService = new PatientService(); 