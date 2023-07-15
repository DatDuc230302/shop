import classNames from 'classnames/bind';
import style from './Auth.module.scss';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { ServerURL } from '../../connect';
import ChangeAvatar from '../ChangeAvatar';
import { LoginGoogle, LogoutGoogle } from './AuthGoogle';

const cx = classNames.bind(style);
function Auth() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    //Redux
    const renderCart = useSelector((state: any) => state.cartReducer);
    const currentUser = useSelector((state: any) => state.authClientReducer);

    // Const Variable
    const name = currentUser.status ? currentUser.data.name : '';
    const avatar = currentUser.status ? currentUser.data.avatar : '';
    const rule = currentUser.status ? currentUser.data.rule : 1;

    // State
    const [cartsLocal, setCartsLocal] = useState<number>(0);
    const [showAuth, setShowAuth] = useState<boolean>(false);
    const [showChangeAva, setShowChangeAva] = useState<boolean>(false);

    // Effect
    useEffect(() => {
        if (currentUser.status) {
            const idUser = currentUser.status ? currentUser.data.id : '';
            getCartsUser(idUser);
        } else {
            const temp = localStorage.getItem('cartsLocal');
            const carts = JSON.parse(`${temp}`);
            if (carts !== null) {
                setCartsLocal(carts.length);
            } else {
                setCartsLocal(0);
            }
        }
        setShowAuth(false);
    }, [renderCart]);

    // Function
    const getCartsUser = async (idUser: string) => {
        const api = await axios.get(`${ServerURL}/carts/getCarts?idUser=${idUser}`);
        if (api) {
            setCartsLocal(api.data.result.products.length);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('login')}>
                    <HeadlessTippy
                        onClickOutside={() => setShowAuth(false)}
                        visible={showAuth}
                        appendTo={'parent'}
                        interactive
                        placement="bottom"
                        offset={[3, 15]}
                        render={() => (
                            <>
                                {currentUser.status ? (
                                    <div className={cx('member')}>
                                        <div className={cx('info')}>
                                            <div
                                                onClick={() => {
                                                    setShowChangeAva(!showChangeAva);
                                                    setShowAuth(false);
                                                }}
                                                className={cx('avatar')}
                                            >
                                                <img className={cx('avatar-img')} src={avatar} alt="" />
                                                <div className={cx('avatar-change')}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="12px"
                                                        height="12px"
                                                        fill="white"
                                                    >
                                                        <g
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            stroke="white"
                                                            fill="none"
                                                            strokeMiterlimit="10"
                                                        >
                                                            <path d="M14.328 4.672l5 5M8 21l-6 1 1-6L16.414 2.586a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className={cx('detail')}>
                                                <span className={cx('gmail')}>{name}</span>
                                                <span className={cx('rule')}>
                                                    <div className={cx('rule-box')}></div>
                                                    {rule === 0 && 'Admin'}
                                                    {rule === 1 && 'Member'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('footer')}>
                                            <div className={cx('setting')}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="17.6px"
                                                    height="17.6px"
                                                    fill="currentColor"
                                                >
                                                    <g
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="#757575"
                                                        fill="none"
                                                        strokeMiterlimit="10"
                                                    >
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                        <path d="M20 12a8.049 8.049 0 00-.188-1.713l2.714-2.055-2-3.464-3.143 1.326a7.987 7.987 0 00-2.961-1.719L14 1h-4l-.422 3.375a7.987 7.987 0 00-2.961 1.719L3.474 4.768l-2 3.464 2.714 2.055a7.9 7.9 0 000 3.426l-2.714 2.055 2 3.464 3.143-1.326a7.987 7.987 0 002.961 1.719L10 23h4l.422-3.375a7.987 7.987 0 002.961-1.719l3.143 1.326 2-3.464-2.714-2.055A8.049 8.049 0 0020 12z"></path>
                                                    </g>
                                                </svg>
                                                Account settings
                                            </div>
                                            <LogoutGoogle />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('guest')}>
                                        <span className={cx('title')}>Welcome!</span>
                                        <LoginGoogle />
                                        <Link to={'/welcome/login'} className={cx('login-btn')}>
                                            Sign in
                                        </Link>
                                        <div className={cx('register')}>
                                            <span>Don't have an account?</span>
                                            <Link to={'/welcome/register'}>Register</Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    >
                        <div onClick={() => setShowAuth(!showAuth)} className={cx('user')}>
                            {currentUser.status ? (
                                <img className={cx('avatar')} src={avatar} alt="" />
                            ) : (
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
                            )}
                        </div>
                    </HeadlessTippy>
                    {pc && <div className={cx('auth')}>{currentUser.status ? name : 'Sign in / Register'}</div>}
                </div>
                <Link to={'/page/cart'} className={cx('cart')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                        <path fill="white" d="M21 7l-2 10H5L2.4 4H0V2h5l1 5h15zM7 22h3v-3H7v3zm7 0h3v-3h-3v3z"></path>
                    </svg>
                    {cartsLocal > 0 && <span className={cx('quantity')}>{cartsLocal}</span>}
                </Link>
                {currentUser.status && (
                    <ChangeAvatar avatar={avatar} showChangeAva={showChangeAva} setShowChangeAva={setShowChangeAva} />
                )}
            </div>
        </div>
    );
}

export default Auth;
