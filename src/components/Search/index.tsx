import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { useMediaQuery } from 'react-responsive';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { categories } from '../../apiLocal/categories';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerURL } from '../../connect';
import Loading, { loadingApi } from '../Loading';

const cx = classNames.bind(style);
function Search() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // React-router
    const navigate = useNavigate();

    // State
    const [show, setShow] = useState(false);
    const [cateTitle, setCateTitle] = useState('All categories');
    const [turnCate, setTurnCate] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [valueSearch, setValueSearch] = useState('');
    const [cateSearch, setCateSearch] = useState('');
    const [check, setCheck] = useState(0);
    const [loading, setLoading] = useState(false);
    const [apiSelling, setApiSelling] = useState([]);
    const [apiProducts, setApiProducts] = useState([]);
    const [recentSearch, setRecentSearch] = useState(
        JSON.parse(`${localStorage.getItem('recentSearch')}`) !== null
            ? JSON.parse(`${localStorage.getItem('recentSearch')}`)
            : 0,
    );

    // Effect
    useEffect(() => {
        if (valueInput.length === 0) {
            show && getApiSelling();
            setApiProducts([]);
        } else {
            getApiProducts();
        }
    }, [valueSearch, show]);

    useEffect(() => {
        if (valueInput.length > 0) {
            setShow(true);
        }
        const debounceTimer = setTimeout(() => {
            // Xử lý logic sau thời gian debounce
            setValueSearch(valueInput);
        }, 500); // Thời gian debounce, 500ms trong ví dụ này}

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [valueInput]);

    // Function
    const handleSearch = () => {
        const value = valueInput.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
        const newData = JSON.parse(`${localStorage.getItem('recentSearch')}`);
        let data = [];
        if (newData !== null) {
            data = newData;
        }
        data.push(value);
        setRecentSearch(data);
        localStorage.setItem('recentSearch', JSON.stringify(data));
        valueInput.length > 0 &&
            (check !== 0 ? navigate(`/category/${cateSearch}?query=${value}`) : navigate(`/search?query=${value}`));
        setShow(false);
    };

    const handleItem = (id: number, title: string, slug?: string) => {
        setCheck(id);
        setCateTitle(title);
        slug && setCateSearch(slug);
    };

    const handleMove = () => {
        navigate(`/search?query=${valueInput}`);
        setShow(false);
    };

    const handleClear = () => {
        setValueInput('');
        setValueSearch('');
    };

    const getApiSelling = loadingApi(async () => {
        const data = await axios.get(`${ServerURL}/products/getSelling`);
        setApiSelling(data.data);
    }, setLoading);

    const getApiProducts = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/findName`, { key: valueSearch });
        setApiProducts(data.data);
    }, setLoading);

    // Event
    document.onkeydown = (e) => {
        if (e.which === 13 && valueInput.length > 0) {
            handleSearch();
        }
    };

    return (
        <div className={cx('wrapper', tb && 'tb', mb && 'mb')}>
            <div className={cx('inner')}>
                <div className={cx('search')}>
                    <div className={cx('search-control')}>
                        <input
                            onClick={() => setShow(true)}
                            onBlur={() => setTimeout(() => setShow(false), 300)}
                            value={valueInput}
                            onChange={(e) => !e.target.value.startsWith(' ') && setValueInput(e.target.value)}
                            placeholder="What are you looking for?"
                            type="text"
                            className={cx('search-input', tb && 'tb', mb && 'mb')}
                        />
                        {valueInput.length > 0 && (
                            <div onClick={handleClear} className={cx('clear')}>
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="29px"
                                    height="48px"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M16 8l-8 8M16 16L8 8"
                                        stroke="#757575"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                        )}
                    </div>
                    {pc && (
                        <>
                            <HeadlessTippy
                                appendTo={'parent'}
                                placement="bottom-start"
                                interactive
                                offset={[0, 2.4]}
                                visible={turnCate}
                                onClickOutside={() => setTurnCate(false)}
                                render={() => (
                                    <div className={cx('categories')}>
                                        <div
                                            onClick={() => handleItem(0, 'All categories')}
                                            className={cx('categories-item')}
                                        >
                                            <div className={cx('item-check')}>
                                                {check === 0 && (
                                                    <svg
                                                        widths={21}
                                                        height={21}
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
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
                                                )}
                                            </div>
                                            <span className={cx('item-title')}>All categories</span>
                                        </div>
                                        <div className={cx('categories-line')}>
                                            <div className={cx('line')}></div>
                                            <span className={cx('line-title')}>Categories</span>
                                        </div>
                                        {categories.map((item, index) => (
                                            <div
                                                onClick={() => handleItem(item.id, item.title, item.slug)}
                                                key={index}
                                                className={cx('categories-item')}
                                            >
                                                <div className={cx('item-check')}>
                                                    {check === item.id && (
                                                        <svg
                                                            widths={21}
                                                            height={21}
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
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
                                                    )}
                                                </div>
                                                <span className={cx('item-title')}>{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            >
                                <div
                                    onClick={() => (turnCate ? setTurnCate(false) : setTurnCate(true))}
                                    className={cx('search-category')}
                                >
                                    <span className={cx('searchCategory-title')}>{cateTitle}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="2rem"
                                        height="2rem"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill="none"
                                            strokeMiterlimit="10"
                                            d="M16 10l-4 4-4-4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </HeadlessTippy>
                            <div onClick={() => handleSearch()} className={cx('search-btn')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1.7rem"
                                    height="1.7rem"
                                    fill="currentColor"
                                >
                                    <g
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="white"
                                        fill="none"
                                        strokeMiterlimit="10"
                                    >
                                        <path d="M22 22l-6.344-6.344"></path>
                                        <circle cx="10" cy="10" r="8"></circle>
                                    </g>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
                {show && (
                    <div className={cx('sub-search')}>
                        <div className={cx('body')}>
                            <div className={cx('left')}>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {apiProducts.length === 0 && valueSearch.length > 0 && (
                                            <div className={cx('notFound')}>
                                                <span className={cx('notFound-quantity')}>
                                                    Results found: <b>0</b>
                                                </span>
                                                <span className={cx('notFound-title')}>
                                                    No results were found under this name
                                                </span>
                                            </div>
                                        )}
                                        <span className={cx('left-title')}>
                                            {apiProducts.length > 0 ? 'Found results' : 'Best selling'}
                                        </span>
                                        <div className={cx('left-products')}>
                                            {apiProducts.length > 0
                                                ? apiProducts.map(
                                                      (item: any, index: number) =>
                                                          index < 4 && (
                                                              <Link
                                                                  to={`/detail/${item._id}`}
                                                                  key={index}
                                                                  className={cx('leftProducts-item')}
                                                              >
                                                                  <img className={cx('img')} src={item.img} alt="" />
                                                                  <div className={cx('info')}>
                                                                      <span className={cx('name')}>{item.name}</span>
                                                                  </div>
                                                                  <div className={cx('price')}>
                                                                      <span className={cx('price-main')}>
                                                                          ${' '}
                                                                          <span style={{ fontWeight: 'bold' }}>
                                                                              {item.discount > 0
                                                                                  ? item.priceDiscount
                                                                                  : item.price}
                                                                          </span>
                                                                      </span>
                                                                      {item.discount > 0 && (
                                                                          <div className={cx('price-old')}>$ 64.87</div>
                                                                      )}
                                                                      {item.discount > 0 && (
                                                                          <div className={cx('price-discount')}>
                                                                              -74%
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                              </Link>
                                                          ),
                                                  )
                                                : apiSelling.map(
                                                      (item: any, index: number) =>
                                                          index < 4 && (
                                                              <Link
                                                                  to={`/detail/${item._id}`}
                                                                  key={index}
                                                                  className={cx('leftProducts-item')}
                                                              >
                                                                  <img className={cx('img')} src={item.img} alt="" />
                                                                  <div className={cx('info')}>
                                                                      <span className={cx('name')}>{item.name}</span>
                                                                  </div>
                                                                  <div className={cx('price')}>
                                                                      <span className={cx('price-main')}>
                                                                          ${' '}
                                                                          <span style={{ fontWeight: 'bold' }}>
                                                                              {item.discount > 0
                                                                                  ? item.priceDiscount
                                                                                  : item.price}
                                                                          </span>
                                                                      </span>
                                                                      {item.discount > 0 && (
                                                                          <div className={cx('price-old')}>$ 64.87</div>
                                                                      )}
                                                                      {item.discount > 0 && (
                                                                          <div className={cx('price-discount')}>
                                                                              -74%
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                              </Link>
                                                          ),
                                                  )}
                                        </div>
                                    </>
                                )}
                            </div>
                            {pc && (
                                <div className={cx('right')}>
                                    <div className={cx('right-box')}>
                                        <span className={cx('right-title')}>Popular searches</span>
                                        <span className={cx('right-item')}>call of duty</span>
                                        <span className={cx('right-item')}>call</span>
                                        <span className={cx('right-item')}>call of</span>
                                        <span className={cx('right-item')}>call of duty modern warfare</span>
                                        <span className={cx('right-item')}>call of duty black ops</span>
                                        <span className={cx('right-item')}>call of duty modern</span>
                                    </div>
                                    {recentSearch.length > 0 && (
                                        <div className={cx('right-box')}>
                                            <span style={{ marginBottom: 15.4 }} className={cx('right-title')}>
                                                Recent searches
                                            </span>
                                            {recentSearch.map(
                                                (item: string, index: number) =>
                                                    index < 5 && (
                                                        <span key={index} className={cx('right-item')}>
                                                            {item}
                                                        </span>
                                                    ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {apiProducts.length > 0 && valueInput.length > 0 && (
                            <div onClick={handleMove} className={cx('footer')}>
                                See all {apiProducts.length} results
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;