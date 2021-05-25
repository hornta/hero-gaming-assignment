import { renderToStaticMarkup } from "react-dom/server";
import prepass from "react-ssr-prepass";
import { Document } from "./document";
import { Main } from "../app/main";

export const react = async (request, reply) => {
  const tree = <Main location={request.url} />;

  await prepass(tree);

  const html = renderToStaticMarkup(<Document>{tree}</Document>);

  reply.writeHead(200, { "Content-Type": "text/html" });
  reply.end(`<!DOCTYPE html>${html}`, "utf8");
};
