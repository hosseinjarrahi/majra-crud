<template>
  <div>
    <component :is="MTable" v-bind="bind()" />
  </div>
</template>

<script setup>
import { useStore } from "./../composables/useStore";
import { usePagination } from "./../composables/usePagination";
import MTable from "./MTable.vue";

const { getItem, mainKey } = useStore();
const { page } = usePagination();

function getField(field) {
  return "item." + field;
}

function getHeader(header) {
  return "header." + header;
}

function getIndex(item) {
  return (
    getItem(mainKey)
      .map((i) => i.id)
      .indexOf(item.id) +
    (15 * page - 14)
  );
}

function bind() {
  return {
    getHeader,
    getField,
    getIndex,
  };
}
</script>
