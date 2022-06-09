import { reactive } from "vue";

const loadings = reactive({ mainLoading: false });

function reset() {
  Object.assign(loadings, {});
}

export function useLoading() {
  return { loadings, reset };
}
