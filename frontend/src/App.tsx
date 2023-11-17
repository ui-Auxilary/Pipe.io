import { useAppData } from "helper/AppProvider";
import Home from "./pages/Home";
import Login from "./pages/Login/";
import Register from "./pages/Register";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "config/theme";
import { ThemeProvider } from "styled-components";
import { Recovery, Reset } from "pages/Recovery";

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

  const { darkMode } = useAppData();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}


const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
