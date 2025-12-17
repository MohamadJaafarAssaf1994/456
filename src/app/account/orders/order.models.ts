/* ===== ORDER LIST ===== */
export interface OrderSummary {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
  total: number;
}

/* ===== ORDER DETAILS ===== */
export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetails extends OrderSummary {
  items: OrderItem[];

  subtotal: number;
  tax: number;
  shipping: number;

  address: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zip: string;
  };
}
