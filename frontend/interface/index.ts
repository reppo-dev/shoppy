export interface Register {
  user_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface Login {
  email: string;
  password: string;
}
