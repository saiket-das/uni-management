export interface UserNameProps {
  firstName: string;
  lastName: string;
}

export interface GuardianProps {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface LocalGuardianProps {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface StudentPorps {
  id: string;
  name: UserNameProps;
  email: string;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: GuardianProps;
  localGuardian: LocalGuardianProps;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  address: string;
  profileImage: string;
  isDeleted?: boolean;
}
