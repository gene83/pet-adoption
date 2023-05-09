import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./search";
import Details from "./Details";
import { AdoptedPetContextProvider } from "./petContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <AdoptedPetContextProvider>
        <QueryClientProvider client={queryClient}>
          <div>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </AdoptedPetContextProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const root = createRoot(container);
root.render(<App />);
