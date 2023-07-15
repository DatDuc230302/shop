import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { logo } from '../../assets/logo';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import Navigate from '../Navigate';
import Search from '../Search';
import { categories } from '../../apiLocal/categories';
import Auth from '../Auth';

const cx = classNames.bind(style);

function Header() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [showMenu, setShowMenu] = useState<boolean>(false);

    // React Router
    const navigate = useNavigate();

    // Function

    const handleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleListItem = (slug: string) => {
        if (slug !== 'category') {
            navigate(`/category/${slug}`);
        } else {
            navigate(`/category`);
        }
        setShowMenu(false);
    };

    return (
        <div className={cx('wrapper', tb && 'tb', mb && 'mb')}>
            <div className={cx('inner')}>
                <div className={cx('control')}>
                    <div className={cx('menu-logo')}>
                        {!pc && (
                            <div onClick={() => handleMenu()} className={cx('menu')}>
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
                    {pc && <Search />}
                    <div className={cx('actions')}>
                        <Auth />
                    </div>
                </div>
                {pc ? <Navigate /> : <Search />}
            </div>
            <div className={cx('menu-area', showMenu && 'show')}>
                <div className={cx('menu-body')}>
                    <div onClick={() => handleMenu()} className={cx('menu-header')}>
                        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M18.364 16.95L13.414 12l4.95-4.95-1.414-1.414-4.95 4.95-4.95-4.95L5.636 7.05l4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95"></path>
                        </svg>
                        <span className={cx('menuHeader-title')}>Categories</span>
                    </div>
                    <div className={cx('menu-list')}>
                        {categories.map((item: any, index: number) => (
                            <div onClick={() => handleListItem(item.slug)} key={index} className={cx('menuList-item')}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <div className={cx('menu-nav')}>
                        <Link to={'/plus'} className={cx('menuNav-item', 'active')}>
                            Save more with G2A Plus
                        </Link>
                        <Link to={'/software-deals'} className={cx('menuNav-item')}>
                            Software
                        </Link>
                        <Link to={'/best-deals/random-keys'} className={cx('menuNav-item')}>
                            Random Keys
                        </Link>
                        <Link to={'/best-deals/best-games-choice'} className={cx('menuNav-item')}>
                            Bestsellers
                        </Link>
                        <Link to={'/best-deals/steam-gift-cards'} className={cx('menuNav-item')}>
                            Steam Gift Cards
                        </Link>
                    </div>
                </div>
                <div onClick={() => handleMenu()} className={cx('menu-overlay')}></div>
            </div>
        </div>
    );
}

export default Header;
