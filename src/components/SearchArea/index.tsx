import classNames from 'classnames/bind';
import style from './SearchArea.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sorts } from '../../apiLocal/sorts';
import HeadLessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import SearchArea1 from '../SearchArea1';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);

function SearchArea() {
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

    const pc = useMediaQuery({ minWidth: 992 });

    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const mb = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        if (str !== -1) {
            let temp = url.slice(str + 6);
            temp = temp.replace(/%/g, ' ');
            temp = temp.replace(/20/g, '');
            setQuery(temp);
        }
    }, [params]);

    const [sortOption, setSortOption] = useState(false);
    const [valueSort, setValueSort] = useState('Best match');
    const [countSort, setCountSort] = useState(0);
    const [view, setView] = useState(0);

    const handleSortItem = (title: string, index: number) => {
        setValueSort(title);
        setCountSort(index);
    };

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
                            <span className={cx('result-title')}>{newKey}</span>
                            <span className={cx('result-character')}> › </span>
                        </>
                    )}

                    <span className={cx('result-title')}>Search results</span>
                </div>
                {pc && (
                    <div className={cx('tools')}>
                        <div className={cx('tools-result')}>
                            <span className={cx('tools-name')}>
                                {query.length > 0 ? `${query} - search results` : newKey}
                            </span>
                            <div className={cx('tools-quantity')}>
                                {query.length > 0 ? (
                                    <>
                                        74 results for: <span className={cx('toolsQuantity-name')}>"{query}"</span>
                                    </>
                                ) : (
                                    '123124 products'
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
                <SearchArea1 query={query} view={view} />
            </div>
        </div>
    );
}

export default SearchArea;
