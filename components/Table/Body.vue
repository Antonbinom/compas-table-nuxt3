<template>
  <DataTable
    id="dt-responsive-table"
    resizableColumns
    columnResizeMode="expand"
    scrollable
    showGridlines
    :value="editableProducts"
    :reorderableColumns="true"
    @columnReorder="onColReorder"
    @rowReorder="onRowReorder"
    class="table"
  >
    <Column
      v-if="visibleColumns?.includes('Номер строки')"
      headerStyle="width: 24px"
      :reorderableColumn="false"
      :resizeblaColumn="false"
      field="0"
      class="table-column dragg"
    >
      <template #body="{ index }">
        <span class="table-column__header">Номер строки</span>
        <div>
          <ButtonBurger /> <span>{{ index + 1 }}</span>
        </div>
      </template>
    </Column>
    <Column
      v-if="visibleColumns?.includes('Действие')"
      field="1"
      :reorderableColumn="false"
      :resizeblaColumn="false"
      class="table-column delete"
      headerStyle="width: 1.5rem"
    >
      <template #body="{ data }">
        <span class="table-column__header">Действие</span>
        <ButtonDots @remove-item="removeProduct(data.id)" />
      </template>
    </Column>
    <Column
      v-if="visibleColumns?.includes('Наименование единицы')"
      field="2"
      header="Наименование единицы"
      headerStyle="width: 672px"
      class="table-column table-column__select"
    >
      <template #body="{ index, data }">
        <span class="table-column__header">Наименование единицы</span>
        <TableSelect
          :selectedValue="{ name: data.value }"
          :options="productCategorise"
          @update-select="editableProducts[index].value = $event"
        />
      </template>
    </Column>
    <Column
      v-if="visibleColumns?.includes('Цена')"
      field="3"
      header="Цена"
      headerStyle="width: 220px"
      class="table-column table-column__input"
    >
      <template #body="{ index }">
        <span class="table-column__header">Цена</span>

        <TableInput
          :value="editableProducts[index].price"
          @update-input="
            editableProducts[index].price = $event;
            updateResults();
          "
        />
      </template>
    </Column>

    <Column
      v-if="visibleColumns?.includes('Кол-во')"
      field="4"
      header="Кол-во"
      headerStyle="width: 220px"
      class="table-column table-column__input"
    >
      <template #body="{ index }">
        <span class="table-column__header">Кол-во</span>
        <TableInput
          :value="editableProducts[index].count"
          @update-input="
            editableProducts[index].count = $event;
            updateResults();
          "
        />
      </template>
    </Column>
    <Column
      v-if="visibleColumns?.includes('Название товара')"
      field="5"
      header="Название товара"
      headerStyle="width: 160px"
      class="table-column table-column__select"
    >
      <template #body="{ index, data }">
        <span class="table-column__header">Название товара</span>
        <TableSelect
          :selectedValue="{ name: data.name }"
          :options="productNames"
          @update-select="editableProducts[index].name = $event"
        />
      </template>
    </Column>

    <Column
      v-if="visibleColumns?.includes('Вес')"
      field="6"
      header="Вес"
      class="table-column table-column__input"
    >
      <template #body="{ index }">
        <span class="table-column__header">Вес</span>
        <TableInput
          :value="editableProducts[index].weight"
          @update-input="
            editableProducts[index].weight = $event;
            updateResults();
          "
        />
      </template>
    </Column>

    <Column
      v-if="visibleColumns?.includes('Итого')"
      field="7"
      header="Итого"
      headerStyle="width: 148px"
      class="table-column table-column__input"
    >
      <template #body="{ data }">
        <span class="table-column__header">Итого</span>
        <TableInput :value="data.count * data.price" :readonly="true" />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import "primevue/resources/themes/aura-light-green/theme.css";
import { productCategorise, productNames } from "~/data";
import { useToast } from "primevue/usetoast";
import useHelpers from "~/composables/useHelpers";
import type { Product } from "~/types";

const { getResults } = useHelpers();

const emit = defineEmits(["update-products", "update-results"]);

const toast = useToast();

const props = defineProps({
  products: Array,
  visibleColumns: Array,
});

const editableProducts = ref<any>(props.products);

const removeProduct = (id: string) => {
  editableProducts.value = editableProducts.value?.filter(
    (product: Product) => product.id !== id
  );
  emit("update-products", editableProducts.value);
  updateResults();
};

const updateResults = () => {
  emit("update-results", getResults(editableProducts.value));
};

const onColReorder = () => {
  toast.add({ severity: "success", summary: "Column Reordered", life: 3000 });
};

const onRowReorder = (event: any) => {
  editableProducts.value = event.value;
  toast.add({ severity: "success", summary: "Rows Reordered", life: 3000 });
};
</script>

<style lang="scss">
.table {
  font-family: MyriadPro;

  & th {
    padding: 12px 12px;
    font-size: 16px;
    font-weight: 600;
    color: $black;

    border-color: $primary;
  }

  & td {
    padding-block: 3px;
    border: none;
    color: $black;
  }
}
.table-column.dragg,
.table-column.delete {
  padding-inline: 8px;
  font-size: 16px;
  text-align: center;
}

.table-column__select,
.table-column__input {
  padding-inline: 12px;
}
.table-column__header {
  display: none;
}

@media (max-width: 767px) {
  .table-column {
    display: flex;
    flex-direction: column;
  }
  .table-column__header {
    display: inline;
    margin-bottom: 5px;
    font-size: 10px;
    color: $grey-2;
  }
  .table-column.dragg,
  .table-column.delete {
    text-align: start;
  }
  .p-row-even,
  .p-row-odd {
    padding: 15px 15px 25px;
    margin-bottom: 5px;
    @include wrapper();
  }
  .table {
    & th {
      display: none !important;
    }
    & td,
    .table-column.dragg,
    .table-column.delete,
    .table-column button {
      padding: 0;
    }
    & tr {
      display: block;
    }
    .table-column {
      margin-bottom: 15px;
    }
    .table-column button {
      margin-right: 5px;
    }
    .button-dots {
      height: 20px;
    }
  }
}
</style>
