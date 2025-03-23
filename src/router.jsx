import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import Browse from "./pages/Browse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "home", element: <Browse /> },
    ],
  },
]);

export default router;
