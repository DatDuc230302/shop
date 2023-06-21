import classNames from 'classnames/bind';
import style from './BestDeals.module.scss';
import SteamGiftCard from '../../components/RenderBestDeals';

const cx = classNames.bind(style);
function BestDeals() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SteamGiftCard />
            </div>
        </div>
    );
}

export default BestDeals;
