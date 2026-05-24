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

export interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
  user_id: number;
}
