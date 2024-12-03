import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Hono API",
    version: "1.0.0",
  });
});

app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default {
  port: 3001,
  fetch: app.fetch,
};
