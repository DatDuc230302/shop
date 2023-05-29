import { routePath as path } from './routers';
import DefautlLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import Editor from '../pages/Editor';

interface route {
    path: string;
    component: any;
    layout?: any;
}

export const routes: route[] = [
    { path: path.home, component: <Home />, layout: DefautlLayout },
    { path: path.editor, component: <Editor />, layout: DefautlLayout },
];
