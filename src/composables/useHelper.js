import { camelCase, toUpper } from "lodash";

const pascalCase = (str) => toUpper(camelCase(str));

export {
  pascalCase,
};
