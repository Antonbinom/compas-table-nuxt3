import type { Product } from "~/types";

const useHelpers = () => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const formatWithUnit = (value: number, unit: string) => {
    return `${formatNumber(value)} ${unit}`;
  };

  const getResults = (products: Product[]) => {
    const calculateTotal = (property: string) => {
      return products.reduce((total: number, item: any) => {
        return total + item[property];
      }, 0);
    };

    const calculateTotalPrice = () => {
      return products.reduce((total: number, item: any) => {
        return total + item.price * item.count;
      }, 0);
    };

    const price = calculateTotalPrice();
    const count = calculateTotal("count");
    const weight = calculateTotal("weight");

    return {
      price: formatWithUnit(price, "руб"),
      count: formatWithUnit(count, "шт"),
      weight: formatWithUnit(weight, "кг"),
    };
  };
  return { getResults, formatNumber, formatWithUnit };
};

export default useHelpers;
