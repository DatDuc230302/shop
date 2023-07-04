import classNames from 'classnames/bind';
import style from './RenderCustom.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { loadingApi } from '../Loading';
import Skeleton from '../Skeleton';

const cx = classNames.bind(style);
function RenderCustom({ type, theme = 'light' }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

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
            case 'Antivirus':
                getApiAntivirus();
                setTitle('You may also like');
                break;
            case 'Trending':
                getTrending();
                setTitle('Trending Now');
                break;
            case 'Software':
                getSoftWare();
                setTitle('Software');
                break;
            case 'underten':
                getUnderTen();
                setTitle('Games under 10€');
                break;
            default:
                break;
        }
    }, []);

    // Function
    const getApiKeys = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyCate?category=${'keys'}`);
        setApi(api.data);
    }, setLoading);

    const getApiCsgo = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryType?type=${'csgo'}`);
        setApi(api.data);
    }, setLoading);

    const getApiAntivirus = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryType?type=${'antivirus'}`);
        setApi(api.data);
    }, setLoading);

    const getTrending = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryTrending?quantity=${6}`);
        setApi(api.data);
    }, setLoading);

    const getSoftWare = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyCate?category=${'software'}&quantity=${6}`);
        setApi(api.data);
    }, setLoading);

    const getUnderTen = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryLtPrice?gtPrice=${10}&quantity=${6}`);
        setApi(api.data.result);
    }, setLoading);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Skeleton quantity={6} />
            ) : (
                <div className={cx('inner')}>
                    <span style={{ color: theme === 'dark' ? '#fff' : '#000' }} className={cx('header')}>
                        {title}
                    </span>
                    <div className={cx('body', tb && 'tb', mb && 'mb')}>
                        {api.map((item: any, index: number) => (
                            <Link to={`/detail/${item._id}`} key={index} className={cx('item')}>
                                <div className={cx('item-img')}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className={cx('item-info')}>
                                    <span
                                        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                                        className={cx('item-name')}
                                    >
                                        {item.name}
                                    </span>
                                    <div className={cx('item-detail')}>
                                        <span
                                            style={{ color: theme === 'dark' ? '#ffffff47' : '#00000047' }}
                                            className={cx('item-title')}
                                        >
                                            {item.title}
                                        </span>
                                        <div className={cx('item-cost')}>
                                            <span
                                                style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                                                className={cx('item-price')}
                                            >
                                                {item.discount > 0 ? item.priceDiscount : item.price}
                                                <span className={cx('item-character')}>USD</span>
                                            </span>
                                            {item.discount > 0 && (
                                                <div className={cx('item-discount')}>
                                                    <span
                                                        style={{ color: theme === 'dark' ? '#909090' : '#0000008a' }}
                                                        className={cx('itemDiscount-price')}
                                                    >
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
            )}
        </div>
    );
}

export default RenderCustom;
