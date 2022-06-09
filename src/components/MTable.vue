<template>
  <div ref="table"></div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";

import { useStore } from "../composables/useStore";
import { useFields } from "./../composables/useFields";
import { useTabulator } from "./../composables/useTabulator";

const { headers } = useFields();
const { mainItem } = useStore();
const { initTable, tableInstance } = useTabulator();

const table = ref(null);

onMounted(() => {
  initTable({
    element: table.value,
    headers: headers.value,
    data: mainItem.value,
  });
});

watch(mainItem, () => {
  tableInstance.setData(mainItem);
});
</script>

<style>
@import "https://unpkg.com/tabulator-tables@4.9.3/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
</style>
