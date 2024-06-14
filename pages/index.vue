<template>
  <Toast />
  <section class="products">
    <div class="products-header">
      <ButtonBurger class="products-burger" @click="isDrawerOpened = true" />
      <h1 class="products-title">Проведение ТО и мелкий ремонт</h1>
    </div>
    <div class="products-tabs">
      <Tabs />
      <ButtonColumnsSettings
        class="products-tabs-settings"
        :visibleColumns="visibleColumns"
        @columns-visibility-change="visibleColumns = $event"
      />
    </div>

    <div class="products-buttons">
      <ButtonAdd @click="addProduct" />
    </div>
    <div class="products-table">
      <div class="products-table__top">
        <button class="products-table__save" @click="handleSaveProducts">
          Сохранить изменения
        </button>
        <ButtonColumnsSettings
          :visibleColumns="visibleColumns"
          @columns-visibility-change="visibleColumns = $event"
        />
      </div>

      <TableBody
        :visibleColumns="visibleColumns"
        :products="editableProducts"
        @updateProducts="editableProducts = $event"
        @updateResults="productsResult = $event"
      />
      <div v-if="editableProducts.length" class="products-table__bottom">
        <TableResult :results="productsResult" />
      </div>
      <div v-if="!editableProducts.length" class="products-table__empty">
        Добавьте товар
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useHelpers from "~/composables/useHelpers";
const { getResults } = useHelpers();
const toast = useToast();
const { products, saveProducts } = useProducts();
const isDrawerOpened = useOpenDrawer();

const editableProducts = ref(products.value);

const visibleColumns = ref([
  "Номер строки",
  "Действие",
  "Наименование единицы",
  "Цена",
  "Кол-во",
  "Название товара",
  "Итого",
]);

const productsResult = ref({
  price: "0 руб",
  count: "0 шт",
  weight: "0 кг",
});

const addProduct = () => {
  editableProducts.value.push({
    id: Math.random().toString(16).slice(2),
    value: "",
    price: 0,
    count: 1,
    name: "",
    weight: 0,
  });
};

onMounted(() => {
  productsResult.value = getResults(products.value);
});

const handleSaveProducts = () => {
  const result = editableProducts.value.filter((item) => {
    return Object.values(item).some((value) => value === "" || value === 0);
  });
  if (result) {
    toast.add({
      severity: "error",
      summary: "Не валидные поля у товара",
      detail:
        "Для сохранения товаров, все поля должны быть заполненны, а значения не должны быть равны нулю",
      life: 10000,
    });
  }

  saveProducts(editableProducts.value);
};
</script>

<style lang="scss" scoped>
.products {
  padding: 25px;
  height: 100%;
}
.products-header {
  display: flex;
  align-items: start;
  margin-bottom: 13px;
}
.products-burger {
  display: none;
  margin-right: 25px;
  margin-top: 9px;
}
.products-title {
  margin: 0;
  font-size: 30px;
  font-weight: normal;
}
.products-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.products-buttons {
  padding: 20px 25px;
  margin-bottom: 25px;
  @include wrapper();
}
.products-table {
  padding-bottom: 25px;
  @include wrapper();
}

.products-table__top {
  display: flex;
  justify-content: end;
  align-items: center;
  & span {
    margin-right: 20px;
    font-size: 12px;
    color: $blue-gray;
  }
}

.products-table__save {
  font-size: 12px;
  color: $blue-gray;
  transition: all ease 0.2s;

  &:hover {
    color: $blue;
    transition: all ease 0.2s;
  }
}

.products-table__bottom {
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 13px;
  padding-inline: 15px;
  border-inline: 15px;
}

.products-table__empty {
  margin-top: 20px;
  font-size: 28px;
  text-align: center;
  color: $grey-2;
}
@media (max-width: 767px) {
  .products {
    padding: 16px 10px;
  }
  .products-header {
    margin-bottom: 25px;
  }
  .products-burger {
    display: block;
  }
  .products-tabs-settings {
    display: none;
  }
  .products-table {
    @include reset-wrapper();
  }
  .products-table__top {
    display: none;
  }
  .products-table__bottom {
    padding: 0;
  }
}
</style>
