import { RouteObject } from "react-router-dom";
import { MainPage } from "../pages/main/main";
import { LoginPage } from "../pages/auth/auth";
import { GoalsPage } from "../pages/goals/goals";
import { PoliciesPage } from "../pages/policies/policies";

export const routes: RouteObject[] = [
  {
    id: 'root',
    path: "/",
    element: <LoginPage />
  },
  {
    id: 'main',
    path: "/main",
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        id: 'goals',
        path: ':organizationId/goals',
        element: <GoalsPage />
      },
      {
        id: 'policies',
        path: 'policies',
        element: <PoliciesPage />
      }
    ]
  },

];
