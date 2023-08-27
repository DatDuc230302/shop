import classNames from 'classnames/bind';
import style from './ClientKeys.module.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { loadingApi } from '../Loading';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);
function ClientKeys({ userId }: any) {
    // Redux
    const currentUser = useSelector((state: any) => state.authClientReducer);
    const currentUserId = localStorage.getItem('currentUserId');

    // State
    const [api, setApi] = useState<object[]>([]);
    const [loading, setLoading] = useState('');

    // Router
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUserId) {
            getOrder();
        } else {
            navigate('/');
        }
    }, [currentUser]);

    const getOrder = loadingApi(async () => {
        const result = await axios.get(`${ServerURL}/orders/getOrdered?userId=${userId}`);
        const ordereds = result.data.result;

        if (ordereds) {
            // Nối mảng products của từng orders đã được lấy xuống từ server
            let concatArr: object[] = [];
            for (var i = 0; i < ordereds.length; i++) {
                concatArr = concatArr.concat(ordereds[i].products);
            }
            setApi(concatArr);
        }
    }, setLoading);

    // Function
    const formatDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const handleSearch = (e: any) => {
        const value = e.target.value;
        const filteredProducts = api.filter((product: any) =>
            product.nameProduct.toLowerCase().includes(value.toLowerCase()),
        );
        if (value.length > 0) {
            setApi(filteredProducts);
        } else {
            getOrder();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>Your keys</div>
                <div className={cx('info')}>
                    <div className={cx('info-item')}>PURCHASED</div>
                </div>
                <div className={cx('tools')}>
                    <div className={cx('search')}>
                        <span className={cx('search-title')}>Search :</span>
                        <div className={cx('search-input')}>
                            <input onChange={(e) => handleSearch(e)} type="text" placeholder="Product name..." />
                            <div className={cx('search-icon')}>
                                <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="search"
                                    width="2rem"
                                    height="2rem"
                                    fill="#5D9DFC"
                                >
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <div style={{ marginTop: 20 }}>
                        <Loading />
                    </div>
                ) : (
                    <div className={cx('products')}>
                        <div className={cx('products-item')}>
                            <div className={cx('item-title')}>Name</div>
                            <div className={cx('item-title')}>Key</div>
                            <div className={cx('item-title')}>Time</div>
                            <div className={cx('item-title')}>View Product</div>
                            <div className={cx('item-title')}>Download</div>
                        </div>
                        {api.map((item: any, index: number) => (
                            <div key={index} className={cx('products-item')}>
                                <div className={cx('item-title')}>
                                    <input onChange={() => ''} type="text" value={item.nameProduct} />
                                </div>
                                <div className={cx('item-title')}>{item.key}</div>
                                <div className={cx('item-title')}>{formatDate(item.orderedAt)}</div>
                                <div className={cx('item-title')}>
                                    <Link to={`/detail/${item.idProduct}`} className={cx('view')}>
                                        View
                                    </Link>
                                </div>
                                <div className={cx('item-title')}>
                                    <div
                                        onClick={() => alert(`You are downloading this game. (${item.nameProduct})`)}
                                        className={cx('view')}
                                    >
                                        Download
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClientKeys;
