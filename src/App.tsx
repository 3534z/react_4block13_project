import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ArticlesPage />,
  },
  {
    path: "/articles",
    element: <ArticlesPage />,
  },
  {
    path: "/articles/:slug",
    element: <ArticlePage />,
  },
], {
  basename: "/react_4block13_project/"
  });

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
