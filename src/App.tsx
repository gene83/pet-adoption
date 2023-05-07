import { createRoot } from "react-dom/client";
import Search from "./search";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Search />
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const root = createRoot(container);
root.render(<App />);
