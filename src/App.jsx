import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { NAV } from "./data/nav.js";

// Home, About, Skills, Projects and Contact are panels of one screen. Every page URL
// renders the same <Home /> (so the page-swap transition keeps its state); any other
// URL falls through to the 404 page.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {NAV.map((n) => (
          <Route key={n.id} path={n.to} element={<Home />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
