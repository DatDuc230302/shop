import classNames from 'classnames/bind';
import style from './BestDeals.module.scss';
import SteamGiftCard from '../../components/RenderBestDeals';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);
function BestDeals() {
    const location = useLocation();

    // Effect
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SteamGiftCard />
            </div>
        </div>
    );
}

export default BestDeals;
