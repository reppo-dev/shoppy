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

export interface Products {
  ID: number;
  name: string;
  image: string;
  description: string;
  price: number;
  user_id: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total?: number;
}
