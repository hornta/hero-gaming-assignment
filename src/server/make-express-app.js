import express from "express";

export const makeExpressApp = ({ api, createDatabase, react }) => {
  const app = express();
  app.use(express.json());
  app.use(createDatabase("build/stopwatch.db"));
  app.use("/api", api);
  app.use(react);
  return app;
};
