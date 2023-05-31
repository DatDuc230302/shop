import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { logo } from '../../assets/logo';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { categories } from '../../apiLocal/categories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigate from '../Navigate';

const cx = classNames.bind(style);
function Header() {
    const pc = useMediaQuery({ minWidth: 992 });

    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const mb = useMediaQuery({ maxWidth: 767 });

    const [check, setCheck] = useState(0);
    const [cateTitle, setCateTitle] = useState('All categories');
    const [turnCate, setTurnCate] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [cateSearch, setCateSearch] = useState('');

    const navigate = useNavigate();

    const handleItem = (id: number, title: string, slug?: string) => {
        setCheck(id);
        setCateTitle(title);
        slug && setCateSearch(slug);
    };

    const handleSearch = () => {
        const value = valueInput.toLocaleLowerCase();
        valueInput.length > 0 &&
            (check !== 0 ? navigate(`/category/${cateSearch}?query=${value}`) : navigate(`/search?query=${value}`));
    };

    document.onkeydown = (e) => {
        const value = valueInput.toLocaleLowerCase();
        if (e.which === 13) {
            valueInput.length > 0 &&
                (check !== 0 ? navigate(`/category/${cateSearch}?query=${value}`) : navigate(`/search?query=${value}`));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('control')}>
                    <Link to="/" className={cx('logo')}>
                        {logo}
                    </Link>
                    <div className={cx('search')}>
                        <input
                            value={valueInput}
                            onChange={(e) => !e.target.value.startsWith(' ') && setValueInput(e.target.value)}
                            placeholder="What are you looking for?"
                            type="text"
                            className={cx('search-input')}
                        />
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
                    </div>
                    <div className={cx('actions')}>
                        <div className={cx('user')}>
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                            >
                                <path
                                    fill="white"
                                    d="M17 8c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5zm4 10l-6-3H9l-6 3v3h18v-3z"
                                ></path>
                            </svg>
                        </div>
                        {pc && <div className={cx('auth')}>Sign in / Register</div>}
                        <div className={cx('cart')}>
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                            >
                                <path
                                    fill="white"
                                    d="M21 7l-2 10H5L2.4 4H0V2h5l1 5h15zM7 22h3v-3H7v3zm7 0h3v-3h-3v3z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <Navigate />
            </div>
        </div>
    );
}

export default Header;
