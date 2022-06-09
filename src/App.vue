<template>
  <MCrud />
</template>

<script setup>
import MCrud from "./components/MCrud.vue";
import { useCrud } from "./composables/useMCrud";

const { init } = useCrud();

init({
  mainRoute: "/",
  
  fields: [
    {
      name: "name",
      title: "Name",
      type: "text",
      placeholder: "Enter name",
      isHeader: true,
    },
    {
      name: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter email",
      isHeader: true,
    },
    {
      name: "phone",
      title: "Phone",
      type: "number",
      placeholder: "Enter phone",
      isHeader: true,
    },
    {
      name: "address",
      title: "Address",
      type: "text",
      placeholder: "Enter address",
      isHeader: true,
    },
  ],
});
</script>
