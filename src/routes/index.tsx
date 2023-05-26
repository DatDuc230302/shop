import { routePath as path } from './routers';
import Home from '../pages/Home';

interface route {
    path: string;
    component: any;
    layout?: any;
}

export const routes: route[] = [{ path: path.home, component: <Home /> }];
