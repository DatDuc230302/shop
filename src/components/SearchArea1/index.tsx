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
        title: 'other',
        category: 'Other',
    },
];

function SearchArea1({ loading, query, view, api, setPriceMin, setPriceMax }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [showFilterPrice, setFilterPricee] = useState(false);
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(100000000);

    // React Router
    const navigate = useNavigate();

    // Effect

    useEffect(() => {
        if (valueMax !== 100000000 && valueMax !== 0) {
            setFilterPricee(true);
        } else {
            setFilterPricee(false);
        }
    }, [valueMin, valueMax]);

    // Function

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

    const handleClose = () => {
        setFilterPricee(false);
        setPriceMin(0);
        setValueMin(0);
        setPriceMax(0);
        setValueMax(0);
    };

    const handleCategories = (title: string) => {
        const slug = title.toLowerCase();
        query.length > 0 ? navigate(`/category/${slug}?query=${query}`) : navigate(`/category/${slug}`);
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
                                    api.filter((it: any) => it.category === item.title).length > 0 && (
                                        <div
                                            onClick={() => handleCategories(item.title)}
                                            key={index}
                                            className={cx('categories-item')}
                                        >
                                            <span className={cx('categoriesItem-title')}>{item.category}</span>
                                            <span className={cx('categoriesItem-quantity')}>
                                                {api.filter((it: any) => it.category === item.title).length}
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
                    </div>
                )}
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    {showFilterPrice && (
                        <div className={cx('tag')}>
                            <div onClick={() => handleClose()} className={cx('tag-price')}>
                                Price: {valueMin} - {valueMax} USD
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
