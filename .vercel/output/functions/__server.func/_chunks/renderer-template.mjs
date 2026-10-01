import { i as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>REDFOX</title>\r\n    <meta\r\n      name=\"description\"\r\n      content=\"Tactical dark-mode command deck tracking cybersecurity, academics, and AIML objectives with daily focus stats, roadmaps, and real-time streaks.\"\r\n    />\r\n    <meta property=\"og:title\" content=\"REDFOX\" />\r\n    <meta\r\n      property=\"og:description\"\r\n      content=\"Tactical dark-mode command deck tracking cybersecurity, academics, and AIML objectives with daily focus stats, roadmaps, and real-time streaks.\"\r\n    />\r\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />\r\n    <link rel=\"alternate icon\" href=\"/favicon.ico\" />\r\n  </head>\r\n  <body\r\n    class=\"bg-[#05070D] text-foreground antialiased selection:bg-[#E63946]/30 selection:text-[#FF6B6B]\"\r\n  >\r\n    <div id=\"root\"></div>\r\n  </body>\r\n</html>\r\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
