const cartReducer = (state = false, action: any) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return !state;
        default:
            return state;
    }
};

export default cartReducer;
