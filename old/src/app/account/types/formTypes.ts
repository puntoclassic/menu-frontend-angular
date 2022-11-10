export type SigninFields = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  source: string;
};

export type ResetPasswordWithTokenRequest = {
  token: string;
  password: string;
};

export type ChangePasswordRequest = {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type PersonalInfoUpdateRequest = {
  firstname: string;
  lastname: string;
};
