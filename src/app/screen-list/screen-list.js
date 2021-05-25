import "./screen-list.css";
import { useEffect } from "react";
import { Button } from "../button";
import { InfoText } from "./info-text";
import { StopwatchList } from "./stopwatch-list";
import { useDispatch, useSelector } from "react-redux";
import { createStopwatch, fetchStopwatches } from "../actions";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const INFO_TEXT_REJECTED_INITIAL = "INFO_TEXT_REJECTED_INITIAL";
const INFO_TEXT_REJECTED_SUBSEQUENT = "INFO_TEXT_REJECTED_SUBSEQUENT";
const INFO_TEXT_FETCHING = "INFO_TEXT_FETCHING";

const infoTextMessages = {
  [INFO_TEXT_REJECTED_INITIAL]:
    'Failed to fetch stopwatches, try to reload the page or press "More".',
  [INFO_TEXT_REJECTED_SUBSEQUENT]:
    "Failed to fetch more stopwatches, please try again.",
  [INFO_TEXT_FETCHING]: "Fetching stopwatches...",
};

const selectDisableCreate = (state) => state.creating;
const selectDisableMore = (state) => !state.nextPage || state.fetching;
const selectHasItems = (state) => Object.keys(state.stopwatches).length > 0;
const selectInfoText = (state) => {
  if (state.fetching) {
    return INFO_TEXT_FETCHING;
  } else if (state.rejectedFetch) {
    return state.nextPage === 1
      ? INFO_TEXT_REJECTED_INITIAL
      : INFO_TEXT_REJECTED_SUBSEQUENT;
  }
  return null;
};
const selectRejectedCreateMessageVisibility = (state) => state.rejectedAdd;
const selectIsFetching = (state) => state.fetching;

export const ScreenList = ({ visible = true }) => {
  const dispatch = useDispatch();

  const hasItemsInList = useSelector(selectHasItems);
  const isFetching = useSelector(selectIsFetching);

  useEffect(() => {
    if (visible && !hasItemsInList && !isFetching) {
      dispatch(fetchStopwatches());
    }
  }, [dispatch, visible, isFetching, hasItemsInList]);

  const handleFetchMore = () => {
    dispatch(fetchStopwatches());
  };

  const history = useHistory();

  const handleCreate = () => {
    (async () => {
      const result = await dispatch(createStopwatch(Date.now()));
      console.log(result);
      if (!result.error) {
        history.push("/stopwatch/" + result.payload.__id);
      }
    })();
  };

  const disableCreate = useSelector(selectDisableCreate);
  const disableFetchMore = useSelector(selectDisableMore);
  const infoTextState = useSelector(selectInfoText);
  const rejectCreate = useSelector(selectRejectedCreateMessageVisibility);

  const infoTextClass =
    "info-text" + (hasItemsInList ? " info-text-with-list" : "");

  let className = "screen-list";
  if (!visible) {
    className += " screen-list-hide";
  }

  return (
    <main className={className}>
      <Button onClick={handleCreate} disabled={disableCreate}>
        New
      </Button>
      <InfoText className="info-text" visible={rejectCreate}>
        Failed to create a new stopwatch, try again.
      </InfoText>
      <StopwatchList />
      <InfoText className={infoTextClass} visible={Boolean(infoTextState)}>
        {infoTextMessages[infoTextState]}
      </InfoText>
      <Button
        className="load-more-btn"
        disabled={disableFetchMore}
        onClick={handleFetchMore}
      >
        More
      </Button>
    </main>
  );
};

ScreenList.propTypes = {
  visible: PropTypes.bool,
};
