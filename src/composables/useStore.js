import { reactive, ref } from "vue";
import { get as getSafe } from "lodash";
import { useEmitter } from "majra-core";
import { useLoading } from "./useLoading";
import { usePagination } from "./usePagination";
import { pascalCase } from "./useHelper";
import { useFields } from "./useFields";

const { setPagination } = usePagination();
const { listen, event } = useEmitter();
const { loadings } = useLoading();
const { flatFields } = useFields();

const items = reactive({});
const mainKey = ref(false);
const isEditing = false;
const routes = [];
let hiddenActions = reactive([]);
let relationsFetched = false;

function addRoute(payload) {
  const key =
    typeof payload == "string"
      ? payload.substr(payload.lastIndexOf("/") + 1)
      : payload.key;

  const standardKey = pascalCase(key);

  mainKey.value = mainKey.value ? mainKey.value : standardKey;

  routes[standardKey] =
    typeof payload == "string" ? payload : getSafe(payload, "route");

  return routes[standardKey];
}

function loadItem(key, page = 1, all = false) {
  let query = all ? "all=true" : "";
  let pageQuery =
    getSafe(routes, key, "").indexOf("?") > -1 ? "&page=" : "?page="; // to do : change routes structure

  loadings[key] = true;

  const route = getSafe(routes, key, "") + pageQuery + page + "&" + query;

  axios
    .get(route)
    .then((response) => {
      setData(key, response.data[key].data);

      if (key === mainKey.value) {
        setPagination(response.data[mainKey]);

        !relationsFetched && event("readyToFetchRelations");
        relationsFetched = true;
      }
    })
    .finally(() => {
      loadings[key] = false;
    });
}

function loadRelations(relations) {
  for (const relation of relations) addRoute(relation);

  listen("readyToFetchRelations", () => {
    // to do : add load attr to routes to findout which route downloaded and here download not loaded routes
  });
}

function setData(key, data) {
  items[key] = data;
}

function addData(payload) {
  let temp = items[mainKey];
  temp = [...payload, ...temp];
  items[mainKey] = [...temp];
}

function editItem(payload) {
  let temp = items[mainKey];
  temp = temp.map((item) => {
    if (item.id == payload.id) return payload;
    return item;
  });
  items[mainKey] = [...temp];
}

function getItem(key, defaultValue = []) {
  return getSafe(items, key, defaultValue);
}

function add(payload) {
  let route = { value: false };

  for (const field of flatFields) {
    if ("onSave" in field) {
      field.onSave(items[field.rel.model], payload, route);
    }
  }

  loadings[mainKey] = true;

  route = route.value ? route.value : routes[mainKey];

  let sendForm = convertToSendForm(payload);

  let data = { [mainKey]: sendForm };

  axios
    .post(route, data)
    .then((response) => {
      let newItems = Array.isArray(response.data[mainKey])
        ? response.data[mainKey]
        : [response.data[mainKey]];

      addData(newItems);
      event("alert", { text: "با موفقیت ثبت شد", color: "green" });
      event("handleDialogForm", false);
    })
    .catch((error) => {
      event("alert", {
        text: error.response.data.message,
        color: "red",
      });
    })
    .finally(() => {
      loadings[mainKey] = false;
    });
}

function edit(payload) {
  let route = routes[mainKey].split("?")[0];

  if ("route" in payload) {
    route = payload.route;
  }

  let sendForm = convertToSendForm(payload);

  let data = { [mainKey]: sendForm };

  axios
    .patch(route + "/" + payload.id, data)
    .then((response) => {
      editItem(response.data[mainKey]);
      event("alert", { text: "با موفقیت ویرایش شد", color: "green" });
      event("handleDialogForm", false);
    })
    .catch((error) => {
      event("alert", {
        text: error.response.data.message,
        color: "red",
      });
    })
    .finally(() => {});
}

export function useStore() {
  return {
    add,
    edit,
    items,
    routes,
    mainKey,
    getItem,
    addRoute,
    loadItem,
    isEditing,
    loadRelations,
    hiddenActions,
    mainItem: getSafe(items, mainKey.value),
  };
}
