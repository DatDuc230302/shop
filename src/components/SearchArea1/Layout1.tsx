import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Layout1({ api }: any) {
    console.log(api);

    return (
        <div className={cx('layout1')}>
            {api.map(
                (item: any, index: number) =>
                    index < 15 && (
                        <Link to={`/detail/${item._id}`} key={index} className={cx('layout1-box')}>
                            <span className={cx('layout1-title')}>{item.title}</span>
                            <div className={cx('layout1-item')}>
                                <img className={cx('layout1-img')} src={item.img} alt="" />
                                <div className={cx('layout1-info')}>
                                    <span className={cx('layout1-name')}>{item.name}</span>
                                    <div>
                                        <span className={cx('layout1-price')}>
                                            <span style={{ fontWeight: 100, marginRight: 4.2 }}>$ </span>{' '}
                                            {item.priceDiscount > 0 ? item.priceDiscount : item.price}
                                        </span>
                                        {item.discount > 0 && (
                                            <span className={cx('layout1-oldPrice')}>$ {item.price}</span>
                                        )}
                                        {item.discount > 0 && (
                                            <span className={cx('layout1-discount')}>-{item.discount}%</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ),
            )}
        </div>
    );
}

export default Layout1;
