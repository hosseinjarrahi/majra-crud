<template>
  <table
    class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700"
  >
    <thead class="bg-gray-100 dark:bg-gray-700">
      <tr v-for="header in headers" :key="header.field">
        <th class="p-4">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody
      class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
    >
      <tr
        class="hover:bg-gray-100 dark:hover:bg-gray-700"
        v-for="(value, index) in props.data"
        :key="index"
      >
        <td
          class="p-4 w-4"
          v-for="header in props.headers"
          :key="'data' + header.field"
        >
          {{ getSafe(value, header.field) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { get as getSafe } from "lodash";

const props = defineProps({
  headers: { default: () => [] },
  data: { default: () => [] },
});
</script>
