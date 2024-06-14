import type { Product } from "~/types";
const useProducts = () => {
  const products = useState<Product[]>("products", () => [
    {
      id: "asdas3",
      value: "Мраморный щебень фр. 1-3 мм, 25кг",
      price: 1331,
      count: 15,
      name: "Мраморный щебень",
      weight: 25,
    },
    {
      id: "gdfsd3",
      value: "Песок, 25кг",
      price: 1000,
      count: 2,
      name: "Песок",
      weight: 15,
    },
    {
      id: "34kjsdkj3",
      value: "Мраморный щебень фр. 5-10 мм, 20кг",
      price: 1131,
      count: 10,
      name: "Мраморный щебень",
      weight: 20,
    },
    {
      id: "askj3kq",
      value: "Гравий фр. 1-3 мм, 20кг",
      price: 1031,
      count: 10,
      name: "Гравий",
      weight: 20,
    },
  ]);

  const saveProducts = (editableProducts: Product[]) => {
    if (JSON.stringify(editableProducts) === JSON.stringify(products.value))
      return;
    products.value = editableProducts;
  };

  return {
    products,
    saveProducts,
  };
};

export default useProducts;
