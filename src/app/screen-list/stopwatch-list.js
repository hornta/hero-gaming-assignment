import "./stopwatch-list.css";
import { StopwatchListItem } from "./stopwatch-list-item";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectStopwatches = (state) => state.stopwatches;
const selectSortedStopwatches = createSelector(
  selectStopwatches,
  (stopwatches) => {
    return Object.values(stopwatches).sort((a, b) => b.started - a.started);
  }
);

export const StopwatchList = () => {
  const stopwatches = useSelector(selectSortedStopwatches);

  if (stopwatches.length === 0) {
    return null;
  }

  return (
    <ul className="stopwatch-list">
      {stopwatches.map(({ __id }) => {
        return <StopwatchListItem key={__id} stopwatchId={__id} />;
      })}
    </ul>
  );
};
