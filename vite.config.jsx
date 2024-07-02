import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plubins: [react()],
  root: "src",
});
