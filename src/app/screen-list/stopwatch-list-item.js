import "./stopwatch-list-item.css";
import { useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { TickDuration } from "../tick-duration";
import { formatDuration } from "../utils";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const StopwatchListItem = ({ stopwatchId }) => {
  const match = useRouteMatch();
  const stopwatch = useSelector((state) => state.stopwatches[stopwatchId]);

  let className = "stopwatch-list-item";
  const isPaused = stopwatch.toggles.length % 2 !== 0;
  if (isPaused) {
    className += " stopwatch-paused";
  }

  if (stopwatch.clientOnly) {
    className += " stopwatch-client";
  }

  const formatter = useCallback(() => {
    let to = new Date();
    if (isPaused) {
      const lastToggle = stopwatch.toggles[stopwatch.toggles.length - 1];
      to = lastToggle;
    }

    return formatDuration(stopwatch.started + stopwatch.toggleDuration, to);
  }, [
    stopwatch.started,
    isPaused,
    stopwatch.toggles,
    stopwatch.toggleDuration,
  ]);

  return (
    <li className={className}>
      <Link
        className="stopwatch-link"
        to={match?.url + "stopwatch/" + stopwatch.__id}
      >
        <TickDuration formatter={formatter} paused={isPaused} />
        {stopwatch.clientOnly && (
          <span className="stopwatch-creation">Saving...</span>
        )}
      </Link>
    </li>
  );
};

StopwatchListItem.propTypes = {
  stopwatchId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
