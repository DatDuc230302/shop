import { routePath as path } from './routers';
import DefautlLayout from '../layouts/DefaultLayout';
import SecondLayout from '../layouts/SecondLayout';
import Home from '../pages/Home';
import Editor from '../pages/Editor';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import Detail from '../pages/Detail';
import Payment from '../pages/Payment';
//
import HomeAdmin from '../admin/pages/HomeAdmin';
import BestDeals from '../pages/BestDeals';
import Plus from '../pages/Plus';

interface route {
    path: string;
    component: any;
    layout?: any;
}

export const routes: route[] = [
    { path: `${path.home}/:key`, component: <Home />, layout: DefautlLayout },
    { path: path.home, component: <Home />, layout: DefautlLayout },
    { path: path.editor, component: <Editor />, layout: DefautlLayout },
    { path: `${path.category}/:key`, component: <Category />, layout: DefautlLayout },
    { path: path.category, component: <Category />, layout: DefautlLayout },
    { path: path.cart, component: <Cart />, layout: DefautlLayout },
    { path: path.detail, component: <Detail />, layout: DefautlLayout },
    { path: path.payment, component: <Payment />, layout: DefautlLayout },
    { path: `${path.bestDeals}/:key`, component: <BestDeals />, layout: DefautlLayout },
    { path: path.bestDeals, component: <BestDeals />, layout: DefautlLayout },
    { path: path.plus, component: <Plus />, layout: SecondLayout },

    // Admin
    { path: path.homeAdmin, component: <HomeAdmin />, layout: SecondLayout },
];
