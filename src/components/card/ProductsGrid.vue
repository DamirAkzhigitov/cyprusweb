<template>
  <div>
    <ag-grid-vue
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
    >
    </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'

export default defineComponent({
  name: 'ProductsGrid',
  components: {
    'ag-grid-vue': AgGridVue,
  },
  setup() {
    const columnDefs = ref([
      {
        field: 'make',
        cellStyle: {
          color: 'red',
          'background-color': 'green',
          width: '100px',
        },
      },
      { field: 'model', cellStyle: { width: '100px' } },
      { field: 'price', cellStyle: { width: '100px' } },
    ])
    const rowData = ref([
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
    ])
    // const rowStyle = { }

    return {
      rowData,
      columnDefs,
    }
  },
})
</script>

<style lang="sass" scoped>
@import "~ag-grid-community/dist/styles/ag-grid.css"
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css"
</style>
