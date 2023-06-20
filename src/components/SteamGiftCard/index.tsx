import classNames from 'classnames/bind';
import style from './SteamGiftCard.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { Link } from 'react-router-dom';
import RenderProducts from '../RenderProducts';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);
function SteamGiftCard() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);

    // Effect
    useEffect(() => {
        getApi();
    }, []);

    // Function
    const getApi = async () => {
        const data = await axios.post(`${ServerURL}/products/sortDateCate`, { category: 'gift cards' });
        setApi(data.data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('background', tb && 'tb', mb && 'mb')}>
                    <img
                        className={cx('bg-img')}
                        alt=""
                        src="https://images.g2a.com/uiadminimages/2560x720/1x1x1/f2fc2926d4a4/2e6cc1fa699b41fca5567c5d"
                    />
                    <div className={cx('body')}>
                        <div className={cx('products')}>
                            {api.map((item: any, index: number) => (
                                <Link to={`/detail/${item._id}`} key={index} className={cx('product-item')}>
                                    <div className={cx('product-img')}>
                                        <img className={cx('productImg-main')} src={item.img} alt="" />
                                        <img
                                            className={cx('productImg-sub')}
                                            src="https://images.g2a.com/newlayout/63x85/1x1x0/steam-gift-card-300-tl-steam-key-for-tl-currency-only-i10000000258259/5c405f64ae653a4ae53570e3"
                                        />
                                    </div>
                                    <div className={cx('product-detail')}>
                                        <div className={cx('product-name')}>{item.name}</div>
                                        <div className={cx('product-cost')}>
                                            <span className={cx('product-title')}>{item.title}</span>
                                            <span className={cx('product-price')}>
                                                {item.discount > 0 ? item.priceDiscount : item.price}
                                                <span className={cx('product-character')}>USD</span>
                                            </span>
                                            {item.discount > 0 && (
                                                <div className={cx('product-discount')}>
                                                    <span className={cx('productDiscount-price')}>
                                                        <span style={{ textDecoration: 'line-through' }}>
                                                            {item.price}
                                                        </span>
                                                        <span className={cx('productDiscount-character')}>USD</span>
                                                    </span>
                                                    <span className={cx('productDiscount-percent')}>
                                                        -{item.discount}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('session')}>
                    <div className={cx('session-body')}>
                        <RenderProducts type={'topgame'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SteamGiftCard;
