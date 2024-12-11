export interface Product{
  id?:String;
  name: String;
  shortDescription: String;
  description: String;
  price : Number;
  discount: Number;
  images: String[];
  categoryId:String
}