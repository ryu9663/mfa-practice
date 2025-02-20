import { type RouteObject } from "react-router-dom";
import { AppRoutingManager } from "@mfa/shell-router";
import { Cards } from "./components/Cards";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppRoutingManager type="edu" />,
    errorElement: <div>App Edu Error</div>,
    children: [
      {
        index: true,
        element: (
          <div>
            <Cards />
          </div>
        ),
      },
      {
        path: "1",
        element: <div>App Edu Page 1</div>,
      },
    ],
  },
];
