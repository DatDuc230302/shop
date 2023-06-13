import classNames from 'classnames/bind';
import style from './Payment.module.scss';

const cx = classNames.bind(style);
function Payment() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>Payment</div>
        </div>
    );
}

export default Payment;
