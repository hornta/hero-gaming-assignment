import { createAsyncThunk } from "@reduxjs/toolkit";
import { ensureSuccessfulHttpStatus } from "./utils";

export const fetchStopwatches = createAsyncThunk(
  "stopwatch/fetchStopwatches",
  async (parameters, { getState }) => {
    const response = await fetch(
      "/api/stopwatches?page=" + getState().nextPage
    );
    ensureSuccessfulHttpStatus(response.status);
    return response.json();
  }
);

export const createStopwatch = createAsyncThunk(
  "stopwatch/createStopwatch",
  async (startTime) => {
    const response = await fetch("/api/stopwatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ started: startTime }),
    });
    ensureSuccessfulHttpStatus(response.status);
    return response.json();
  }
);
