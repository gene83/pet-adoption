import { createRoot } from "react-dom/client";

const App = () => {
  return <div>Adopt me!</div>;
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const root = createRoot(container);
root.render(<App />);
