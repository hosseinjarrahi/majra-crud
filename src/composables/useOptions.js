import { reactive } from "vue";

const options = reactive({});

export function useOptions() {
  return { options };
}
