import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import App from "../components/template/App"
import Home from "../components/pages/Home"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />,
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