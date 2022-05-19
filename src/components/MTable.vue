<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-col">
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden">
            <MDataTable :headers="headers" :data="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../composables/useStore";
import { useFields } from "./../composables/useFields";

const { headers } = useFields();
const { item } = useStore();
</script>
