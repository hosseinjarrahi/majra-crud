import { reactive, ref } from "vue";
import { loadItem } from "./useStore";
import { mainKey } from "./useStore";
import { get as getSafe } from "lodash";

const pagination = reactive({
  total: "",
  currentPage: "",
  lastPage: "",
});
const page = ref(1);

function paginate(page) {
  loadItem(mainKey, page);
}

function setPagination(response) {
  pagination.total = getSafe(response.data[mainKey], "total");
  pagination.currentPage = getSafe(response.data[mainKey], "current_page");
  pagination.lastPage = getSafe(response.data[mainKey], "last_page");
}

export function usePagination() {
  return { pagination, page, paginate };
}
