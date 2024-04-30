import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../pages/main/Main";
import MainLayout from "../pages/main/MainLayout";
import SignIn from "../pages/authentication/signin/SignIn";
import Register from "../pages/authentication/register/Register";
import ProtectedRoute from "./protectedRoute";
import AuthGuard from "./authGuard";
import RecoverPassword from "../pages/authentication/recoverPassword/RecoverPassword";
import AuthenticationLayout from "../pages/authentication/AuthenticationLayout";
import ChangeEmailOrPhone from "../pages/authentication/changeEmailOrPhone/ChangeEmailOrPhone";
import ServiceLayout from "../pages/main/service/ServiceLayout";
import ServiceCategories from "../pages/main/service/categories/ServiceCategories";
import MyServices from "../pages/main/service/my-services/MyServices";
import CreateItem from "../pages/main/createItem/CreateItem";
import CreateItemLayout from "../pages/main/createItem/CreateItemLayout";
import CreateService from "../pages/main/service/create-service/CreateService";
import Services from "../pages/main/service/services/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Page Not Found</div>,
    children: [
      { index: true, element: <Main /> },
      {
        path: "/service",
        element: <ServiceLayout />,
        children: [
          { index: true, element: <Services /> },
          { path: "/service/categories", element: <ServiceCategories /> },
          { path: "/service/create-service", element: <CreateService /> },
          { path: "/service/my-services", element: <MyServices /> }
        ]
      },
      {
        path: "create-item",
        element: <CreateItemLayout />,
        children: [{ index: true, element: <CreateItem /> }]
      }
    ]
  },
  {
    path: "/auth",
    element: (
      <AuthGuard>
        <AuthenticationLayout />
      </AuthGuard>
    ),
    errorElement: <div>Page Not Found</div>,
    children: [
      { index: true, element: <Register /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "recover", element: <RecoverPassword /> },
      { path: "change", element: <ChangeEmailOrPhone /> }
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
