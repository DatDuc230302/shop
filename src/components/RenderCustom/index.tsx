import classNames from 'classnames/bind';
import style from './RenderCustom.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function RenderCustom({ type }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        switch (type) {
            case 'RanDomKeys':
                getApiKeys();
                setTitle("Can't find anything you like? Try some random keys!");
                break;
            case 'Csgo':
                getApiCsgo();
                setTitle('Need a new CS:GO skin?');
                break;
            default:
                break;
        }
    }, []);

    // Function
    const getApiKeys = async () => {
        const data = await axios.get(
            `${ServerURL}/products/queryCate?category=${'keys'}&priceMin=${0}&priceMax=${100000000}`,
        );
        setApi(data.data);
    };

    const getApiCsgo = async () => {
        const data = await axios.get(`${ServerURL}/products/queryNote?note=${'csgo'}`);
        setApi(data.data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('header')}>{title}</span>
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    {api.map((item: any, index: number) => (
                        <Link to={`/detail/${item._id}`} key={index} className={cx('item')}>
                            <div className={cx('item-img')}>
                                <img src={item.img} alt="" />
                            </div>
                            <div className={cx('item-info')}>
                                <span className={cx('item-name')}>{item.name}</span>
                                <div className={cx('item-detail')}>
                                    <span className={cx('item-title')}>{item.title}</span>
                                    <div className={cx('item-cost')}>
                                        <span className={cx('item-price')}>
                                            {item.discount > 0 ? item.priceDiscount : item.price}
                                            <span className={cx('item-character')}>USD</span>
                                        </span>
                                        {item.discount > 0 && (
                                            <div className={cx('item-discount')}>
                                                <span className={cx('itemDiscount-price')}>
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        {item.discount > 0 ? item.priceDiscount : item.price}
                                                    </span>
                                                    <span className={cx('itemDiscount-character')}>USD</span>
                                                </span>
                                                <span className={cx('itemDiscount-percent')}>-94%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RenderCustom;
