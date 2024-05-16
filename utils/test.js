import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

export const getContainer = () => {
  return new JSDOM(html, { runScripts: "dangerously" }).window.document.body;
};
