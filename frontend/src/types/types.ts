export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartContextProps {
  products: Product[];
  addToCart: (id: number, name: string, price: number, image: string) => void;
  reduceCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}
