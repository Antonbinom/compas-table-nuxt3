<template>
  <DataTable
    ref="table"
    resizableColumns
    reorderableColumns
    columnResizeMode="fit"
    showGridlines
    scrollable
    :value="editableProducts"
    @rowReorder="onRowReorder"
    @columnReorder="onColReorder"
    :columnOrder="columnsOrder"
    class="table"
  >
    <Column
      v-for="column in columns.filter((col) =>
        visibleColumns?.includes(col.header)
      )"
      :key="column.field"
      :field="column.field"
      :header="column.header"
      :resizebleColumn="column.isResizeble"
      :headerStyle="column.style"
      :class="column.class"
    >
      <template #body="{ index, data }">
        <span class="table-column__header">{{ column.header }}</span>
        <div v-if="column.field === 'Номер строки'">
          <ButtonBurger />
          <span>{{ index + 1 }}</span>
        </div>
        <ButtonDots
          v-if="column.field === 'Действие'"
          @remove-item="removeProduct(data.id)"
        />
        <TableSelect
          v-if="column.field === 'Наименование единицы'"
          :selectedValue="{ name: data.value }"
          :options="productCategorise"
          @update-select="editableProducts[index].value = $event"
        />
        <TableInput
          v-if="column.field === 'Цена'"
          :value="editableProducts[index].price"
          @update-input="
            editableProducts[index].price = $event;
            updateResults();
          "
        />
        <TableInput
          v-if="column.field === 'Вес'"
          :value="editableProducts[index].count"
          @update-input="
            editableProducts[index].count = $event;
            updateResults();
          "
        />
        <TableInput
          v-if="column.field === 'Кол-во'"
          :value="editableProducts[index].count"
          @update-input="
            editableProducts[index].count = $event;
            updateResults();
          "
        />
        <TableSelect
          v-if="column.field === 'Название товара'"
          :selectedValue="{ name: data.name }"
          :options="productNames"
          @update-select="editableProducts[index].name = $event"
        />

        <TableInput
          v-if="column.field === 'Итого'"
          :value="data.count * data.price"
          :readonly="true"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import "primevue/resources/themes/aura-light-green/theme.css";
import { productCategorise, productNames } from "~/data";
import useHelpers from "~/composables/useHelpers";
import type { Product } from "~/types";
const columnsOrder = useColumnsOrder();

const { getResults } = useHelpers();

const emit = defineEmits(["update-products", "update-results"]);

const props = defineProps({
  products: Array,
  visibleColumns: Array,
});

const table = ref(null);

const columns = ref([
  {
    field: "Номер строки",
    header: "Номер строки",
    isResizeble: false,
    style: "max-width: 24px",
    class: "table-column dragg",
  },
  {
    field: "Действие",
    header: "Действие",
    isResizeble: false,
    style: "max-width: 1rem",
    class: "table-column delete",
  },
  {
    field: "Наименование единицы",
    header: "Наименование единицы",
    isResizeble: true,
    style: "width: 672px",
    class: "table-column table-column__select",
  },
  {
    field: "Цена",
    header: "Цена",
    isResizeble: true,
    style: "width: 220px",
    class: "table-column table-column__input",
  },
  {
    field: "Вес",
    header: "Вес",
    isResizeble: true,
    style: "width: 220px",
    class: "table-column table-column__input",
  },
  {
    field: "Кол-во",
    header: "Кол-во",
    isResizeble: true,
    style: "width: 160px",
    class: "table-column table-column__select",
  },
  {
    field: "Название товара",
    header: "Название товара",
    isResizeble: true,
    style: "",
    class: "table-column table-column__input",
  },
  {
    field: "Итого",
    header: "Итого",
    isResizeble: true,
    style: "width: 148px",
    class: "table-column table-column__input",
  },
]);

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

const onRowReorder = (event: any) => {
  editableProducts.value = event.value;
};

const onColReorder = () => {
  columnsOrder.value = table.value.d_columnOrder;
};

watch(
  () => columnsOrder.value,
  () => {
    table.value.d_columnOrder = columnsOrder.value;
  }
);
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
