import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { Product } from '../types';

export const useProductsByCategory = (category: string): Product[] => {
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);

  return useMemo(() => {
    if (!category) return products;
    return products.filter((p) =>
      p.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase()),
    );
  }, [products, category]);
};

export const useAllCategories = (): string[] => {
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);

  return useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach((p) => p.categories.forEach((c) => categorySet.add(c)));
    return Array.from(categorySet).sort();
  }, [products]);
};

export const useProductsGroupedByCategory = (): Record<string, Product[]> => {
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);

  return useMemo(() => {
    return products.reduce(
      (acc, product) => {
        product.categories.forEach((category) => {
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
        });
        return acc;
      },
      {} as Record<string, Product[]>,
    );
  }, [products]);
};
