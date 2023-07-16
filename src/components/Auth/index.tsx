import classNames from 'classnames/bind';
import style from './Auth.module.scss';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { ServerURL } from '../../connect';
import ChangeAvatar from '../ChangeAvatar';
import { LoginGoogle, LogoutGoogle } from './AuthGoogle';
import authClientAction from '../../redux/actions/authClientAction';

const cx = classNames.bind(style);
function Auth() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    //Redux
    const dispath = useDispatch();
    const renderCart = useSelector((state: any) => state.cartReducer);
    const currentUser = useSelector((state: any) => state.authClientReducer);

    // State Use
    const [name, setName] = useState<string>(currentUser.status ? currentUser.data.name : '');
    const [avatar, setAvatar] = useState<string>(currentUser.status ? currentUser.data.avatar : '');
    const [defaultAvatar, setDefaultAvatar] = useState<string>(
        currentUser.status ? currentUser.data.defaultAvatar : '',
    );
    const [rule, setRule] = useState<number>(currentUser.status ? currentUser.data.rule : 1);

    // State
    const [cartsLocal, setCartsLocal] = useState<number>(0);
    const [showAuth, setShowAuth] = useState<boolean>(false);
    const [showChangeAva, setShowChangeAva] = useState<boolean>(false);

    // LocalStorage
    const currentUserId = localStorage.getItem('currentUserId');

    // Effect
    useEffect(() => {
        if (currentUserId) {
            // Lấy thông tin User từ Server
            getUser(currentUserId);
            // Lấy thông tin Cart từ Server
            getCartsUser(currentUserId);
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

    const getUser = async (idUser: string) => {
        const result = await axios.get(`${ServerURL}/users/queryId?id=${idUser}`);
        const dataUser = result.data[0];
        setName(dataUser.name);
        setAvatar(dataUser.avatar);
        setRule(dataUser.rule);
        setDefaultAvatar(dataUser.defaultAvatar);

        // Gán dữ liệu lấy từ server vào redux lưu trữ info của user
        dispath(
            authClientAction('LOGINCLIENT', {
                id: dataUser.id,
                name: dataUser.name,
                avatar: dataUser.avatar,
                defaultAvatar: dataUser.defaultAvatar,
                rule: dataUser.rule,
            }),
        );
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
                                {currentUserId ? (
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
                            {currentUserId ? (
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
                    {pc && <div className={cx('auth')}>{currentUserId ? name : 'Sign in / Register'}</div>}
                </div>
                <Link to={'/page/cart'} className={cx('cart')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                        <path fill="white" d="M21 7l-2 10H5L2.4 4H0V2h5l1 5h15zM7 22h3v-3H7v3zm7 0h3v-3h-3v3z"></path>
                    </svg>
                    {cartsLocal > 0 && <span className={cx('quantity')}>{cartsLocal}</span>}
                </Link>
                {currentUserId && (
                    <ChangeAvatar
                        avatar={avatar}
                        setAvatar={setAvatar}
                        defaultAvatar={defaultAvatar}
                        showChangeAva={showChangeAva}
                        setShowChangeAva={setShowChangeAva}
                    />
                )}
            </div>
        </div>
    );
}

export default Auth;
