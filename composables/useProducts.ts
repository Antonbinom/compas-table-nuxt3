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
  const toast = useToast();

  const saveProducts = (editableProducts: Product[]) => {
    const result = editableProducts.filter((item) => {
      return Object.values(item).some((value) => value === "" || value === 0);
    });
    if (result.length) {
      toast.add({
        severity: "error",
        summary: "Не валидные поля у товара",
        detail: "Убедитесь что все поля заполнены и не равны нулю",
        life: 10000,
      });
      return;
    }

    if (JSON.stringify(editableProducts) === JSON.stringify(products.value)) {
      return toast.add({
        severity: "warn",
        summary: "Сперва внесите изменения в таблицу",
        life: 3000,
      });
    }
    products.value = editableProducts;

    toast.add({
      severity: "success",
      summary: "Данные успешно сохранены",
      life: 3000,
    });
  };

  return {
    products,
    saveProducts,
  };
};

export default useProducts;
