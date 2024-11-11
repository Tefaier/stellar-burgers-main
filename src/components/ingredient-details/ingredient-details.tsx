import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора (только какую вообще?) */
  const [ingredientData, setIngredientData] = useState<TIngredient|null>(null);
  const id = useParams()["id"];
  
  useEffect(() => {
    const promise = getIngredientsApi().then(result => setIngredientData(result.find(elem => elem._id == id) || null));
    return () => {
      Promise.reject(promise);
    };
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
