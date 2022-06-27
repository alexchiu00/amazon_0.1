interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

interface Products extends Array<ProductType> {}

interface itemType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  hasPrime: boolean;
}

interface Order {
  id: string;
  amount: number;
  amount_shipping: number;
  images: Array<string>;
  timestamp: number;
  items: any;
}

interface OrderNest {
  order: Order;
}

interface Props {
  products: Products;
}

interface RequestBody {
  items: itemType[];
  email: string;
}

interface Request {
  body: RequestBody;
}

interface Orders {
  orders: Array<OrderType>;
}

interface OrderType {
  id: string;
  amount: number;
  amount_shipping: number;
  images: Array<string>;
  timestamp: number;
  items: any;
}

export type {
  ProductType,
  Products,
  Rating,
  itemType,
  Order,
  OrderNest,
  Props,
  RequestBody,
  Request,
  Orders,
  OrderType,
};
