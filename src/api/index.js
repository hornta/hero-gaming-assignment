import express from "express";

import * as Models from "./models";

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export const api = express.Router();

function toStopwatch(record) {
  return {
    __id: record.$loki,
    laps: record.laps,
    started: record.started,
    toggles: record.toggles,
  };
}

api.use(function flukes(request, reply, next) {
  const flukeness =
    process.env.FLUKENESS != null
      ? Math.max(0, Math.min(100, Number.parseInt(process.env.FLUKENESS, 10)))
      : random(1, 110);

  if (flukeness >= 100) {
    throw new Error("All your base are belong to us");
  } else if (flukeness > 0) {
    setTimeout(() => {
      next();
    }, flukeness * 30);
  } else {
    next();
  }
});

api
  .route("/stopwatches/:id/lap")
  .post(function stopwatchLap__post(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    const result = toStopwatch(
      stopwatch.update((record) => ({
        ...record,
        laps: [...record.laps, request.body.time],
      }))
    );

    reply.json({
      meta: {},
      result,
    });
  });

api
  .route("/stopwatches/:id/toggle")
  .post(function stopwatchToggle__post(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    const result = toStopwatch(
      stopwatch.update((record) => ({
        ...record,
        toggles: [...record.toggles, request.body.time],
      }))
    );

    reply.json({
      meta: {},
      result,
    });
  });

api
  .route("/stopwatches/:id")
  .get(function stopwatch__get(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    const result = toStopwatch(stopwatch.get());

    reply.json({
      meta: {},
      result,
    });
  })
  .delete(function stopwatch__delete(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    stopwatch.remove();

    reply.status(204).end();
  })
  .patch(function stopwatch__patch(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    const result = toStopwatch(
      stopwatch.update((record) => ({
        ...record,
        ...request.body,
      }))
    );

    reply.json({
      meta: {},
      result,
    });
  })
  .post(function stopwatch__post(request, reply) {
    const id = Number.parseInt(request.params.id, 10);
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, id);

    const result = toStopwatch(
      stopwatch.update((record) => ({
        ...record,
        laps: [],
        started: request.body.started,
        toggles: [],
      }))
    );

    reply.json({
      meta: {},
      result,
    });
  });

api
  .route("/stopwatches")
  .get(function stopwatches__get(request, reply) {
    const { database } = request.context;

    const collection = database.getCollection("stopwatches");

    const count = collection.count();

    const limit = 3;
    const currentPage = Number.parseInt(request.query.page, 10) || 1;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (currentPage - 1);

    const view = collection.addDynamicView("list");
    view.applySimpleSort("started");

    const result = collection
      .chain()
      .sort((a, b) => b.$loki - a.$loki)
      .offset(offset)
      .limit(limit)
      .data()
      .map((item) => toStopwatch(item));

    reply.json({
      meta: {
        currentPage,
        totalPages,
      },
      result,
    });
  })
  .post(function stopwatches__post(request, reply) {
    const { database } = request.context;

    const stopwatch = new Models.Stopwatch(database, null);

    const record = stopwatch.create({
      laps: [],
      started: request.body.started,
      toggles: [],
    });

    reply.json(toStopwatch(record));
  });

api.all(function notImplemented(request, reply) {
  reply.status(501).end();
});
