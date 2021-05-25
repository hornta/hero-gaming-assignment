import "modern-normalize/modern-normalize.css";
import "./main.css";

import PropTypes from "prop-types";
import { UniversalRouter } from "./universal-router";
import { ScreenList } from "./screen-list/screen-list.js";
import { Route } from "react-router-dom";
import { ScreenDetail } from "./screen-detail/screen-detail.js";
import { Provider } from "react-redux";
import { store } from "./store";

export const Main = ({ location }) => {
  return (
    <Provider store={store}>
      <div className="page-container">
        <UniversalRouter location={location}>
          <Route exact path="/">
            {({ match }) => {
              return <ScreenList visible={match !== null} />;
            }}
          </Route>
          <Route path="/stopwatch/:stopwatchId" component={ScreenDetail} />
        </UniversalRouter>
      </div>
    </Provider>
  );
};

Main.propTypes = {
  location: PropTypes.string,
};
