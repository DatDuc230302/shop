import classNames from 'classnames/bind';
import style from './BestDeals.module.scss';

const cx = classNames.bind(style);

function BestDeals() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>This best Deals</div>
        </div>
    );
}

export default BestDeals;
