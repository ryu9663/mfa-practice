// career-up/apps/shell/src/router.tsx

import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { EDU_ROUTING_PREFIX } from "./constants/prefix";

const AppEduLazy = React.lazy(() => import("./components/AppEdu"));

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        // element: <Navigate to={`${EDU_ROUTING_PREFIX}`} />,
        element: <div>Hi</div>,
      },
      {
        path: `${EDU_ROUTING_PREFIX}/*`,
        element: (
          <Suspense fallback="Loading Edu...">
            <AppEduLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={browserRouter} />;
}
