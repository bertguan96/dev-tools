import { createRouter,createWebHashHistory, RouteRecordRaw} from "vue-router";
import homeRouter from "./pages";

export const routers: RouteRecordRaw[] = [
    ...homeRouter
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routers
  })