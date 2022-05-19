import { reactive } from "vue";
import { useStore } from "./useStore";

const flatFields = reactive({});
const fields = reactive({});
const headers = reactive({});
const { isEditing } = useStore();

function filterFieldsByShow(fields, mode = "create") {
  return fields.filter((field) => {
    if ("showIn" in field) {
      return field.showIn.indexOf(mode) > -1;
    }
    return true;
  });
}

function filteredFields(fields) {
  return filterFieldsByShow(fields, isEditing.value ? "edit" : "create");
}

export function useFields() {
  return { flatFields, fields, headers, filteredFields };
}
