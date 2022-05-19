import { reactive, ref } from "vue";
import { loadItems } from "./useStore";
import { mainKey } from "./useStore";

const paginations = reactive({});
const page = ref(1);

function paginate(page) {
  loadItems({
    page,
    key: mainKey,
  });
}

export function usePagination() {
  return { paginations, page, paginate };
}
