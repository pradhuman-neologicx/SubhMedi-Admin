export class Employee {
    name!: string;
    email!: string;
    mobileNumber!: string;
    role!: string;
    password!: string;
    image!: string;
  }

  export class updatePassord {
    userId!: string;
    newPassword!: string;
    confirmPassword!: string;
  }
  export class studentupdatePassord {
    studentRollNumber!: string;
    password!: string;
    confirmPassword!: string;
  }

  export class studentupdateBatch {
    studentId!: string;
    courseId!: string;
    newBatchId!: string;
    sessionId!: string;
    userId!: string;
  }