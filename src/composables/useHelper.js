import { camelCase, toUpper, has } from "lodash";

const pascalCase = (str) => toUpper(camelCase(str));

function hasChild(field) {
  return has(field, "rel.child.model");
}

export default {
  hasChild,
  pascalCase,
};
