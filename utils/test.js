import { JSDOM } from "jsdom";
import path from "path";
import { URL } from "url";

const __dirname = new URL("../", import.meta.url).pathname;

export const getContainer = async () => {
  const dom = await JSDOM.fromFile(path.resolve(__dirname, "./index.html"), {
    runScripts: "dangerously",
    resources: "usable",
  });

  return new Promise((resolve) => {
    dom.window.addEventListener("load", () => {
      resolve(dom.window.document.body);
    });
  });
};
