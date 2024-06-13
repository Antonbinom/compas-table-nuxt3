<template>
  <section class="products">
    <h1 class="products-title">Проведение ТО и мелкий ремонт</h1>
    <Tabs />

    <div class="products-buttons">
      <ButtonAdd @click="addProduct" />
    </div>
    <div class="products-table">
      <div class="products-table__top">
        <button
          class="products-table__save"
          @click="saveProducts(editableProducts)"
        >
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
      />
    </div>
  </section>
</template>

<script setup>
import { productCategorise, productNames } from "../data";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { products, saveProducts } = useProducts();

const editableProducts = ref(products.value);

const visibleColumns = ref([
  "Название единицы",
  "Цена",
  "Кол-во",
  "Название товара",
  "Итого",
]);

const addProduct = () => {
  editableProducts.value.push({
    id: Math.random().toString(16).slice(2),
    value: "",
    price: 0,
    count: 1,
    name: "",
  });
};
</script>

<style lang="scss" scoped>
.products {
  padding: 25px;
  height: 100vh;
}
.products-title {
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: normal;
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
  padding-block: 10px;
  padding-right: 15px;
  display: flex;
  justify-content: end;
  align-items: center;
  & span {
    margin-right: 20px;
    font-size: 12px;
    color: #a6b7d4;
  }
}

.products-table__save {
  font-size: 12px;
  color: #a6b7d4;
}
</style>
