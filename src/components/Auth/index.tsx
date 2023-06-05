import classNames from 'classnames/bind';
import style from './Auth.module.scss';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useMediaQuery } from 'react-responsive';
import 'tippy.js/dist/tippy.css';
const clientId = '796532655839-3484b4jq39k3kin9f8v1hfv8f0q1slvs.apps.googleusercontent.com';

const cx = classNames.bind(style);

function Auth() {
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [mail, setMail] = useState('');
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        if (name.length > 0 && avatar.length > 0) {
            setCurrentUser(true);
        } else {
            setCurrentUser(false);
        }
    }, [name, avatar]);

    // Login
    const loginSuccess = (res: any) => {
        const api = res.profileObj;
        localStorage.setItem('name', `${api.name}`);
        localStorage.setItem('avatar', `${api.imageUrl}`);
        setName(api.name);
        setAvatar(api.imageUrl);
        setMail(api.email);
        setShow(false);
    };
    const loginFailure = (res: any) => {
        console.log('LOGIN FAILED! res: ', res);
    };

    // Logout

    const logoutSuccess = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('avatar');
        setName('');
        setAvatar('');
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
                                            <img
                                                className={cx('avatar')}
                                                src={'https://static.g2a.com/xAsiiuY6oKCFifTi59qELP/avatar_5.svg'}
                                                alt=""
                                            />
                                            <div className={cx('detail')}>
                                                <span className={cx('gmail')}>{mail}</span>
                                                <span className={cx('rule')}>
                                                    <div className={cx('rule-box')}></div>
                                                    G2A Plus inactive
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
                                                        stroke-width="2"
                                                        stroke="#757575"
                                                        fill="none"
                                                        stroke-miterlimit="10"
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
                    {pc && <div className={cx('auth')}>{currentUser ? 'Your G2A' : 'Sign in / Register'}</div>}
                </div>
                <div className={cx('cart')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                        <path fill="white" d="M21 7l-2 10H5L2.4 4H0V2h5l1 5h15zM7 22h3v-3H7v3zm7 0h3v-3h-3v3z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Auth;
