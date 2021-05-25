import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";

export const Document = ({ children }) => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Stopwatch Assignment</title>
        <script src={assets.client.js} defer />
      </head>
      <body>
        <div
          dangerouslySetInnerHTML={{
            __html: renderToString(children),
          }}
          data-app-root
        />
        <div id="overlay"></div>
      </body>
    </html>
  );
};

Document.propTypes = {
  children: PropTypes.node,
};
