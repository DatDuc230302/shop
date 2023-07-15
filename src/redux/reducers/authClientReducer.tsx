const authClientReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'LOGINCLIENT':
            return { data: action.payload, status: true };
        case 'LOGOUTCLIENT':
            return { data: {}, status: false };
        default:
            return state;
    }
};

export default authClientReducer;
