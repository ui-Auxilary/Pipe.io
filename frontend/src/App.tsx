import AppProvider from "helper/AppProvider";
import Home from "./pages/Home";
import Login from "./pages/Login/";
import Register from "./pages/Register";
import Graph from "./pages/Graph";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="graph" element={<Graph />} />

      </Route>
    )
  );


  return (
    <AppProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  );
}


const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
