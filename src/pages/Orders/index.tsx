import classNames from 'classnames/bind';
import style from './Orders.module.scss';
import { logo } from '../../assets/logo';
import { Link } from 'react-router-dom';
import Auth from '../../components/Auth';

const cx = classNames.bind(style);
function Orders() {
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
            </div>
        </div>
    );
}

export default Orders;
