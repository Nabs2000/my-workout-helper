import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("user", "routes/user.tsx"),
    layout("./auth/layout.tsx", [
        route("login", "./auth/login.tsx"),
        route("register", "./auth/register.tsx"),
      ])
    
] satisfies RouteConfig;
