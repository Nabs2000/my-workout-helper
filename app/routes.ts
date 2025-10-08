import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("user/:userId", "routes/user.tsx"),   
    route("register", "routes/register.tsx"),
] satisfies RouteConfig;
