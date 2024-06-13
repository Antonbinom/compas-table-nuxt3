<template>
  <section class="products">
    <h1 class="products-title">Проведение ТО и мелкий ремонт</h1>
    <Nav />
    <div class="products-buttons">
      <ButtonAdd />
    </div>
    <div class="products-table">
      <PrimeDataTable
        :value="products"
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        tableStyle="min-width: 50rem"
      >
        <PrimeColumn field="code" header="Code"></PrimeColumn>
        <PrimeColumn field="name" header="Name"></PrimeColumn>
        <PrimeColumn field="category" header="Category"></PrimeColumn>
        <PrimeColumn field="quantity" header="Quantity"></PrimeColumn>
      </PrimeDataTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
const products = [
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  ,
  {
    code: "nvklal433",
    name: "Black Watch",
    category: "Accessories",
    quantity: 61,
  },
  {
    code: "zz21cz3c1",
    name: "Blue Band",
    category: "Fitness",
    quantity: 2,
  },
  {
    code: "244wgerg2",
    name: "Blue T-Shirt",
    category: "Clothing",
    quantity: 25,
  },
  {
    code: "h456wer53",
    name: "Bracelet",
    category: "Accessories",
    quantity: 73,
  },
];
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
  padding-top: 35px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  @include wrapper();
}
</style>
