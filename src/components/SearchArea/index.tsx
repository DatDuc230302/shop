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

    // React Router
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    // Query String
    const queryParams = queryString.parse(location.search);

    // State
    const [api, setApi] = useState([]);
    const [sortOption, setSortOption] = useState(false);
    const [valueSort, setValueSort] = useState('Best match');
    const [view, setView] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [resultKey, setResultKey] = useState('');
    const [lenProducts, setLenProducts] = useState([]);
    const [listPage, setListPage] = useState<number[]>([]);
    const [valueMin, setValueMin] = useState(!Number(queryParams.priceMin) ? 0 : Number(queryParams.priceMin));
    const [valueMax, setValueMax] = useState(!Number(queryParams.priceMax) ? 0 : Number(queryParams.priceMax));

    // Set PriceMin PriceMax
    let priceMin: number = !Number(queryParams.priceMin) ? 0 : Number(queryParams.priceMin);
    let priceMax: number = !Number(queryParams.priceMax) ? 0 : Number(queryParams.priceMax);
    let betweenPrice: string = `&priceMin=${priceMin}&priceMax=${priceMax}`;

    // Variable Pagination
    const [pageNum, setPageNum] = useState(
        !Number(queryParams.page) ? 1 : Number(queryParams.page) <= 0 ? 1 : Number(queryParams.page),
    );
    const pageSize = 3;
    const pagination = `&pageNum=${pageNum}&pageSize=${pageSize}`;

    // Set methodSort from Url
    const methodSort = !queryParams.sort ? 'best-match' : queryParams.sort;

    // Set QueryName from URL
    const name = queryParams.query !== undefined ? String(queryParams.query) : '';

    // Effect===========================================

    // Sort Between Price
    const updateSearchParams = (queryParams: { priceMin?: number; priceMax?: number }) => {
        const searchString = queryString.stringify(queryParams, { encode: false });
        const url =
            name.length > 0
                ? searchString.length > 0
                    ? `?${searchString}&query=${name}`
                    : `?query=${name}`
                : `?${searchString}`;
        navigate(url, { replace: true });
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const queryParams: { priceMin?: number; priceMax?: number } = {};
            if (valueMin !== 0) {
                queryParams.priceMin = valueMin;
            }
            if (valueMax !== 0) {
                queryParams.priceMax = valueMax;
            }
            updateSearchParams(queryParams);
        }, 1000);
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [valueMin, valueMax]);

    useEffect(() => {
        if (pageNum > 1) {
            setPageNum(1);
        }
    }, [category, categoryDefault, name]);

    // Sort Methods and Query Methods
    useEffect(() => {
        window.scrollTo(0, 0);
        if (methodSort === 'best-match') {
            if (category === undefined && name.length > 0) {
                // Query Name
                queryName();
            } else if (category !== undefined && name.length > 0) {
                // Query Name Cate
                queryNameCate();
            } else if (category !== undefined && name.length === 0) {
                // Query Cate
                queryCate();
            } else if (categoryDefault === 'category') {
                // sortBetweenPriceNameCate();
                // Query All
                queryAll();
            }
        } else if (methodSort === 'release-date') {
            sortDateNameCate();
        } else if (methodSort === 'lowest-price') {
            sortLowestNameCate();
        } else if (methodSort === 'highest-price') {
            sortHighestNameCate();
        }
    }, [methodSort, name, category, categoryDefault, pageNum, location.search]);

    // Set resultKey
    useEffect(() => {
        const resultKey = String(params.key).charAt(0).toUpperCase() + String(params.key).slice(1);
        setResultKey(resultKey);
    }, [params.key]);

    // SetView by tb & mb
    useEffect(() => {
        if (tb || mb) {
            setView(0);
        } else {
            setView(1);
        }
    }, [tb, mb]);

    // Set Limit ListPage
    useEffect(() => {
        const endNumber = Math.ceil(lenProducts.length / pageSize);
        const startNumber = 1;
        const paginationList = [];
        for (let i = startNumber; i <= endNumber; i++) {
            paginationList.push(i);
        }
        setListPage(paginationList);
    }, [lenProducts]);

    // Function ==============================================
    // Get All Api Products
    const queryAll = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryAll?${pagination}${betweenPrice}`);
        setApi(api.data.result);
        setLenProducts(api.data.totalProducts);
    }, setLoading); // Completed Panigation

    // Get Name Products
    const queryName = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryName?name=${name}${pagination}${betweenPrice}`);
        setApi(api.data.result);
        setLenProducts(api.data.totalProducts);
    }, setLoading);

    // Get Category Products
    const queryCate = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryCate?category=${category}${pagination}${betweenPrice}`);
        setApi(api.data.result);
        setLenProducts(api.data.totalProducts);
    }, setLoading);

    // Get Name And Category Products
    const queryNameCate = loadingApi(async () => {
        const api = await axios.get(
            `${ServerURL}/products/queryNameCate?name=${name}&category=${category}${pagination}${betweenPrice}`,
        );
        setApi(api.data.result);
        setLenProducts(api.data.totalProducts);
    }, setLoading);

    // Sort Date
    const sortDateNameCate = loadingApi(async () => {
        const api = await axios.get(
            `${ServerURL}/products/sortDateNameCate?name=${name}&category=${category}${pagination}${betweenPrice}`,
        );
        if (api.data.result !== undefined && api.data.totalProducts !== undefined) {
            setApi(api.data.result);
            setLenProducts(api.data.totalProducts);
        }
    }, setLoading);

    // Sort Price Lowest
    const sortLowestNameCate = loadingApi(async () => {
        const api = await axios.get(
            `${ServerURL}/products/sortLowestNameCate?name=${name}&category=${category}${pagination}${betweenPrice}`,
        );
        if (api.data.result !== undefined && api.data.totalProducts !== undefined) {
            setApi(api.data.result);
            setLenProducts(api.data.totalProducts);
        }
    }, setLoading);

    // Sort Price Highest
    const sortHighestNameCate = loadingApi(async () => {
        const api = await axios.get(
            `${ServerURL}/products/sortHighestNameCate?name=${name}&category=${category}${pagination}${betweenPrice}`,
        );
        if (api.data.result !== undefined && api.data.totalProducts !== undefined) {
            setApi(api.data.result);
            setLenProducts(api.data.totalProducts);
        }
    }, setLoading);

    const handleSortItem = (title: string, slug: string, index: number) => {
        if (category !== undefined) {
            if (name.length > 0) {
                navigate(`?query=${name}&sort=${slug}${priceMin > 0 || priceMax > 0 ? betweenPrice : ''}`, {
                    replace: true,
                });
            } else {
                navigate(`?sort=${slug}${priceMin > 0 || priceMax > 0 ? betweenPrice : ''}`, { replace: true });
            }
        } else {
            if (name.length > 0) {
                navigate(`?query=${name}&sort=${slug}${priceMin > 0 || priceMax > 0 ? betweenPrice : ''}`, {
                    replace: true,
                });
            } else {
                navigate(`?sort=${slug}${priceMin > 0 || priceMax > 0 ? betweenPrice : ''}`, { replace: true });
            }
        }
        setValueSort(title);
    };

    const handlePageNum = (item: number) => {
        const queryParams = queryString.parse(location.search);
        queryParams.page = String(item);
        const newURL = `${location.pathname}?${queryString.stringify(queryParams)}`;
        window.history.pushState({ path: newURL }, '', newURL);
        setPageNum(item);
    };

    const handleNavPagination = (bool: boolean) => {
        if (bool) {
            if (pageNum > 1) {
                const queryParams = queryString.parse(location.search);
                queryParams.page = String(pageNum - 1);
                const newURL = `${location.pathname}?${queryString.stringify(queryParams)}`;
                window.history.pushState({ path: newURL }, '', newURL);
                setPageNum(pageNum - 1);
            }
        } else {
            if (pageNum < listPage.length) {
                const queryParams = queryString.parse(location.search);
                queryParams.page = String(pageNum + 1);
                const newURL = `${location.pathname}?${queryString.stringify(queryParams)}`;
                window.history.pushState({ path: newURL }, '', newURL);
                setPageNum(pageNum + 1);
            }
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
                            {name.length > 0
                                ? `${name} - search results`
                                : category !== undefined
                                ? resultKey
                                : 'Category'}
                        </span>
                        <div className={cx('tools-quantity')}>
                            {name.length > 0 ? (
                                <>
                                    {lenProducts.length} results for:{' '}
                                    <span className={cx('toolsQuantity-name')}>"{name}"</span>
                                </>
                            ) : (
                                `${lenProducts.length} products`
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
                                            {sorts.map((item: any, index: number) => (
                                                <div
                                                    onClick={() => handleSortItem(item.title, item.slug, index)}
                                                    key={index}
                                                    className={cx(
                                                        'sortOption-item',
                                                        methodSort === item.slug && 'active',
                                                    )}
                                                >
                                                    {item.title}
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
                    api={api}
                    lenProducts={lenProducts}
                    query={name}
                    view={view}
                    valueMin={valueMin}
                    setValueMin={setValueMin}
                    valueMax={valueMax}
                    setValueMax={setValueMax}
                    priceMin={priceMin}
                    priceMax={priceMax}
                />
                {listPage.length > 0 && (
                    <div className={cx('pagination')}>
                        <div onClick={() => handleNavPagination(true)} className={cx('pagination-prev')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="25px"
                                height="25px"
                                fill="currentColor"
                            >
                                <path
                                    fill="none"
                                    strokeMiterlimit="10"
                                    d="M14 16l-4-4 4-4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                ></path>
                            </svg>{' '}
                            Prev
                        </div>

                        <>
                            <div className={cx('pagination-first')}>1</div>
                            <div className={cx('ellipsis')}>...</div>
                        </>

                        <div className={cx('pagination-list')}>
                            {listPage.map((item: number, index: number) => (
                                <div
                                    onClick={() => handlePageNum(item)}
                                    key={index}
                                    className={cx('pagination-item', pageNum === item && 'active')}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <>
                            <div className={cx('ellipsis')}>...</div>
                            <span
                                onClick={() => handlePageNum(listPage.length - 1)}
                                className={cx('last-page', pageNum === listPage.length && 'active')}
                            >
                                {listPage.length}
                            </span>
                        </>
                        <div onClick={() => handleNavPagination(false)} className={cx('pagination-next')}>
                            Next{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="25px"
                                height="25px"
                                fill="currentColor"
                            >
                                <path
                                    fill="none"
                                    strokeMiterlimit="10"
                                    d="M10 8l4 4-4 4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </div>
                )}
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
                                {sorts.map((item: any, index: number) => (
                                    <div
                                        onClick={() => handleSortItem(item.title, item.slug, index)}
                                        key={index}
                                        className={cx('sortOption-item', methodSort === item.slug && 'active')}
                                    >
                                        {item.title}
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
                                    placeholder="From"
                                    inputMode="numeric"
                                    type="number"
                                    className={cx('price-input')}
                                    onChange={(e) => setValueMin(Number(e.target.value))}
                                />
                                <span style={{ paddingRight: 9, paddingLeft: 9, paddingTop: 14.2, color: '#000' }}>
                                    -
                                </span>
                                <input
                                    inputMode="numeric"
                                    type="number"
                                    placeholder="To"
                                    className={cx('price-input')}
                                    onChange={(e) => setValueMax(Number(e.target.value))}
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
