// Vercel serverless entry point.
// Exports the Express app directly — Vercel wraps it in its own HTTP handler,
// so PORT is not needed here (that's only for the local dev server in src/index.ts).
import app from "../src/app";

export default app;
