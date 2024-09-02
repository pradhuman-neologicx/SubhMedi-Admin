export class SignIn {
  email!: string;
  password!: string;
}
export class SignInStudent {
  username!: string;
  password!: string;
}

export class SignINRes {
  userId!: string;
  fullName!: string;
  name!: string;
  email!: string;
  mobileNumber!: string;
  role!: string;
  token!: string;
}
export class SignINResStudent {
  userId!: string;
  fullName!: string;
  name!: string;
  mobileNumber!: string;
  role!: string;
  token!: string;
}


export class SendOtp {
  email!: string;
}

export class SendOtpNew {
  mobilenumber!: string;
}
export class OtpVerify {
  userId!: string;
  otp!: number;
}


export class ForgotPasswordRes {
  ForgotPasswordID!: String;
}


export class ChangePassword {
  password!: string;
  confirmPassword!: string;
}

export class ChangePasswordresponse {
  user_id!:String;
  message!: string;
}