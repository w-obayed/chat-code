import ProtectedRoute from "../component/protectedRoute";
import Home from "../page/home";
import Login from "../page/login";
import Signup from "../page/signup";

const publicRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default publicRouter;
