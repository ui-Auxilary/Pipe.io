import AppProvider from "helper/AppProvider";
import Home from "./pages/Home";
import Login from "./pages/Login/";
import Register from "./pages/Register";
import { Recovery, Reset } from "pages/Recovery";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recovery" element={<Recovery />} />
        <Route path="reset" element={<Reset />} />
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
