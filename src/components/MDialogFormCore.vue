<template>
  <card>
    <v-card-title class="pl-0 headline white--text py-1 secondary">
      <h6 v-if="!isEditing">افزودن</h6>
      <h6 v-else>ویرایش</h6>
      <v-spacer />
      <v-btn dark text @click="handleDialog(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <card-text class="py-3">
      <h1 class="text-center"><slot name="title"></slot></h1>
      <form ref="dynamicForm">
        <MForm
          :fields="filteredFields(fields)"
          :form="form"
          @updateField="updateField"
        />
      </form>
    </card-text>

    <v-divider></v-divider>

    <card-actions>
      <button
        :color="isEditing ? 'primary' : 'success'"
        small
        :loading="mainLoading"
        class="px-10"
        @click="event('saveForm')"
      >
        <span v-if="!isEditing">ثبت</span>
        <span v-else>ویرایش</span>
      </button>
    </card-actions>
  </card>
</template>

<script>
import { MForm } from "majra-core";
import { defineProps } from "vue";
import { useStore } from "./useStore";

const { isEditing } = useStore();

defineProps({
  valid: {},
  form: {},
  updateField: {},
  isEditing: {},
  handleDialog: {},
});
</script>
