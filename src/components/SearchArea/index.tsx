import classNames from 'classnames/bind';
import style from './SearchArea.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sorts } from '../../apiLocal/sorts';
import HeadLessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import SearchArea1 from '../SearchArea1';
import { useMediaQuery } from 'react-responsive';
import { ServerURL } from '../../connect';
import axios from 'axios';
import { loadingApi } from '../Loading';
import queryString from 'query-string';

const cx = classNames.bind(style);

function SearchArea({ category, categoryDefault, priceMaxUrl }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [query, setQuery] = useState('');
    const [api, setApi] = useState([]);
    const [sortOption, setSortOption] = useState(false);
    const [valueSort, setValueSort] = useState('Best match');
    const [countSort, setCountSort] = useState(-1);
    const [view, setView] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(100000000);
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(100000000);
    const [resultKey, setResultKey] = useState('');

    // Location
    const location = useLocation();
    const params = useParams();

    // Effect
    useEffect(() => {
        const queryParams = queryString.parse(location.search);

        const resultKey = String(params.key).charAt(0).toUpperCase() + String(params.key).slice(1);
        setResultKey(resultKey);

        // Find query in URL after query=
        if (queryParams.query !== undefined) {
            setQuery(String(queryParams.query));
        } else {
            setQuery('');
        }
    }, [location, params.key]);

    useEffect(() => {
        if (tb || mb) {
            setView(0);
        } else {
            setView(1);
        }
    }, [tb, mb]);

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
            }
        }
    }, [category, query.length]);

    useEffect(() => {
        if (priceMaxUrl > 0) {
            setPriceMax(priceMaxUrl);
        } else {
            setPriceMax(100000000);
        }
    }, [priceMaxUrl]);

    useEffect(() => {
        if (categoryDefault === 'category') {
            if (priceMax > 0) {
                sortBetweenPrice();
            } else {
                findAll();
            }
        }
    }, [categoryDefault]);

    useEffect(() => {
        setValueSort('Best match');
        setCountSort(-1);
    }, [query, category]);

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

    // Function
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

    const handleSortItem = (title: string, index: number) => {
        setValueSort(title);
        setCountSort(index);
    };

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>, bool: boolean) => {
        const value: number = Number(e.target.value);
        if (bool) {
            setPriceMin(value);
            setValueMin(value);
        } else {
            setPriceMax(value);
            setValueMax(value);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', tb && 'tb', mb && 'mb')}>
                <div className={cx('result')}>
                    <Link to={'/'} className={cx('result-link')}>
                        G2A
                    </Link>
                    <span className={cx('result-character')}> › </span>
                    {resultKey !== 'Search' && (
                        <>
                            <span className={cx('result-title')}>
                                {category !== undefined ? resultKey : 'Category'}
                            </span>
                            <span className={cx('result-character')}> › </span>
                        </>
                    )}

                    <span className={cx('result-title')}>Search results</span>
                </div>
                <div className={cx('tools')}>
                    <div className={cx('tools-result')}>
                        <span className={cx('tools-name')}>
                            {query.length > 0
                                ? `${query} - search results`
                                : category !== undefined
                                ? resultKey
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
                    {pc && (
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
                    )}
                </div>
                <SearchArea1
                    loading={loading}
                    setPriceMin={setPriceMin}
                    setPriceMax={setPriceMax}
                    api={api}
                    query={query}
                    view={view}
                />
                {!pc && (
                    <div onClick={() => setShowFilter(true)} className={cx('filterSort')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20px"
                            height="20px"
                            fill="currentColor"
                            style={{ marginRight: 10 }}
                        >
                            <path
                                fill="none"
                                strokeMiterlimit="10"
                                d="M22 4l-8 8v8l-4 2V12L2 4V1h20v3z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                            ></path>
                        </svg>
                        Filter & sort
                    </div>
                )}
                {showFilter && !pc && (
                    <div className={cx('subFilter')}>
                        <div onClick={() => setShowFilter(false)} className={cx('close')}>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width="25px"
                                height="25px"
                                fill="currentColor"
                            >
                                <path
                                    d="M16 8l-8 8M16 16L8 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </div>
                        <span className={cx('sort-title')}>Sort by</span>
                        <div className={cx('sort-box')}>
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
                        </div>
                        <div className={cx('price')}>
                            <div className={cx('price-title')}>
                                <span style={{ fontWeight: 700 }}>Price</span> (USD)
                            </div>
                            <div className={cx('price-control')}>
                                <input
                                    onChange={(e) => handlePrice(e, true)}
                                    value={valueMin === 0 ? '' : valueMin}
                                    placeholder="From"
                                    inputMode="numeric"
                                    type="number"
                                    className={cx('price-input')}
                                />
                                <span style={{ paddingRight: 9, paddingLeft: 9, paddingTop: 14.2, color: '#000' }}>
                                    -
                                </span>
                                <input
                                    value={valueMax === 100000000 || valueMax === 0 ? '' : valueMax}
                                    onChange={(e) => handlePrice(e, false)}
                                    inputMode="numeric"
                                    type="number"
                                    placeholder="To"
                                    className={cx('price-input')}
                                />
                            </div>
                        </div>
                        <div onClick={() => setShowFilter(false)} className={cx('apply')}>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                fill="currentColor"
                            >
                                <path
                                    d="M6 12l4 4 8-8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                ></path>
                            </svg>
                            Apply ({api.length})
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchArea;
