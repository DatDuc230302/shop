import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);

const pros = [
    {
        img: 'https://images.g2a.com/newlayout/75x101/1x1x0/xbox-game-pass-for-pc-3-months-global-i10000080969032/5de8df4b7e696c21f802e792',
        name: 'Xbox Game Pass for PC 3 Months - Key - GLOBAL',
        price: 26.9,
        discount: 36,
        base: 'SPONSORED',
        category: 'games',
    },
    {
        img: 'https://images.g2a.com/newlayout/75x101/1x1x0/fifa23-coins-xbox-one-series-x-s-1m-mmopixel-comfort-trade-global-i10000336993033/b7647b82b9b3460997a20b35',
        name: 'Xbox Game Pass for PC 3 Months - Key - GLOBAL',
        price: 16.03,
        discount: 0,
        base: 'SPONSORED',
        category: 'games',
    },
    {
        img: 'https://images.g2a.com/newlayout/470x275/1x1x0/xbox-game-pass-for-pc-3-months-global-i10000080969032/5cc03659ae653ac9c43f9f65',
        name: 'Xbox Game Pass for PC 3 Months - Key - GLOBAL',
        price: 74.27,
        discount: 3,
        base: 'SPONSORED',
        category: 'games',
    },
];

function Layout2() {
    const pc = useMediaQuery({ minWidth: 992 });

    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const mb = useMediaQuery({ maxWidth: 767 });

    const priceDiscount = (price: number, discount: number) => {
        const result = price - (discount / 100) * price;
        return result.toFixed(2);
    };

    return (
        <div className={cx('layout2')}>
            {pros.map((item, index) => (
                <div key={index} className={cx('layout2-item')}>
                    <div className={cx('layout2-box')}>
                        <img className={cx('layout2-img')} src={item.img} alt="" />
                    </div>
                    <div className={cx('layout2-detail', tb && 'tb', mb && 'mb')}>
                        <div className={cx('layout2-info')}>
                            <span className={cx('layout2-base')}>{item.base}</span>
                            <span className={cx('layout2-name')}>{item.name}</span>
                        </div>
                        <div className={cx('layout2-buy', tb && 'tb', mb && 'mb')}>
                            <span className={cx('layout2-price')}>
                                <span style={{ fontWeight: 100, marginRight: 4.2 }}>$ </span>{' '}
                                {item.discount ? priceDiscount(item.price, item.discount) : item.price}
                            </span>
                            {item.discount > 0 && <span className={cx('layout2-oldPrice')}>$ {item.price}</span>}
                            {item.discount > 0 && <span className={cx('layout2-discount')}>-{item.discount}%</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Layout2;
