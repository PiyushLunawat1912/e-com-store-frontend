export interface Product {
  _id?: string;
  name: String;
  shortDescription: String;
  description: String;
  price: Number;
  discount: Number;
  images: String;
  categoryId: String;
  isFeatured: Boolean;
  isNew: Boolean;
}
