import classNames from 'classnames/bind';
import style from './SearchArea.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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

    // Variable
    const pageSize = 9;

    // State
    const [name, setName] = useState('');
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
    const [lenProducts, setLenProducts] = useState(0);
    const [listPage, setListPage] = useState<number[]>([]);

    // Location
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    // Query String
    const queryParams = queryString.parse(location.search);

    // Effect
    // Set Name from the URL
    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        const resultKey = String(params.key).charAt(0).toUpperCase() + String(params.key).slice(1);
        setResultKey(resultKey);
        // Find query in URL after query=
        if (queryParams.query !== undefined) {
            setName(String(queryParams.query));
        } else {
            setName('');
        }
    }, [location, params.key]);

    // SetView by tb & mb
    useEffect(() => {
        if (tb || mb) {
            setView(0);
        } else {
            setView(1);
        }
    }, [tb, mb]);

    // Logic call Api
    useEffect(() => {
        if (category !== undefined) {
            if (name.length > 0) {
                queryNameCate();
            } else {
                queryCate();
            }
        } else {
            if (name.length > 0) {
                queryName();
            }
        }
    }, [category, name.length]);

    // PriceMax
    useEffect(() => {
        if (priceMaxUrl > 0) {
            setPriceMax(priceMaxUrl);
        } else {
            setPriceMax(100000000);
        }
    }, [priceMaxUrl]);

    // QueryAll when Category === category
    useEffect(() => {
        if (categoryDefault === 'category') {
            if (priceMax > 0 && priceMax !== 100000000) {
                sortBetweenPriceName();
            } else {
                if (!Number(queryParams.page)) {
                    queryAll(1, pageSize);
                } else {
                    queryAll(Number(queryParams.page), pageSize);
                }
            }
        }
    }, [categoryDefault, location]);

    useEffect(() => {
        setValueSort('Best match');
        setCountSort(-1);
    }, [name, category]);

    // Sort Price Between
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            // Xử lý logic sau thời gian debounce
            if (priceMax !== 100000000 && priceMax !== 0) {
                if (category !== undefined && name.length > 0) {
                    sortBetweenPriceNameCate();
                    return;
                }
                if (category === undefined) {
                    sortBetweenPriceName();
                } else {
                    sortBetweenPriceCate();
                }
            } else if (priceMin === 0 && priceMax === 0) {
                if (category !== undefined && name.length > 0) {
                    queryNameCate();
                    return;
                }
                if (category === undefined) {
                    queryName();
                } else {
                    queryCate();
                }
            }
        }, 1000); // Thời gian debounce, 500ms trong ví dụ này}

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [priceMin, priceMax]);

    // Sort Methods
    useEffect(() => {
        switch (countSort) {
            case 0:
                if (category !== undefined && name.length > 0) {
                    queryNameCate();
                    return;
                }
                if (category === undefined) {
                    queryName();
                } else {
                    queryCate();
                }
                break;
            case 1:
                if (category !== undefined && name.length > 0) {
                    sortDateNameCate();
                    return;
                }
                if (category === undefined) {
                    sortDateName();
                } else {
                    sortDateCate();
                }
                break;
            case 2:
                if (category !== undefined && name.length > 0) {
                    sortLowestNameCate();
                    return;
                }
                if (category === undefined) {
                    sortLowestName();
                } else {
                    sortLowestCate();
                }
                break;
            case 3:
                if (category !== undefined && name.length > 0) {
                    sortHighestNameCate();
                    return;
                }
                if (category === undefined) {
                    sortHighest();
                } else {
                    sortHighestCate();
                }
                break;
            default:
                break;
        }
    }, [countSort]);

    // Set Limit ListPage
    useEffect(() => {
        const number = Math.ceil(lenProducts / pageSize);
        if (number > 0) {
            const newListPage = Array.from({ length: number }, (_, i) => i);
            setListPage(newListPage);
        }
    }, [lenProducts]);

    // Function
    // Get All Api Products
    const queryAll = loadingApi(async (pageNum: number, pageSize: number) => {
        const data = await axios.get(`${ServerURL}/products/get?pageNum=${pageNum}&pageSize=${pageSize}`);
        setApi(data.data.data);
        setLenProducts(data.data.totalProducts);
    }, setLoading);

    // Get Name Products
    const queryName = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/queryName?query=${name}`);
        setApi(data.data);
    }, setLoading); // Done

    // Get Category Products
    const queryCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/queryCate?category=${category}`);
        setApi(data.data);
    }, setLoading);

    // Get Name And Category Products
    const queryNameCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/queryNameCate?name=${name}&category=${category}`);
        setApi(data.data);
    }, setLoading);

    // Sort Date
    const sortDateName = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortDateName?name=${name}`);
        setApi(data.data);
    }, setLoading);
    const sortDateCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortDateCate?category=${category}`);
        setApi(data.data);
    }, setLoading);
    const sortDateNameCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortDateNameCate?name=${name}&category=${category}`);
        setApi(data.data);
    }, setLoading);

    // Sort Price Lowest
    const sortLowestName = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortLowestName?name=${name}`);
        setApi(data.data);
    }, setLoading);
    const sortLowestCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortLowestCate?category=${category}`);
        setApi(data.data);
    }, setLoading);
    const sortLowestNameCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortLowestNameCate?name=${name}&category=${category}`);
        setApi(data.data);
    }, setLoading);

    // Sort Price Highest
    const sortHighest = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortHighestName?name=${name}`);
        setApi(data.data);
    }, setLoading);
    const sortHighestCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortHighestCate?category=${category}`);
        setApi(data.data);
    }, setLoading);
    const sortHighestNameCate = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/sortHighestNameCate?name=${name}&category=${category}`);
        setApi(data.data);
    }, setLoading);

    // Sort Between Price
    const sortBetweenPriceName = loadingApi(async () => {
        const data = await axios.get(
            `${ServerURL}/products/sortBetweenPriceName?name=${name}&priceMin=${priceMin}&priceMax=${priceMax}`,
        );
        setApi(data.data);
    }, setLoading);
    const sortBetweenPriceCate = loadingApi(async () => {
        const data = await axios.get(
            `${ServerURL}/products/sortBetweenPriceCate?category=${category}&priceMin=${priceMin}&priceMax=${priceMax}`,
        );
        setApi(data.data);
    }, setLoading);
    const sortBetweenPriceNameCate = loadingApi(async () => {
        const data = await axios.get(
            `${ServerURL}/products/sortBetweenPriceNameCate?name=${name}&category=${category}&priceMin=${priceMin}&priceMax=${priceMax}`,
        );
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

    const handlePageNum = (item: number) => {
        navigate(`?page=${item}`);
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
                            {name.length > 0
                                ? `${name} - search results`
                                : category !== undefined
                                ? resultKey
                                : 'Category'}
                        </span>
                        <div className={cx('tools-quantity')}>
                            {name.length > 0 ? (
                                <>
                                    {api.length} results for: <span className={cx('toolsQuantity-name')}>"{name}"</span>
                                </>
                            ) : (
                                `${lenProducts} products`
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
                    query={name}
                    view={view}
                />
                <div className={cx('pagination')}>
                    <div className={cx('pagination-list')}>
                        {listPage.map(
                            (item: any, index: any) =>
                                index > 0 && (
                                    <div
                                        onClick={() => handlePageNum(item)}
                                        key={index}
                                        className={cx(
                                            'pagination-item',
                                            (!Number(queryParams.page) ? 1 : Number(queryParams.page)) === index &&
                                                'active',
                                        )}
                                    >
                                        {item}
                                    </div>
                                ),
                        )}
                    </div>
                </div>
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
