import { reactive, computed } from "vue";
import { useStore } from "./useStore";

const fields = reactive({ value: [] });
const { isEditing } = useStore();

const flatFields = computed(() => {
  return Array.isArray(fields.value)
    ? fields.value
    : Object.values(fields.value).flat();
});

const headers = computed(() => {
  let temp = flatFields.value.filter((schema) => schema.isHeader);
  temp.push({
    title: "Actions",
    sortable: false,
    value: "_actions_",
    type: "text",
    align: "left",
  });
  temp.unshift({
    title: "#",
    type: "text",
    value: "_index_",
    field: "_index_",
    sortable: false,
  });
  return temp;
});

function filteredFields(fields) {
  return filterFieldsByShow(fields, isEditing.value ? "edit" : "create");
}

function getSendKey(field) {
  return "sendKey" in field ? field.sendKey : field.field;
}

function initFields() {
  for (const field of fields) {
    if ("init" in field) {
      field.init();
    }
  }
}

function getField(key) {
  return flatFields.value.find((schema) => schema.field == key);
}

function filterFieldsByShow(fields, mode = "create") {
  return fields.filter((field) => {
    if ("showIn" in field) {
      return field.showIn.indexOf(mode) > -1;
    }
    return true;
  });
}

function convertToSendForm(form, fields = false) {
  let out = {};
  let hasOneField = false;
  for (let fieldName in form) {
    let field = findField(fieldName, fields);
    if (!field) continue;
    hasOneField = true;
    let key = getSendKey(field);
    out[key] = form[fieldName];
  }
  if (!hasOneField) return form;
  return out;
}

function findField(field, fields = false) {
  if (fields) {
    return fields.find((f) => f.field === field);
  }
  return getField(field);
}

export function useFields() {
  return {
    fields,
    headers,
    getField,
    findField,
    initFields,
    flatFields,
    getSendKey,
    filteredFields,
    convertToSendForm,
    filterFieldsByShow,
  };
}
