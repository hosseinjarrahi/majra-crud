import { reactive, ref } from "vue";
import { get as getSafe } from "lodash";

const items = reactive();
const mainKey = ref(false);
const isEditing = ref(false);

function loadItems() {}

function add() {}
function edit() {}

function getItem(key, defaultValue = []) {
  return getSafe(items, key, defaultValue);
}

function getMainItem() {
  return getSafe(items, mainKey);
}

export function useStore() {
  return {
    items,
    mainKey,
    loadItems,
    getItem,
    add,
    edit,
    isEditing,
    getMainItem,
  };
}
