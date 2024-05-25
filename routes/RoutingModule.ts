import {Router} from 'express';

export interface Route {
    path: string;
    configure: (router: Router) => void;
}

export class RoutingModule {
    private _routes: Route[] = [];

    constructor(private router: Router = Router()) {
    }

    addRoute(route: Route) {
        this.routes.push(route);
    }

    addRoutes(routes: Route[]) {
        routes.push(...routes);
    }

    get routes() {
        return this._routes;
    }

    registerInto(path: string, router: Router) {
        router.use(path, router);
    }

    register() {
        this.routes.forEach(value => {
            let subRouter = Router();
            value.configure(subRouter);

            this.router.use(value.path, subRouter);
        })
    }
}

export const routing = new RoutingModule();