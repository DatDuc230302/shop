import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';

const cx = classNames.bind(style);

const pros = [
    {
        img: 'https://images.g2a.com/newlayout/470x275/1x1x0/xbox-game-pass-for-pc-3-months-global-i10000080969032/5cc03659ae653ac9c43f9f65',
        name: 'Xbox Game Pass for PC 3 Months - Key - GLOBAL',
        price: 26.9,
        discount: 36,
        base: 'SPONSORED',
        category: 'games',
    },
    {
        img: 'https://images.g2a.com/newlayout/470x275/1x1x0/xbox-game-pass-for-pc-3-months-global-i10000080969032/5cc03659ae653ac9c43f9f65',
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

function Layout1() {
    const priceDiscount = (price: number, discount: number) => {
        const result = price - (discount / 100) * price;
        return result.toFixed(2);
    };

    return (
        <div className={cx('layout1')}>
            {pros.map((item, index) => (
                <div key={index} className={cx('layout1-box')}>
                    <span className={cx('layout1-base')}>{item.base}</span>
                    <div className={cx('layout1-item')}>
                        <img className={cx('layout1-img')} src={item.img} alt="" />
                        <div className={cx('layout1-info')}>
                            <span className={cx('layout1-name')}>{item.name}</span>
                            <div>
                                <span className={cx('layout1-price')}>
                                    <span style={{ fontWeight: 100, marginRight: 4.2 }}>$ </span>{' '}
                                    {item.discount ? priceDiscount(item.price, item.discount) : item.price}
                                </span>
                                {item.discount > 0 && <span className={cx('layout1-oldPrice')}>$ {item.price}</span>}
                                {item.discount > 0 && <span className={cx('layout1-discount')}>-{item.discount}%</span>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Layout1;
