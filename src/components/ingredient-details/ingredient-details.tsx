import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from 'src/services/orderSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора (только какую вообще?) */
  const ingreadients = useSelector(selectAllIngredients);
  const id = useParams()["id"];
  const ingredientData = useMemo(() => ingreadients.find(ing => ing._id == id), [ingreadients, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
