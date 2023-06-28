import classNames from 'classnames/bind';
import style from './AdminManageProducts.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../../connect';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Loading, { loadingApi } from '../../../components/Loading';
import queryString from 'query-string';

const cx = classNames.bind(style);
function AdminManageProducts() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = queryString.parse(location.search);

    const [api, setApi] = useState([]);
    const [totalApi, setTotalApi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [totalProducts, setTotalProducts] = useState(0);
    const name = !queryParams.name ? '' : queryParams.name;

    const pageSize = 5;
    let pageNum = !queryParams.page ? 1 : Number(queryParams.page);
    const page = `?pageSize=${pageSize}&pageNum=${pageNum}`;

    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const url = valueInput.length > 0 ? `?name=${valueInput}` : '';
            navigate(url);
        }, 1000); // Thời gian debounce, 500ms trong ví dụ này}
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [valueInput]);

    useEffect(() => {
        if (valueInput.length > 0) {
            getApiQuery();
        } else {
            getApi();
        }
    }, [location.search]);

    const getApi = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyAll${page}`);
        setApi(api.data.result);
        setTotalApi(api.data.totalProducts);
    }, setLoading);

    const getApiQuery = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyName${page}&name=${name}`);
        setApi(api.data.result);
        setTotalApi(api.data.totalProducts);
    }, setLoading);

    const handlePageNum = async (bool: boolean) => {
        if (bool) {
            if (pageNum > 1) {
                const urlName = name.length > 0 ? `?name=${name}` : '';
                const page = `page=${pageNum - 1}`;
                const url = name.length > 0 ? `${urlName}&${page}` : `${urlName}?${page}`;
                navigate(url);
            }
        } else {
            if (pageNum < Math.ceil(totalApi.length / pageSize)) {
                const urlName = name.length > 0 ? `?name=${name}` : '';
                const page = `page=${pageNum + 1}`;
                const url = name.length > 0 ? `${urlName}&${page}` : `${urlName}?${page}`;
                navigate(url);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('header')}>Manage Products</span>
                <div className={cx('search-control')}>
                    <input
                        onChange={(e) => setValueInput(String(e.target.value))}
                        value={valueInput}
                        placeholder="Search product by name here!"
                        className={cx('search-input')}
                        type="text"
                    />
                    <div className={cx('tools')}>
                        {totalApi.length > 5 ? totalProducts : api.length} / {totalApi.length}
                    </div>
                    <div className={cx('btns')}>
                        <div onClick={() => handlePageNum(true)} className={cx('btn')}>
                            Prev
                        </div>
                        <div onClick={() => handlePageNum(false)} className={cx('btn')}>
                            Next
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('layout2')}>
                        {loading ? (
                            <Loading />
                        ) : api.length <= 0 ? (
                            <span className={cx('header')}>Not Found</span>
                        ) : (
                            api.map((item: any, index: number) => (
                                <Link
                                    to={`/admin/manage-products/editProduct/${item._id}`}
                                    key={index}
                                    className={cx('layout2-item')}
                                >
                                    <div className={cx('layout2-box')}>
                                        <img className={cx('layout2-img')} src={item.img} alt="" />
                                    </div>
                                    <div className={cx('layout2-detail', tb && 'tb', mb && 'mb')}>
                                        <div className={cx('layout2-info')}>
                                            <span className={cx('layout2-title')}>{item.title}</span>
                                            <span className={cx('layout2-name', tb && 'tb', mb && 'mb')}>
                                                {item.name}
                                            </span>
                                        </div>
                                        <div className={cx('layout2-buy', tb && 'tb', mb && 'mb')}>
                                            <span className={cx('layout2-price')}>
                                                <span style={{ fontWeight: 100, marginRight: 4.2 }}>$ </span>{' '}
                                                {item.priceDiscount > 0 ? item.priceDiscount : item.price}
                                            </span>
                                            {item.discount > 0 && (
                                                <span className={cx('layout2-oldPrice')}>$ {item.price}</span>
                                            )}
                                            {item.discount > 0 && (
                                                <span className={cx('layout2-discount')}>-{item.discount}%</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminManageProducts;
