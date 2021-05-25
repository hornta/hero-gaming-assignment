import { StaticRouter, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";

export const UniversalRouter = ({ children, location }) => {
  if (process.env.BUILD_TARGET === "client") {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <StaticRouter location={location}>{children}</StaticRouter>;
};

UniversalRouter.propTypes = {
  children: PropTypes.node,
  location: PropTypes.string,
};
