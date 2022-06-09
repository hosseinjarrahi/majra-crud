import { reactive } from "vue";

const loadings = reactive({ mainLoading: false });

export default function useLoading() {
  return loadings;
}
