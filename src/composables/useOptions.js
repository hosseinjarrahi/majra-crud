import { reactive } from "vue";

const options = reactive({});

function reset() {
  Object.assign(options, {});
}

export function useOptions() {
  return { options, reset };
}
