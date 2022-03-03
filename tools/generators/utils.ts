import {
  uniqueNamesGenerator,
  adjectives,
  names,
} from "unique-names-generator";

export const generateName = (string = undefined) => {
  return string == undefined
    ? {
        name: uniqueNamesGenerator({
          dictionaries: [adjectives, names],
          style: "lowerCase",
        }),
      }
    : {
        name: string,
      };
};

export const generateError = (string) => {
  return {
    error: string,
  };
};
