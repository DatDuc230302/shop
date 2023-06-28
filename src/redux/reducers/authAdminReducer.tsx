const authAdminReducer = (state = false, action: any) => {
    switch (action.type) {
        case 'LOGINADMIN':
            return true;
        case 'LOGOUTADMIN':
            return false;
        default:
            return true;
    }
};

export default authAdminReducer;
