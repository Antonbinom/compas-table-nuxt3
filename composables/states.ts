export const useOpenDrawer = () => useState("isDrawerOpened", () => false);
export const useColumnsOrder = () =>
  useState("columnsOrder", () => [
    "Номер строки",
    "Действие",
    "Наименование единицы",
    "Цена",
    "Кол-во",
    "Вес",
    "Название товара",
    "Итого",
  ]);

export const useTabs = () =>
  useState("tabs", () => [
    { name: "Общее", isVisible: true, isActive: false },
    { name: "Товары", isVisible: true, isActive: true },
    {
      name: "Доп. расходы",
      isVisible: true,
      isActive: false,
    },
    { name: "Другое", isVisible: false, isActive: false },
  ]);

export const useVisibleTabs = () =>
  useState("visibleTabs", () => ["Общее", "Товары", "Доп. расходы"]);
