import { routePath as path } from './routers';

// DefaultLayout
import DefautlLayout from '../layouts/DefaultLayout';
import SecondLayout from '../layouts/SecondLayout';
// DefaultLayoutAdmin
import DefaultLayoutAdmin from '../admin/DefaulLayoutAdmin';

// Client
import Home from '../pages/Home';
import Editor from '../pages/Editor';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import Detail from '../pages/Detail';
import Payment from '../pages/Payment';
import BestDeals from '../pages/BestDeals';
import Plus from '../pages/Plus';
// Admin
import AdminHome from '../admin/pages/AdminHome';
import AdminSignin from '../admin/pages/AdminSignin';
import AdminSignup from '../admin/pages/AdminSignup';
import AdminManageProducts from '../admin/pages/AdminManageProducts';
import AdminEditProduct from '../admin/pages/AdminEditProduct';
import AdminAddProduct from '../admin/pages/AdminAddProduct';
//
import AdminManageUsers from '../admin/pages/AdminManageUsers';
import SoftWareDeals from '../pages/SofteWareDeals';
import Welcome from '../pages/Welcome';

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
    { path: path.payment, component: <Payment /> },
    { path: `${path.bestDeals}/:key`, component: <BestDeals />, layout: SecondLayout },
    { path: path.bestDeals, component: <BestDeals />, layout: SecondLayout },
    { path: path.plus, component: <Plus />, layout: SecondLayout },
    { path: path.softWareDeals, component: <SoftWareDeals />, layout: SecondLayout },
    { path: `${path.welcome}/:key`, component: <Welcome /> },

    { path: path.welcome, component: <Welcome /> },

    // Admin
    { path: path.adminHome, component: <AdminHome />, layout: DefaultLayoutAdmin },
    { path: path.adminSignin, component: <AdminSignin /> },
    { path: path.adminSignup, component: <AdminSignup /> },
    //
    { path: path.adminManageProducts, component: <AdminManageProducts />, layout: DefaultLayoutAdmin },
    { path: path.adminEditProduct, component: <AdminEditProduct />, layout: DefaultLayoutAdmin },
    { path: path.adminAddProduct, component: <AdminAddProduct />, layout: DefaultLayoutAdmin },
    //
    { path: path.adminManageUsers, component: <AdminManageUsers />, layout: DefaultLayoutAdmin },
];
