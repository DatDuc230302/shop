export const routePath: {
    home: string;
    editor: string;
    category: string;
    cart: string;
    detail: string;
    payment: string;
    bestDeals: string;
    plus: string;
    //
    adminHome: string;
    adminSignin: string;
    adminSignup: string;
    //
    adminManageProducts: string;
    adminEditProduct: string;
    adminAddProduct: string;
    //
    adminManageUsers: string;
} = {
    home: '/',
    editor: '/editor/:key',
    category: '/category',
    cart: '/page/cart',
    detail: '/detail/:key',
    payment: '/payment',
    bestDeals: '/best-deals',
    plus: '/plus',
    //
    adminHome: '/admin/home',
    adminSignin: '/admin/signin',
    adminSignup: '/admin/signup',
    //
    adminManageProducts: '/admin/manage-products',
    adminAddProduct: '/admin/manage-products/addProduct/:key',
    adminEditProduct: '/admin/manage-products/editProduct/:key',
    //
    adminManageUsers: '/admin/manage-users',
};
