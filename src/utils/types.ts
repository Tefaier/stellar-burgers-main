export type TTabMode = 'bun' | 'sauce' | 'main';

export type TIngredient = {
  _id: string;
  name: string;
  type: TTabMode;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string; // what the fuck is this id?
};

export type TOrder = {
  _id: string;
  status: string;
  name: string; // generated based on ingredients
  createdAt: string;
  updatedAt: string;
  number: number; // what is this
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number; // what is this
  totalToday: number; // what is this as well
};

export type TUser = {
  email: string;
  name: string;
};
