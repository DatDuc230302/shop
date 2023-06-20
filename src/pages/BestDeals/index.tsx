import classNames from 'classnames/bind';
import style from './BestDeals.module.scss';
import SteamGiftCard from '../../components/SteamGiftCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function BestDeals() {
    const location = useLocation();

    const [component, setComponent] = useState(0);

    useEffect(() => {
        const path = location.pathname;
        const lastSegment = path.substring(path.lastIndexOf('/') + 1);
        switch (lastSegment) {
            case 'steam-gift-cards':
                setComponent(1);
                break;
            case 'best-gamers-choice':
                setComponent(2);
                break;
            default:
                break;
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {component === 1 && <SteamGiftCard />}
                {component === 2 && <h1>HIHI</h1>}
            </div>
        </div>
    );
}

export default BestDeals;
