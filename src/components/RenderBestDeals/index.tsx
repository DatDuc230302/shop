import classNames from 'classnames/bind';
import style from './RenderBestDeals.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { Link, useLocation } from 'react-router-dom';
import RenderProducts from '../RenderProducts';
import { useMediaQuery } from 'react-responsive';
import Loading from '../Loading';
import { loadingApi } from '../Loading';
import RenderCustom from '../RenderCustom';

const bestDealsBG = [
    'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/SteamGiftCards%2Fbg1.avif?alt=media&token=2b885803-4c02-4b96-bf4a-83b86d181355',
    'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/BestGamesChoice%2Fbg1.avif?alt=media&token=f3443e4a-6ac8-4af2-817a-cef53094d3cd',
    'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/RanDomKeys%2FRanDomKeys.avif?alt=media&token=eea1b183-abe1-42d4-8d1e-54e80b6cf260',
];

const cx = classNames.bind(style);
function RenderBestDeals() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [backgound, setBackGround] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [componentId, setComponentId] = useState(-1);

    // Location
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const pathSegments = pathname.split('/');
        const typeKey = pathSegments[pathSegments.length - 1];
        setType(typeKey);
    }, [location]);

    // Effect

    useEffect(() => {
        switch (type) {
            case 'steam-gift-cards':
                getApiSteamGiftCards();
                setBackGround(bestDealsBG[0]);
                setComponentId(0);
                document.title = 'Steam Gift Cards';
                break;
            case 'best-games-choice':
                getApiBestGamesChoice();
                setBackGround(bestDealsBG[1]);
                setComponentId(1);
                document.title = 'Best Games Choice';
                break;
            case 'random-keys':
                getApiRanDomKeys();
                setBackGround(bestDealsBG[2]);
                setComponentId(2);
                document.title = 'Random Keys';
                break;
            default:
                break;
        }
    }, [type]);

    // Function
    const getApiSteamGiftCards = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyCate?category=${'gift cards'}`);
        setApi(api.data);
    }, setLoading);

    const getApiBestGamesChoice = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/querySoldCate?category=${'gaming'}`);
        setApi(data.data);
    }, setLoading);

    const getApiRanDomKeys = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/querySoldCate?category=${'keys'}`);
        setApi(data.data);
    }, setLoading);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('background', tb && 'tb', mb && 'mb')}>
                        <img className={cx('bg-img')} alt="" src={backgound} />
                        <div className={cx('body')}>
                            <div className={cx('products')}>
                                {api.map((item: any, index: number) => (
                                    <Link to={`/detail/${item._id}`} key={index} className={cx('product-item')}>
                                        <div className={cx('product-img')}>
                                            <img className={cx('productImg-main')} src={item.img} alt="" />
                                            {componentId === 0 && (
                                                <img
                                                    className={cx('productImg-sub')}
                                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/SteamGiftCards%2Fsubbg1.webp?alt=media&token=793ce627-3aea-48c2-907d-3c4986b01ba8"
                                                />
                                            )}
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
                            {componentId === 0 && (
                                <div className={cx('advert')}>
                                    <img
                                        src="https://images.g2a.com/uiadminimages/1170x130/1x1x1/bab189c1dc35/b1909c70b32d479c9137c71c"
                                        alt=""
                                    />
                                </div>
                            )}
                            {componentId === 1 && <RenderCustom type={'RanDomKeys'} />}
                            {componentId === 2 && <RenderCustom type={'Csgo'} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RenderBestDeals;
