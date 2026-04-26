export type Course = {
  course_id: number;
  course_name: string;
};

export type Student = {
  student_id: string;
  full_name: string;
  dob: string;
  gender: string;
  residential_address: string;
  email_address: string;
  phone_number: string;
  courses: Course[];
  enrollment_date: string;
  status?: "Active" | "Inactive";
};