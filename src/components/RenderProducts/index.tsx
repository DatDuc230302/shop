import classNames from 'classnames/bind';
import style from './RenderProducts.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { loadingApi } from '../Loading';
import Skeleton from '../Skeleton';

const cx = classNames.bind(style);

const cheaps = [1, 2, 5, 10, 20, 30];

const topgames = ['Steam Games', 'Origin Games', 'Xbox Live Games', 'GOG Games', 'Ubisoft Connect', 'PSN Games'];
function RenderProducts({ type }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [title, setTitle] = useState('');
    const [moveLink, setMoveLink] = useState('');
    const [content, setContent] = useState('');
    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(false);

    // Effect
    useEffect(() => {
        switch (type) {
            case 'trending':
                setTitle('Trending products');
                getApiTrending();
                setMoveLink('trending-games');
                setContent(
                    'The best offers, new video games, AAA titles and indies, DLCs, gift cards, and more. Buy bestselling games, and other digital products at the best possible price.',
                );
                break;
            case 'bestSell':
                setTitle('Bestsellers');
                getApiBestSell();
                setMoveLink('best-sell');
                setContent('Browse the most popular video games & other products.');
                break;
            case 'giftcard':
                setTitle('Gift Cards');
                getApiGiftcard();
                setMoveLink('giftcart');
                setContent('Gain a fast and easy access to stores and services.');
                break;
            case 'bestSoftware':
                setTitle('Best software products');
                getBestCateSoftware();
                setMoveLink('software');
                setContent(
                    "From methods of protecting your PC to software useful in your professional life, you'll find it all here at attractive prices.",
                );
                break;
            case 'cheap':
                setTitle('Cheap products');
                setContent(
                    'Are you low on cash or just want to score a great bargain? G2A offers a selection of great video games that can be bought for a whole lot less, even under one euro!',
                );
                break;
            case 'other':
                getOther();
                setTitle('Cryptocurrencies');
                setContent(
                    'Want to invest in BitCoin or another cryptocurrency? Browse through our wide selection of gift cards for a fast, comfortable, and safe purchase.',
                );
                break;
            case 'topgame':
                setTitle('TOP Game Platforms');
                setContent(
                    'Are you low on cash or just want to score a great bargain? G2A offers a selection of great video games for all major gaming platforms!',
                );
                break;
            default:
                return;
        }
    }, []);

    useEffect(() => {
        if (mb || tb) {
            setLimit(12);
        } else {
            setLimit(6);
        }
    }, [mb, tb, pc]);

    const getApiBestSell = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/querySelling?quantity=${12}`);
        setApi(data.data);
    }, setLoading);

    const getApiTrending = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/queryTrending?quantity=${12}`);
        setApi(data.data);
    }, setLoading);

    const getApiGiftcard = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/sortDateOnlyCate?category=${'gift cards'}`);
        setApi(api.data);
    }, setLoading);

    const getBestCateSoftware = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/querySoldCate?category=${'software'}&quantity=${12}`);
        setApi(data.data);
    }, setLoading);

    const getOther = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryOnlyCate?category=${'other'}`);
        setApi(api.data);
    }, setLoading);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    {type !== 'cheap' && type !== 'topgame' && (
                        <div className={cx('inner')}>
                            <div className={cx('header')}>
                                <div className={cx('header-row')}>
                                    <span className={cx('header-title')}>{title}</span>
                                    <Link to={`/best-deals/${moveLink}`} className={cx('header-all')}>
                                        Discover all
                                    </Link>
                                </div>
                                <span className={cx('header-content')}>{content}</span>
                            </div>
                            <div className={cx('body', tb && 'tb', mb && 'mb')}>
                                {api.map(
                                    (item: any, index: number) =>
                                        index < limit && (
                                            <Link to={`/detail/${item._id}`} key={index} className={cx('item')}>
                                                <span className={cx('base')}>{item.title}</span>
                                                <div className={cx('product')}>
                                                    <div className={cx('product-img')}>
                                                        <img src={item.img} alt="" />
                                                    </div>
                                                    <div className={cx('product-detail')}>
                                                        <span className={cx('product-name')}>{item.name} </span>
                                                        <div className={cx('product-price')}>
                                                            <span className={cx('price')}>
                                                                ${' '}
                                                                <b>
                                                                    {item.discount > 0
                                                                        ? item.priceDiscount
                                                                        : item.price}
                                                                </b>
                                                            </span>
                                                            {item.discount > 0 && (
                                                                <span className={cx('price-old')}>
                                                                    {item.priceDiscount}
                                                                </span>
                                                            )}
                                                            {item.discount > 0 && (
                                                                <span className={cx('price-discount')}>
                                                                    {item.discount}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ),
                                )}
                            </div>
                            {api.length > 6 && pc && limit < 12 && (
                                <span onClick={() => setLimit(12)} className={cx('more')}>
                                    Show More
                                </span>
                            )}
                        </div>
                    )}

                    {type === 'cheap' && (
                        <div className={cx('inner')}>
                            <div className={cx('header')}>
                                <div className={cx('header-row')}>
                                    <span className={cx('cheap-title')}>{title}</span>
                                </div>
                                <span className={cx('header-content')}>{content}</span>
                            </div>
                            <div className={cx('body-cheaps', tb && 'tb', mb && 'mb')}>
                                {cheaps.map((item: number, index: number) => (
                                    <Link to={`/category?priceMax=${item}`} key={index} className={cx('cheap-item')}>
                                        Up to {item} EUR
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {type === 'topgame' && (
                        <div className={cx('inner')}>
                            <div className={cx('header')}>
                                <div className={cx('header-row')}>
                                    <span className={cx('cheap-title')}>{title}</span>
                                </div>
                                <span className={cx('header-content')}>{content}</span>
                            </div>
                            <div className={cx('body-cheaps', tb && 'tb', mb && 'mb')}>
                                {topgames.map((item: string, index: number) => (
                                    <div key={index} className={cx('cheap-item')}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default RenderProducts;
