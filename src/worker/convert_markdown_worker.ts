import * as marked from "marked";
import sanitizeHtml from "sanitize-html";

// eslint-disable-next-line no-restricted-globals
const worker: Worker = self as any;

worker.addEventListener("message", event => {
  const text = event.data;
  const html = sanitizeHtml(marked.marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html });
});
