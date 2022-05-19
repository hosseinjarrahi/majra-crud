<template>
  <MList />

  <MDialogForm v-model="dialog" :editItem="editItem" :isEditing="isEditing" />

  <MShowDialog />

  <MDeleteDialog />

  <slot name="extra"></slot>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useEmitter } from "majra-core";
import MDialogForm from "./MDialogForm.vue";
import MList from "./MList.vue";
import MShowDialog from "./MShowDialog.vue";
import MDeleteDialog from "./MDeleteDialog.vue";

let dialog = ref(false);
let editItem = reactive({});
let isEditing = ref(false);

const { listen, event } = useEmitter();

function defineListeners() {
  listen("createBtn", () => {
    isEditing.value = false;
    dialog.value = true;
    editItem = {};
  });

  listen("editBtn", (editItemParam) => {
    editItem = editItemParam;
    isEditing.value = true;
    dialog.value = true;
  });

  listen("handleDialogForm", (dialogParam) => {
    dialog.value = dialogParam;
  });

  //   listen("injectField", ({ field, value }) => {
  //     $store.commit("dynamic/mergeField", { field, value });
  //   });

  //   listen("reset", () => {
  //     $store.commit("dynamic/restoreBackup");
  //   });
}

defineListeners();

onMounted(() => {
  event("templateMounted");
});
</script>
