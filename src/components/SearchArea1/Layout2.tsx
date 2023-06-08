import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);

function Layout2({ api, priceMin, priceMax }: any) {
    const pc = useMediaQuery({ minWidth: 992 });

    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const mb = useMediaQuery({ maxWidth: 767 });

    const priceDiscount = (price: number, discount: number) => {
        const result = price - (discount / 100) * price;
        return result.toFixed(2);
    };

    return (
        <div className={cx('layout2')}>
            {api.map(
                (item: any, index: number) =>
                    index < 15 && (
                        <div key={index} className={cx('layout2-item')}>
                            <div className={cx('layout2-box')}>
                                <img className={cx('layout2-img')} src={item.img} alt="" />
                            </div>
                            <div className={cx('layout2-detail', tb && 'tb', mb && 'mb')}>
                                <div className={cx('layout2-info')}>
                                    <span className={cx('layout2-title')}>{item.title}</span>
                                    <span className={cx('layout2-name', tb && 'tb', mb && 'mb')}>{item.name}</span>
                                </div>
                                <div className={cx('layout2-buy', tb && 'tb', mb && 'mb')}>
                                    <span className={cx('layout2-price')}>
                                        <span style={{ fontWeight: 100, marginRight: 4.2 }}>$ </span>{' '}
                                        {item.discount ? priceDiscount(item.price, item.discount) : item.price}
                                    </span>
                                    {item.discount > 0 && (
                                        <span className={cx('layout2-oldPrice')}>$ {item.price}</span>
                                    )}
                                    {item.discount > 0 && (
                                        <span className={cx('layout2-discount')}>-{item.discount}%</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
}

export default Layout2;
