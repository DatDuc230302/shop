import classNames from 'classnames/bind';
import style from './SearchArea.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sorts } from '../../apiLocal/sorts';
import HeadLessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import SearchArea1 from '../SearchArea1';
import { useMediaQuery } from 'react-responsive';
import { ServerURL } from '../../connect';
import axios from 'axios';
import { loadingApi } from '../Loading';

const cx = classNames.bind(style);

function SearchArea({ category }: any) {
    const url = window.location.href;
    const params = useParams();
    let str = url.indexOf('query=');
    let key = '';
    key = key + params.key;
    const [query, setQuery] = useState('');
    useEffect(() => {
        setQuery('');
    }, [params.key]);
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);

    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [sortOption, setSortOption] = useState(false);
    const [valueSort, setValueSort] = useState('Best match');
    const [countSort, setCountSort] = useState(-1);
    const [view, setView] = useState(1);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(100000000);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (str !== -1) {
            let temp = url.slice(str + 6);
            temp = temp.replace(/%/g, ' ');
            temp = temp.replace(/20/g, '');
            setQuery(temp);
        }
    }, [params]);

    const handleSortItem = (title: string, index: number) => {
        setValueSort(title);
        setCountSort(index);
    };

    useEffect(() => {
        if (category !== undefined) {
            if (query.length > 0) {
                findNameCateAndQuery();
            } else {
                findNameCate();
            }
        } else {
            if (query.length > 0) {
                findName();
            } else {
                findAll();
            }
        }
        // if (category !== undefined && query.length > 0) {
        //     findNameCateAndQuery();
        //     return;
        // }
        // if (category === undefined) {
        //     if (query.length > 0) {
        //         findName();
        //     } else {
        //         findAll();
        //     }
        // } else {
        //     findNameCate();
        // }
    }, [category, query]);

    useEffect(() => {
        setValueSort('Best match');
        setCountSort(-1);
    }, [query]);

    useEffect(() => {
        setValueSort('Best match');
        setCountSort(-1);
    }, [category]);

    // Sort Api
    useEffect(() => {
        switch (countSort) {
            case 0:
                if (category !== undefined && query.length > 0) {
                    findNameCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    findName();
                } else {
                    findNameCate();
                }
                break;
            case 1:
                if (category !== undefined && query.length > 0) {
                    sortDateCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    sortDate();
                } else {
                    sortDateCate();
                }
                break;
            case 2:
                if (category !== undefined && query.length > 0) {
                    sortLowestCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    sortLowest();
                } else {
                    sortLowestCate();
                }
                break;
            case 3:
                if (category !== undefined && query.length > 0) {
                    sortHighestCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    sortHighest();
                } else {
                    sortHighestCate();
                }
                break;
            default:
                return;
        }
    }, [countSort]);

    const findAll = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/get`);
        setApi(data.data);
    }, setLoading);

    const findName = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/findName`, { key: String(query) });
        setApi(data.data);
    }, setLoading);

    const findNameCate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/findNameCate`, { category: category });
        setApi(data.data);
    }, setLoading);

    const findNameCateAndQuery = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/findNameCateAndQuery`, {
            category: category,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    const sortDate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortDate`, { key: String(query) });
        setApi(data.data);
    }, setLoading);

    const sortDateCate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortDateCate`, { category: category });
        setApi(data.data);
    }, setLoading);

    const sortDateCateAndQuery = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortDateCateAndQuery`, {
            category: category,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    const sortLowest = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortLowest`, { key: String(query) });
        setApi(data.data);
    }, setLoading);

    const sortLowestCate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortLowestCate`, { category: category });
        setApi(data.data);
    }, setLoading);

    const sortLowestCateAndQuery = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortLowestCateAndQuery`, {
            category: category,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    const sortHighest = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortHighest`, { key: String(query) });
        setApi(data.data);
    }, setLoading);

    const sortHighestCate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortHighestCate`, { category: category });
        setApi(data.data);
    }, setLoading);

    const sortHighestCateAndQuery = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortHighestCateAndQuery`, {
            category: category,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    const sortBetweenPrice = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortBetweenPrice`, {
            priceMin: priceMin,
            priceMax: priceMax,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    const sortBetweenPriceCate = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortBetweenPriceCate`, {
            priceMin: priceMin,
            priceMax: priceMax,
            category: category,
        });
        setApi(data.data);
    }, setLoading);

    const sortBetweenPriceCateAndQuery = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/sortBetweenPriceCateAndQuery`, {
            priceMin: priceMin,
            priceMax: priceMax,
            category: category,
            key: String(query),
        });
        setApi(data.data);
    }, setLoading);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            // Xử lý logic sau thời gian debounce
            if (priceMax !== 100000000 && priceMax !== 0) {
                if (category !== undefined && query.length > 0) {
                    sortBetweenPriceCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    sortBetweenPrice();
                } else {
                    sortBetweenPriceCate();
                }
            } else if (priceMin === 0 && priceMax === 0) {
                if (category !== undefined && query.length > 0) {
                    findNameCateAndQuery();
                    return;
                }
                if (category === undefined) {
                    findName();
                } else {
                    findNameCate();
                }
            }
        }, 1000); // Thời gian debounce, 500ms trong ví dụ này}

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [priceMin, priceMax]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('result')}>
                    <Link to={'/'} className={cx('result-link')}>
                        G2A
                    </Link>
                    <span className={cx('result-character')}> › </span>
                    {newKey !== 'Search' && (
                        <>
                            <span className={cx('result-title')}>{category !== undefined ? newKey : 'Category'}</span>
                            <span className={cx('result-character')}> › </span>
                        </>
                    )}

                    <span className={cx('result-title')}>Search results</span>
                </div>
                {pc && (
                    <div className={cx('tools')}>
                        <div className={cx('tools-result')}>
                            <span className={cx('tools-name')}>
                                {query.length > 0
                                    ? `${query} - search results`
                                    : category !== undefined
                                    ? newKey
                                    : 'Category'}
                            </span>
                            <div className={cx('tools-quantity')}>
                                {query.length > 0 ? (
                                    <>
                                        {api.length} results for:{' '}
                                        <span className={cx('toolsQuantity-name')}>"{query}"</span>
                                    </>
                                ) : (
                                    `${api.length} products`
                                )}
                            </div>
                        </div>
                        <div className={cx('tools-actions')}>
                            <div onClick={() => setView(0)} className={cx('actions-view')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14px" height="14px">
                                    <g
                                        className={cx('view-icon', view === 0 && 'active')}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                    >
                                        <path d="M1 12h22M1 5h22M1 19h22"></path>
                                    </g>
                                </svg>
                            </div>
                            <div onClick={() => setView(1)} className={cx('actions-view')}>
                                <svg
                                    className={cx('view-icon', view === 0 && 'active')}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000"
                                    viewBox="0 0 22 22"
                                    width="14px"
                                    height="14px"
                                >
                                    <path
                                        className={cx('view-icon', view === 1 && 'active')}
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M5 1H1v4h4V1zm0 8H1v4h4V9zm0 8H1v4h4v-4zm8-16H9v4h4V1zm0 8H9v4h4V9zm0 8H9v4h4v-4zm8-16h-4v4h4V1zm0 8h-4v4h4V9zm0 8h-4v4h4v-4z"
                                    ></path>
                                </svg>
                            </div>
                            <span className={cx('sort-title')}>Sort by</span>
                            <div className={cx('sort-box')}>
                                <HeadLessTippy
                                    onClickOutside={() => setSortOption(false)}
                                    visible
                                    interactive
                                    placement="bottom-start"
                                    offset={[1, 0]}
                                    zIndex={100}
                                    render={() => (
                                        <div className={cx('sort-option', sortOption && 'show')}>
                                            {sorts.map((item, index) => (
                                                <div
                                                    onClick={() => handleSortItem(item, index)}
                                                    key={index}
                                                    className={cx('sortOption-item', countSort === index && 'active')}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                >
                                    <div
                                        onClick={() => setSortOption(!sortOption)}
                                        className={cx('sort-select', sortOption && 'disable')}
                                    >
                                        {valueSort}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="25px"
                                            height="25px"
                                            fill="currentColor"
                                            className={cx('arrown-down', sortOption && 'rotate')}
                                        >
                                            <path
                                                fill="none"
                                                strokeMiterlimit="10"
                                                d="M8 14l4-4 4 4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                </HeadLessTippy>
                            </div>
                        </div>
                    </div>
                )}
                <SearchArea1
                    loading={loading}
                    setPriceMin={setPriceMin}
                    setPriceMax={setPriceMax}
                    api={api}
                    query={query}
                    view={view}
                />
            </div>
        </div>
    );
}

export default SearchArea;
