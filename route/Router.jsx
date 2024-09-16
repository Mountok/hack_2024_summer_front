import {
    createBrowserRouter
} from "react-router-dom";
import Login from "../src/screens/Login/Login.jsx";
import SignIn from "../src/screens/SignIn/SignIn.jsx";
import Home from "../src/screens/Courses/Courses.jsx";
import Profile from "../src/screens/Profile/Profile.jsx";
import LiderBord from "../src/screens/Rating/LiderBord.jsx";
import OpenCourse from "../src/screens/OpenCours/OpenCourse.jsx";
import Lesson from "../src/screens/Lesson/Lesson.jsx";
import Doc from "../src/screens/Doc/Doc.jsx";
import Admin from "../src/screens/Admin/Admin.jsx";

const PORT = "127.0.0.1:80"

// const PORT = "172.20.10.2:80"
// const PORT = "192.168.89.11:80"

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        children: [
            {
                path: "signin",
                element: <SignIn />,
            },
            {
                path: "courses",
                element: <Home port={PORT} />,
            },
            {
                path: "profile",
                element: <Profile port={PORT} />,
            },
            {
                path: "rate",
                element: <LiderBord />,
            },
            {
                path: "/course/:id",
                element: <OpenCourse port={PORT} />,
            },
            {
                path: "/lesson/:id/:id",
                element: <Lesson />,
            },
            {
                path: "/doc",
                element: <Doc />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },

        ],
    },
]);

export default Router