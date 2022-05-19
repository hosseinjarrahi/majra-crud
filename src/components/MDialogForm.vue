<template>
  <dialog
    :value="value"
    @input="handleDialog"
  >
    <dynamic-form-core
      :tabs="tabs"
      :tabModel="tabModel"
      :valid="valid"
      :isEditing="isEditing"
      :mainLoading="mainLoading"
      :handleDialog="handleDialog"
      @input="tabModel = $event"
    />
  </dialog>
</template>

<script setup>
import { defineProps, watch } from "vue";
import DynamicFormCore from "./DynamicFormCore.vue";
import { useEmitter } from "majra-core";
import { useStore } from "./../composables/useStore";

const { add, edit } = useStore();
const { listen, event } = useEmitter();

const props = defineProps({
  value: {},
  isEditing: {},
  editItem: {},
});

watch(props.val, (val) => {
  val && event("dialog", props.isEditing);
});

function handleDialog(e) {
  $emit("input", e);
}

function defineListeners() {
  listen("saveForm", (doYouWantToValidate = true) => {
    const save = () => {
      props.isEditing ? edit(form) : add(form);
    };
    if (doYouWantToValidate) {
      return event("validating", (valid) => {
        valid ? save() : "";
      });
    }
    return save();
  });

  listen("changeField", ({ field, value }) => {
    form[field] = value;
  });

  listen(["createBtn"], () => {
    form = {};
  });

  listen("editTheItem", (item) => {
    edit(item);
  });

  listen("addTheItem", (item) => {
    add(item);
  });
}

defineListeners();
</script>
