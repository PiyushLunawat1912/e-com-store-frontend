import { CardItem } from './cart-item';

export interface Order {
  _id?: string;
  items: CardItem[];
  paymentType: string;
  address: any;
  date: Date;
  totalAmount: number;
  status?: string;
}
