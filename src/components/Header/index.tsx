import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { logo } from '../../assets/logo';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { categories } from '../../apiLocal/categories';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigate from '../Navigate';
import { gapi } from 'gapi-script';
import Auth from '../Auth';

const cx = classNames.bind(style);
const clientId = '796532655839-3484b4jq39k3kin9f8v1hfv8f0q1slvs.apps.googleusercontent.com';

function Header() {
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    const navigate = useNavigate();

    const [check, setCheck] = useState(0);
    const [cateTitle, setCateTitle] = useState('All categories');
    const [turnCate, setTurnCate] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [cateSearch, setCateSearch] = useState('');

    const handleItem = (id: number, title: string, slug?: string) => {
        setCheck(id);
        setCateTitle(title);
        slug && setCateSearch(slug);
    };

    const handleSearch = () => {
        // const value = valueInput.toLocaleLowerCase();
        const value = valueInput;
        valueInput.length > 0 &&
            (check !== 0 ? navigate(`/category/${cateSearch}?query=${value}`) : navigate(`/search?query=${value}`));
    };

    document.onkeydown = (e) => {
        if (e.which === 13) {
            handleSearch();
        }
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: 'email profile',
            });
        }
        gapi.load('client:auth2', start);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('control')}>
                    <div className={cx('menu-logo')}>
                        {!pc && (
                            <div className={cx('menu')}>
                                <svg
                                    width={24}
                                    height={24}
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="white" d="M21 8H3V6h18v2zm0 3H3v2h18v-2zm0 5H3v2h18v-2z"></path>
                                </svg>
                            </div>
                        )}
                        <Link to="/" className={cx('logo', pc && 'pc')}>
                            {logo}
                        </Link>
                    </div>
                    {pc && (
                        <div className={cx('search')}>
                            <input
                                value={valueInput}
                                onChange={(e) => !e.target.value.startsWith(' ') && setValueInput(e.target.value)}
                                placeholder="What are you looking for?"
                                type="text"
                                className={cx('search-input', tb && 'tb', mb && 'mb')}
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
                    )}
                    <div className={cx('actions')}>
                        <Auth />
                    </div>
                </div>
                {/* {pc ? (
                    <Navigate />
                ) : (
                    <input
                        value={valueInput}
                        onChange={(e) => !e.target.value.startsWith(' ') && setValueInput(e.target.value)}
                        placeholder="What are you looking for?"
                        type="text"
                        className={cx('search-input', tb && 'tb', mb && 'mb')}
                    />
                )} */}
            </div>
        </div>
    );
}

export default Header;
