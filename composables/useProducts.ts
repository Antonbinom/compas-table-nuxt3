interface Product {
  id?: number;
  value: string;
  price: number;
  count: number;
  name: string;
}

const useProducts = () => {
  const products = useState<Product[]>("products", () => [
    {
      id: 1,
      value: "Мраморный щебень фр. 1-3 мм, 25кг",
      price: 1331,
      count: 15,
      name: "Мраморный щебень",
    },
    {
      id: 2,
      value: "Мраморный щебень фр. 2-5 мм, 25кг",
      price: 1231,
      count: 12,
      name: "Мраморный щебень",
    },
    {
      id: 3,
      value: "Мраморный щебень фр. 5-10 мм, 25кг",
      price: 1131,
      count: 10,
      name: "Мраморный щебень",
    },
    {
      id: 4,
      value: "Мраморный щебень фр. 10-20 мм, 25кг",
      price: 1031,
      count: 10,
      name: "Мраморный щебень",
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
