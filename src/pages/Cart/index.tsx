import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { emptyCart } from '../../assets/imgs/empty_cart';

const cx = classNames.bind(style);

function Cart() {
    const [api, setApi] = useState([]);
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const id = localStorage.getItem('currentUser');
        const data = await axios.post('http://localhost:5000/users/findId', { id: id });
        if (data.data.length > 0) {
            setApi(data.data[0].carts);
        } else {
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {api.length === 0 && (
                    <div className={cx('empty')}>
                        <div className={cx('img')}>{emptyCart}</div>
                        <span className={cx('title')}>Your cart is empty</span>
                        <span className={cx('content')}>Go ahead and add some cool stuff to it!</span>
                        <span className={cx('browse')}>Browse deals</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
