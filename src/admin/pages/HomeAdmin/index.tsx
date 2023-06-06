import classNames from 'classnames/bind';
import style from './HomeAdmin.module.scss';
import AddProduct from '../../components/AddProduct';

const cx = classNames.bind(style);

function HomeAdmin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chilrend')}>
                <AddProduct />
            </div>
        </div>
    );
}

export default HomeAdmin;
