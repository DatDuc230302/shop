import classNames from 'classnames/bind';
import style from './Auth.module.scss';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import authAction from '../../redux/actions/authAction';
import { ServerURL } from '../../connect';
import cartAction from '../../redux/actions/cartAction';
import ChangeAvatar from '../ChangeAvatar';

const cx = classNames.bind(style);
const clientId = '796532655839-3484b4jq39k3kin9f8v1hfv8f0q1slvs.apps.googleusercontent.com';

function Auth() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [idUser, setIdUser] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [mail, setMail] = useState('');
    const [rule, setRule] = useState(1);
    const [cartsLocal, setCartsLocal] = useState([]);
    const [show, setShow] = useState(false);
    const [showChangeAva, setShowChangeAva] = useState(false);
    const [oldAvatar, setOldvatar] = useState('');

    //Redux
    const dispath = useDispatch();
    const currentUser = useSelector((state: any) => state.authReducer);
    const renderCart = useSelector((state: any) => state.cartReducer);

    // Effect
    useEffect(() => {
        if (currentUser) {
            getUser(idUser);
        } else {
            const temp = localStorage.getItem('cartsLocal');
            const carts = JSON.parse(`${temp}`);
            if (carts !== null) {
                setCartsLocal(carts);
            } else {
                setCartsLocal([]);
            }
        }
    }, [currentUser, renderCart]);

    // Function
    const getUser = async (idUser: any) => {
        const data = await axios.post(`${ServerURL}/users/findId`, { id: idUser });
        const cartsUser = data.data[0].carts;
        setCartsLocal(cartsUser);
    };

    // Login
    const loginSuccess = async (res: any) => {
        const api = res.profileObj;
        setIdUser(api.googleId);
        const resData = await axios.post(`${ServerURL}/users/findId`, { id: api.googleId });
        const data = resData.data[0];
        setOldvatar(api.imageUrl);
        if (data !== undefined) {
            setName(data.name);
            setAvatar(data.avatar);
            setMail(data.email);
            setRule(data.rule);
            localStorage.setItem('currentUser', data.id);
        } else {
            setName(api.name);
            setAvatar(api.imageUrl);
            setMail(api.email);
            localStorage.setItem('currentUser', api.googleId);
            await axios.post(`${ServerURL}/users/add`, {
                id: api.googleId,
                name: api.name,
                avatar: api.imageUrl,
                rule: 1,
                email: api.email,
                carts: [],
            });
        }
        dispath(authAction('LOGIN'));
        setShow(false);
    };

    const loginFailure = (res: any) => {
        console.log('LOGIN FAILED! res: ', res);
    };

    // Logout
    const logoutSuccess = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('carts');
        dispath(authAction('LOGOUT'));
        dispath(cartAction());
        setShow(false);
    };
    const logoutUI = ({ onClick }: any) => {
        return (
            <div onClick={onClick} className={cx('logoutUI')}>
                <span className={cx('title')}>Sign out</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18px"
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
                        <path d="M17 12H2M7 17l-5-5 5-5M10 1h12v22H10"></path>
                    </g>
                </svg>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('login')}>
                    <HeadlessTippy
                        onClickOutside={() => setShow(false)}
                        visible={show}
                        appendTo={'parent'}
                        interactive
                        placement="bottom"
                        offset={[3, 15]}
                        render={() => (
                            <>
                                {currentUser ? (
                                    <div className={cx('member')}>
                                        <div className={cx('info')}>
                                            <div
                                                onClick={() => {
                                                    setShowChangeAva(!showChangeAva);
                                                    setShow(false);
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
                                                <span className={cx('gmail')}>{mail}</span>
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
                                            <GoogleLogout
                                                className={cx('google')}
                                                clientId={clientId}
                                                buttonText="Logout"
                                                onLogoutSuccess={logoutSuccess}
                                                render={logoutUI}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('guest')}>
                                        <span className={cx('title')}>Welcome!</span>
                                        <GoogleLogin
                                            className={cx('google')}
                                            clientId={clientId}
                                            onSuccess={loginSuccess}
                                            onFailure={loginFailure}
                                            cookiePolicy="single_host_origin"
                                            isSignedIn={true}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    >
                        <div onClick={() => setShow(!show)} className={cx('user')}>
                            {!currentUser ? (
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
                            ) : (
                                <img className={cx('avatar')} src={avatar} alt="" />
                            )}
                        </div>
                    </HeadlessTippy>
                    {pc && <div className={cx('auth')}>{currentUser ? name : 'Sign in / Register'}</div>}
                </div>
                <Link to={'/page/cart'} className={cx('cart')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                        <path fill="white" d="M21 7l-2 10H5L2.4 4H0V2h5l1 5h15zM7 22h3v-3H7v3zm7 0h3v-3h-3v3z"></path>
                    </svg>
                    {cartsLocal.length > 0 && <span className={cx('quantity')}>{cartsLocal.length}</span>}
                </Link>
                {currentUser && (
                    <ChangeAvatar
                        oldAvatar={oldAvatar}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        showChangeAva={showChangeAva}
                        setShowChangeAva={setShowChangeAva}
                    />
                )}
            </div>
        </div>
    );
}

export default Auth;
