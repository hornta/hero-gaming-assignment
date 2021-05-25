import ReactDOM from "react-dom";
import { Main } from "./app/main";

const element = document.querySelector("[data-app-root]");

ReactDOM.hydrate(<Main />, element);

if (module.hot) {
  module.hot.accept("./app/main.js", async () => {
    const { Main } = await import("./app/main.js");
    ReactDOM.render(<Main />, element);
  });
}
