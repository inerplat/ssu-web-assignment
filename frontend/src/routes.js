import Home from "views/cards/Home";
import Profile from "./views/cards/Profile";
import Intro from "./views/cards/Intro";

const navRoutes = [
    {
        path: "/home",
        name: "home",
        component: Home,
        layout: ""
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        layout: ""
    }
];

export default navRoutes;
