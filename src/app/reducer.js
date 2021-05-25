import { createReducer } from "@reduxjs/toolkit";
import { createStopwatch, fetchStopwatches } from "./actions";

const getToggleDuration = (stopwatchToggles) => {
  let allTogglesDuration = 0;

  for (let index = 0; index < stopwatchToggles.length; index += 2) {
    if (index + 1 >= stopwatchToggles.length) {
      break;
    }

    const toggleDuration =
      stopwatchToggles[index + 1] - stopwatchToggles[index];
    allTogglesDuration += toggleDuration;
  }

  return allTogglesDuration;
};

const dressStopwatch = (stopwatch) => {
  return {
    ...stopwatch,
    toggleDuration: getToggleDuration(stopwatch.toggles),
  };
};

const makeClientStopwatch = (temporaryId, started) => {
  return {
    __id: temporaryId,
    started,
    toggles: [],
    toggleDuration: 0,
    laps: [],
    clientOnly: true,
  };
};

const initialState = {
  stopwatches: {},
  nextPage: 1,
  fetching: false,
  creating: false,
  rejectedFetch: false,
  rejectedAdd: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStopwatches.pending, (state) => {
      state.rejectedFetch = false;
      state.fetching = true;
    })
    .addCase(fetchStopwatches.rejected, (state) => {
      state.rejectedFetch = true;
      state.fetching = false;
    })
    .addCase(fetchStopwatches.fulfilled, (state, action) => {
      const { result, meta } = action.payload;

      state.fetching = false;

      for (const stopwatch of result) {
        state.stopwatches[stopwatch.__id] = dressStopwatch(stopwatch);
      }

      const isLastPage = meta.totalPages === meta.currentPage;
      state.nextPage = isLastPage ? null : meta.currentPage + 1;
    })
    .addCase(createStopwatch.pending, (state, action) => {
      const { meta } = action;
      state.creating = true;
      state.rejectedAdd = false;
      const stopwatch = makeClientStopwatch(meta.requestId, meta.arg);
      state.stopwatches[stopwatch.__id] = stopwatch;
    })
    .addCase(createStopwatch.rejected, (state, action) => {
      const { requestId } = action.meta;
      delete state.stopwatches[requestId];
      state.creating = false;
      state.rejectedAdd = true;
    })
    .addCase(createStopwatch.fulfilled, (state, action) => {
      const { requestId } = action.meta;

      state.creating = false;
      delete state.stopwatches[requestId];

      const stopwatch = dressStopwatch(action.payload);
      state.stopwatches[stopwatch.__id] = stopwatch;
    });
});
