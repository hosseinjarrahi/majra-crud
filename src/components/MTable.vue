<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-col">
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden">
            <MDataTable :headers="headers" :data="mainItem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../composables/useStore";
import { useFields } from "./../composables/useFields";
import MDataTable from "./MDataTable.vue";

const { headers } = useFields();
const { mainItem } = useStore();
</script>
