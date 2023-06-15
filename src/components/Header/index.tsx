import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { logo } from '../../assets/logo';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigate from '../Navigate';
import { gapi } from 'gapi-script';
import Auth from '../Auth';
import Search from '../Search';

const cx = classNames.bind(style);
const clientId = '796532655839-3484b4jq39k3kin9f8v1hfv8f0q1slvs.apps.googleusercontent.com';

function Header() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // Effect
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
                    {pc && <Search />}
                    <div className={cx('actions')}>
                        <Auth />
                    </div>
                </div>
                {pc ? <Navigate /> : <Search />}
            </div>
        </div>
    );
}

export default Header;
