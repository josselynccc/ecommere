import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import App from "../components/template/App"
import Home from "../components/pages/Home"
import Inicio from "../components/pages/Inicio";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Inicio />,
            },
            {
                path: "/aboutMe",
                element: <Home />,
            },
            {
                path: "/cv",
                element: <Home />,
            },
        ],
    },
]);

export default router