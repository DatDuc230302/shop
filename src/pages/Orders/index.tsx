import classNames from 'classnames/bind';
import style from './Orders.module.scss';
import { logo } from '../../assets/logo';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth';
import { useEffect } from 'react';
import ClientKeys from '../../components/ClientKeys';

const cx = classNames.bind(style);
function Orders() {
    // Router
    const navigate = useNavigate();

    // CurrentUserId LocalStorage
    const currentUserId = localStorage.getItem('currentUserId');

    useEffect(() => {
        if (currentUserId) {
        } else {
            navigate('/');
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <Link to={'/'} className={cx('header-logo')}>
                        {logo}
                    </Link>
                    <div className={cx('header-user')}>
                        <Auth />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-side')}></div>
                    <div className={cx('body-main')}>
                        <ClientKeys userId={currentUserId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
