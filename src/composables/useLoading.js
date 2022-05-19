import { reactive } from "vue";

const loadings = reactive({ mainLoading: false });

export function useLoading() {
  return loadings;
}
