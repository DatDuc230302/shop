import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';

const cx = classNames.bind(style);

function Layout1({ api }: any) {
    const priceDiscount = (price: number, discount: number) => {
        const result = price - (discount / 100) * price;
        return result.toFixed(2);
    };

    return (
        <div className={cx('layout1')}>
            {api.map((item: any, index: number) => (
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
