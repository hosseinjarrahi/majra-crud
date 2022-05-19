import { get as getSafe } from "lodash";
import { emitter } from "majra-core";
import { useStore } from "./useStore";
import { useOptions } from "./useOptions";
import { useFields, initFields } from "./useFields";

const { mainKey, loadRelations, addRoute, loadItem, hiddenActions } = useStore();
const { options } = useOptions();
const { fields } = useFields();
const { event, clear: clearEventListeners } = emitter();

function resetStates(state) {
  state.items = [];
  state.options = [];
  state.loading = {};
  state.pagination = {
    currentPage: 1,
    total: 0,
  };
  state.routes = [];
  mainKey.value = false;
  state.fields = [];
  state.hiddenActions = [];
  state.flatFields = [];
  state.backup = false;
  state.headers = [];
  Vue._bus.$off("readyToFetchRelations");
}

function init(payload = {}) {
  clearEventListeners();

  resetStates();

  event("beforeMajraInit");

  loadRelations(getSafe(payload, "relations", []));

  addRoute(payload.mainRoute);

  loadItem(mainKey.value);

  Object.assign(options, getSafe(payload, "options", {}));
  fields.assign(fields, getSafe(payload, "fields", []));

  initFields();

  hiddenActions = getSafe(payload, "hiddenActions", []);
}

export function useCrud() {
  return { init, addRoute };
}
