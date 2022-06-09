import { reactive, ref } from "vue";
import { get as getSafe } from "lodash";
import { useStore } from "./useStore";

const { loadItem, mainKey } = useStore();

const pagination = reactive({
  total: 0,
  currentPage: 1,
  lastPage: "",
});
const page = ref(1);

function reset() {
  Object.assign(pagination, {
    currentPage: 1,
    total: 0,
  });
}

function paginate(page) {
  loadItem(mainKey, page);
}

function setPagination(response) {
  pagination.total = getSafe(response.data[mainKey], "total");
  pagination.currentPage = getSafe(response.data[mainKey], "current_page");
  pagination.lastPage = getSafe(response.data[mainKey], "last_page");
}

export function usePagination() {
  return { pagination, page, paginate, setPagination, reset };
}
