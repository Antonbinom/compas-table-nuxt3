<template>
  <DataTable
    :pt="{ root: { style: 'min-width: 50rem' } }"
    resizableColumns
    columnResizeMode="fit"
    showGridlines
    :value="editableProducts"
    :reorderableColumns="true"
    @columnReorder="onColReorder"
    @rowReorder="onRowReorder"
    tableStyle="min-width: 50rem"
    class="table"
  >
    <Column
      headerStyle="width: 3rem"
      :reorderableColumn="false"
      :resizeblaColumn="false"
      field="0"
    >
      <template #body="{ index }">
        <ButtonBurger />
        {{ index + 1 }}
      </template>
    </Column>
    <Column
      headerStyle="width: 3rem"
      field="1"
      :reorderableColumn="false"
      :resizeblaColumn="false"
    >
      <template #body="{ data }">
        <ButtonDots @remove-item="removeProduct(data.id)" />
      </template>
    </Column>
    <Column
      v-if="visibleColumns.includes('Название единицы')"
      field="2"
      header="Название единицы"
    >
      <template #body="{ index, data }">
        <TableSelect
          :selectedValue="{ name: data.value }"
          :options="productCategorise"
          @update-select="editableProducts[index].value = $event"
        />
      </template>
    </Column>
    <Column v-if="visibleColumns.includes('Цена')" field="3" header="Цена">
      <template #body="{ index }">
        <TableInput
          :value="editableProducts[index].price"
          @update-input="editableProducts[index].price = $event"
        />
      </template>
    </Column>
    <Column v-if="visibleColumns.includes('Кол-во')" field="4" header="Кол-во">
      <template #body="{ index }">
        <TableInput
          :value="editableProducts[index].count"
          @update-input="editableProducts[index].count = $event"
        />
      </template>
    </Column>
    <Column
      v-if="visibleColumns.includes('Название товара')"
      field="5"
      header="Название товара"
    >
      <template #body="{ index, data }">
        <TableSelect
          :selectedValue="{ name: data.name }"
          :options="productNames"
          @update-select="editableProducts[index].name = $event"
        />
      </template>
    </Column>
    <Column v-if="visibleColumns.includes('Итого')" field="6" header="Итого">
      <template #body="{ data, index }">
        <TableInput :value="data.count * data.price" :readonly="true" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import "primevue/resources/themes/aura-light-green/theme.css";
import { productCategorise, productNames } from "../data";
import { useToast } from "primevue/usetoast";

const emit = defineEmits(["update-products"]);

const props = defineProps({
  products: Array,
  visibleColumns: Array,
});

const toast = useToast();

const editableProducts = ref(props.products);

const removeProduct = (id) => {
  editableProducts.value = editableProducts.value.filter(
    (product) => product.id !== id
  );
  emit("update-products", editableProducts.value);
};

const onColReorder = () => {
  toast.add({ severity: "success", summary: "Column Reordered", life: 3000 });
};

const onRowReorder = (event) => {
  editableProducts.value = event.value;
  toast.add({ severity: "success", summary: "Rows Reordered", life: 3000 });
};
</script>

<style lang="scss">
.table {
  font-family: MyriadPro;

  & th {
    padding: 14px 12px;
    font-size: 16px;
    font-weight: 600;
    color: #000;

    border-color: #eeeff1;
  }

  & td {
    padding-block: 5px;
    border: none;
    color: #000;
  }
}
</style>
