import { get as getSafe } from "lodash";
import { useEmitter } from "majra-core";
import { useStore } from "./useStore";
import { useOptions } from "./useOptions";
import { useFields } from "./useFields";
import { usePagination } from "./usePagination";

const { event, clear: clearEventListeners, emitter } = useEmitter();

function resetStates() {
  let { reset: resetStore } = useStore();
  resetStore();

  let { reset: resetOptions } = useOptions();
  resetOptions();

  let { reset: resetFields } = useFields();
  resetFields();

  let { reset: resetPaginations } = usePagination();
  resetPaginations();

  emitter.off("readyToFetchRelations");
}

function init(payload = {}) {
  // eslint-disable-next-line no-unused-vars
  let { mainKey, loadRelations, addRoute, loadItem, hiddenActions } =
    useStore();

  const { options } = useOptions();
  const { fields, initFields } = useFields();

  clearEventListeners();

  resetStates();

  event("beforeMajraInit");

  loadRelations(getSafe(payload, "relations", []));

  addRoute(payload.mainRoute);

  loadItem(mainKey.value);

  Object.assign(options, getSafe(payload, "options", {}));
  fields.value = getSafe(payload, "fields", []);

  initFields();

  hiddenActions = getSafe(payload, "hiddenActions", []);
}

export function useCrud() {
  return { init };
}
