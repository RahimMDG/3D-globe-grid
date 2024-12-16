import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./about";
import Terms from "./terms";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="Terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ConvexAuthProvider>
  </React.StrictMode>
);
