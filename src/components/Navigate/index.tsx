import classNames from 'classnames/bind';
import style from './Navigate.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { categories } from '../../apiLocal/categories';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Navigate() {
    // State
    const [showList, setShowList] = useState(window.location.pathname === '/' ? true : false);
    const [showOverlay, setShowOverlay] = useState(false);

    // React Router
    const navigate = useNavigate();

    // Effect
    useEffect(() => {
        if (window.location.pathname === '/') {
            setShowList(true);
            const handleScroll = () => {
                const scrollY = window.scrollY;
                if (scrollY > 0) {
                    setShowList(false);
                    setShowOverlay(false);
                } else {
                    setShowList(true);
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setShowList(false);
        }
    }, [window.location.pathname]);

    // Function
    const handleItem = (slug: string) => {
        if (slug !== 'category') {
            navigate(`/category/${slug}`);
        } else {
            navigate(`/category`);
        }
        setShowOverlay(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <HeadlessTippy
                    appendTo={'parent'}
                    visible={showList}
                    onClickOutside={() => (window.location.pathname === '/' ? setShowList(true) : setShowList(false))}
                    interactive
                    placement="bottom-start"
                    offset={[0, 0]}
                    render={() => (
                        <div className={cx('list')}>
                            {categories.map((item, index) => (
                                <div
                                    onMouseEnter={() => setShowOverlay(true)}
                                    onMouseLeave={() => setShowOverlay(false)}
                                    onClick={() => handleItem(item.slug)}
                                    key={index}
                                    className={cx('list-item')}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    )}
                >
                    <div onClick={() => setShowList(!showList)} className={cx('categories', showList && 'active')}>
                        <svg
                            width={24}
                            height={24}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgba(255,255,255,0.7)"
                        >
                            <path d="M17 8H3V6h14v2zm4-2h-2v2h2V6zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2z"></path>
                        </svg>
                        <span className={cx('categories-title')}>CATEGORIES</span>
                    </div>
                </HeadlessTippy>
                <Link to={'/best-deals/steam-gift-cards'} className={cx('item')}>
                    Steam Gift Cards
                </Link>
                <Link to={'/best-deals/best-games-choice'} className={cx('item')}>
                    Bestsellers
                </Link>
                <Link to="/best-deals/random-keys" className={cx('item')}>
                    Random Keys
                </Link>
                <Link to={'/software-deals'} className={cx('item')}>
                    Software
                </Link>
                <Link to={'/plus'} className={cx('plus')}>
                    Save more with G2A Plus
                </Link>
            </div>
            <div className={cx('overlay', showOverlay && 'show')}></div>
        </div>
    );
}

export default Navigate;
