import classNames from 'classnames/bind';
import style from './SearchArea1.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import { emptySearch } from '../../assets/imgs/empty_search';
import Loading from '../Loading';
const cx = classNames.bind(style);

const list = [
    {
        title: 'gaming',
        category: 'Gaming',
    },
    {
        title: 'software',
        category: 'Software',
    },
    {
        title: 'gift cards',
        category: 'Gift cards',
    },
    {
        title: 'subscriptions',
        category: 'Subscriptions',
    },
    {
        title: 'e - learning',
        category: 'E - learning',
    },
    {
        title: 'charity',
        category: 'Charity',
    },
    {
        title: 'keys',
        category: 'Keys',
    },
    {
        title: 'other',
        category: 'Other',
    },
];

function SearchArea1({
    loading,
    query,
    view,
    api,
    lenProducts,
    setSortPriceMin,
    sortPriceMin,
    setSortPriceMax,
    sortPriceMax,
}: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [showFilterPrice, setFilterPrice] = useState(false);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);

    // React Router
    const navigate = useNavigate();

    // Effect

    useEffect(() => {
        if (sortPriceMin > 0 && sortPriceMax > 0 && sortPriceMax < 100000000) {
            setFilterPrice(true);
        } else {
            setFilterPrice(false);
        }
    }, [sortPriceMin, sortPriceMax]);

    useEffect(() => {
        let debounceTimerMin: NodeJS.Timeout | null = null;
        let debounceTimerMax: NodeJS.Timeout | null = null;

        if (priceMin > 0) {
            if (debounceTimerMin) {
                clearTimeout(debounceTimerMin);
            }

            debounceTimerMin = setTimeout(() => {
                setSortPriceMin(priceMin);
            }, 500);
        } else {
            setSortPriceMin(0);
        }

        if (priceMax > 0) {
            if (debounceTimerMax) {
                clearTimeout(debounceTimerMax);
            }

            debounceTimerMax = setTimeout(() => {
                setSortPriceMax(priceMax);
            }, 500);
        } else {
            setSortPriceMax(100000000);
        }

        return () => {
            if (debounceTimerMin) {
                clearTimeout(debounceTimerMin);
            }

            if (debounceTimerMax) {
                clearTimeout(debounceTimerMax);
            }
        };
    }, [priceMin, priceMax]);

    // Function
    const handleInput = (e: any, bool: boolean) => {
        if (bool) {
            setPriceMin(Number(e.target.value));
        } else {
            setPriceMax(Number(e.target.value));
        }
    };

    const handleCategories = (title: string) => {
        const slug = title.toLowerCase();
        query.length > 0 ? navigate(`/category/${slug}?query=${query}`) : navigate(`/category/${slug}`);
    };

    const handleCloseTag = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('priceMin');
        url.searchParams.delete('priceMax');
        window.location.href = url.toString();
        setSortPriceMin(0);
        setSortPriceMax(100000000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {pc && (
                    <div className={cx('filter')}>
                        <div className={cx('categories')}>
                            <span className={cx('categories-title')}>Categories</span>
                            {list.map(
                                (item: any, index: number) =>
                                    lenProducts.filter((it: any) => it.category === item.title).length > 0 && (
                                        <div
                                            onClick={() => handleCategories(item.title)}
                                            key={index}
                                            className={cx('categories-item')}
                                        >
                                            <span className={cx('categoriesItem-title')}>{item.category}</span>
                                            <span className={cx('categoriesItem-quantity')}>
                                                {lenProducts.filter((it: any) => it.category === item.title).length}
                                            </span>
                                        </div>
                                    ),
                            )}
                        </div>
                        <div className={cx('price')}>
                            <div className={cx('price-title')}>
                                <span style={{ fontWeight: 700 }}>Price</span> (USD)
                            </div>
                            <div className={cx('price-control')}>
                                <input
                                    value={priceMin === 0 ? '' : priceMin}
                                    onChange={(e) => handleInput(e, true)}
                                    placeholder="From"
                                    inputMode="numeric"
                                    type="number"
                                    className={cx('price-input')}
                                />
                                <span style={{ paddingRight: 9, paddingLeft: 9, paddingTop: 14.2, color: '#000' }}>
                                    -
                                </span>
                                <input
                                    value={priceMax === 100000000 || priceMax === 0 ? '' : priceMax}
                                    onChange={(e) => handleInput(e, false)}
                                    inputMode="numeric"
                                    type="number"
                                    placeholder="To"
                                    className={cx('price-input')}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    {showFilterPrice && (
                        <div onClick={() => handleCloseTag()} className={cx('tag')}>
                            <div className={cx('tag-price')}>
                                Price: {sortPriceMin} - {sortPriceMax} USD
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">
                                    <path
                                        className={cx('filterPrice-icon')}
                                        d="M16 8l-8 8M16 16L8 8"
                                        stroke="#B8B8B8"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    )}
                    {!loading ? (
                        api.length > 0 ? (
                            view === 0 ? (
                                <Layout2 api={api} />
                            ) : (
                                <Layout1 api={api} />
                            )
                        ) : (
                            <div className={cx('empty')}>
                                {emptySearch}
                                <span className={cx('title')}>No matching products found</span>
                                <span className={cx('change')}>
                                    Change or{' '}
                                    <Link to={'/'} className={cx('back')}>
                                        Reset filters »
                                    </Link>
                                </span>
                            </div>
                        )
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchArea1;
