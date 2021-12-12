import Home from "views/cards/Home";
import Profile from "./views/cards/Profile";
import Intro from "./views/cards/Intro";
import New from "./views/cards/New";
import Follow from "./views/cards/Follow";
import Msg from "./views/cards/Msg";

const navRoutes = [
    {
        path: "/home",
        name: "home",
        component: Home,
        layout: ""
    },
    {
        path: "/new",
        name: "new",
        component: New,
        layout: ""
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        layout: ""
    },
    {
        path: "/follow",
        name: "follow",
        component: Follow,
        layout: ""
    },
    {
        path: "/msg",
        name: "msg",
        component: Msg,
        layout: ""
    }
];

export default navRoutes;
