import classNames from 'classnames/bind';
import style from './Welcome.module.scss';
import logo2 from '../../assets/logo2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import Loading from '../../components/Loading';
import { loadingApi } from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import cartAction from '../../redux/actions/cartAction';
import { LoginGoogle } from '../../components/Auth/AuthGoogle';
import authClientAction from '../../redux/actions/authClientAction';

const cx = classNames.bind(style);
function Welcome() {
    // Router
    const params = useParams();
    const navigate = useNavigate();

    // Redux
    const dispath = useDispatch();

    // State 1
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [btn, setBtn] = useState<string>('');

    // State 2
    const [idLogin, setIdLogin] = useState<string>('');
    const [passLogin, setPassLogin] = useState<string>('');

    // State 3
    const [idRegister, setIdRegister] = useState<string>('');
    const [nameRegister, setNameRegister] = useState<string>('');
    const [passRegister, setPassRegister] = useState<string>('');
    const [confirmPassRegister, setConfirmPassRegister] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<boolean>(false);

    // State 4
    const [loading, setLoading] = useState<boolean>(false);
    const [warn, setWarn] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);
    const [alertRegister, setAlertRegister] = useState<boolean>(false);
    const [alertLogin, setAlertLogin] = useState<boolean>(false);
    const [checkUserPass, setCheckUserPass] = useState<boolean>(false);

    // Effect
    useEffect(() => {
        // Khi chuyển từ login qua register or ngược lại sẽ reset state về trạng thái ban đầu
        setIdLogin('');
        setPassLogin('');
        setIdRegister('');
        setNameRegister('');
        setPassRegister('');
        setConfirmPassRegister('');
        setWarn(false);
        setConfirmPass(false);
        setCheckUserPass(false);
        //

        switch (params.key) {
            case 'login':
                setTitle('Sign in or create an account');
                setContent("Don't have an account?");
                setBtn('Login');
                break;
            case 'register':
                setTitle('Register your account');
                setContent('Already an account?');
                setBtn('Register');
                break;
            default:
                navigate('/welcome/login');
                break;
        }
    }, [params.key]);

    // Function
    const handlePost = () => {
        switch (params.key) {
            case 'login':
                if (idLogin.length <= 0 || passLogin.length <= 0) {
                    setWarn(true);
                } else {
                    loginUser();
                }
                break;
            case 'register':
                if (
                    nameRegister.length <= 0 ||
                    passRegister.length <= 0 ||
                    (passRegister.length > 0 && passRegister.length < 6) ||
                    confirmPassRegister.length <= 0
                ) {
                    setWarn(true);
                } else {
                    registerUser();
                }
                break;
            default:
                break;
        }
    };

    const existsUser = async (id: string) => {
        const result = await axios.get(`${ServerURL}/users/queryId?id=${id}`);
        return result;
    };

    const registerUser = loadingApi(async () => {
        const checkUser = await existsUser(idRegister);
        if (passRegister !== confirmPassRegister) {
            setConfirmPass(true);
        } else {
            if (checkUser.data.length === 0) {
                const result = await axios.post(`${ServerURL}/users/add`, {
                    id: idRegister,
                    password: passRegister,
                    name: nameRegister,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/avatars%2Favatar_10.svg?alt=media&token=321992ad-d6d1-4dcd-94d4-c6ab06a69283',
                    defaultAvatar:
                        'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/avatars%2Favatar_10.svg?alt=media&token=321992ad-d6d1-4dcd-94d4-c6ab06a69283',
                    rule: 1,
                });
                await axios.post(`${ServerURL}/carts/addCarts`, { idUser: idRegister });
                if (result.data.message === 'successfully') {
                    setAlertRegister(true);
                    setTimeout(() => {
                        setAlertRegister(false);
                        localStorage.setItem('currentUserId', idRegister);
                        navigate('/');
                        dispath(cartAction());
                    }, 1000);
                }
            } else {
                setAlert(true);
            }
        }
    }, setLoading);

    const loginUser = loadingApi(async () => {
        const result = await axios.get(`${ServerURL}/users/checkMember?id=${idLogin}&password=${passLogin}`);
        if (result.data.message === 'successfully') {
            setAlertLogin(true);
            setCheckUserPass(false);
            setTimeout(() => {
                setAlertLogin(false);
                // Gán currentUserId lên localstorage
                localStorage.setItem('currentUserId', idLogin);
                // Rerender lại cart
                dispath(cartAction());
                // Điều trang về home
                navigate('/');
            }, 1000);
        } else {
            setCheckUserPass(true);
        }
    }, setLoading);

    document.onkeydown = (e: any) => {
        if (e.which === 13) {
            handlePost();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <Link to={'/'}>{logo2}</Link>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-box')}>
                        <span className={cx('body-header')}>{title}</span>
                        {params.key === 'login' && (
                            <>
                                {warn && idLogin.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    onChange={(e) => setIdLogin(String(e.target.value))}
                                    value={idLogin}
                                    autoFocus
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your user"
                                />
                                {warn && passLogin.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    onChange={(e) => setPassLogin(String(e.target.value))}
                                    value={passLogin}
                                    className={cx('body-input')}
                                    type="password"
                                    placeholder="Enter your password"
                                />
                                <div style={{ marginBottom: '10px' }}>
                                    <LoginGoogle />
                                </div>
                            </>
                        )}
                        {params.key === 'register' && (
                            <>
                                {warn && idRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    autoFocus
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your user"
                                    onChange={(e) => setIdRegister(String(e.target.value))}
                                    value={idRegister}
                                />
                                {warn && nameRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={(e) => setNameRegister(String(e.target.value))}
                                    value={nameRegister}
                                />
                                {warn && passRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                {warn && passRegister.length > 0 && passRegister.length < 6 && (
                                    <span className={cx('body-warn')}>Minimum password length is 6</span>
                                )}
                                <input
                                    className={cx('body-input')}
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassRegister(String(e.target.value))}
                                    value={passRegister}
                                />
                                {warn && confirmPassRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                {confirmPass && confirmPassRegister !== passRegister && (
                                    <span className={cx('body-warn')}>Confirm pass is wrong!</span>
                                )}
                                <input
                                    className={cx('body-input')}
                                    type="password"
                                    placeholder="Confirm your password"
                                    onChange={(e) => setConfirmPassRegister(String(e.target.value))}
                                    value={confirmPassRegister}
                                />
                            </>
                        )}
                        <div onClick={() => handlePost()} className={cx('body-btn')}>
                            {loading ? (
                                <div>
                                    <Loading size="2rem" />
                                </div>
                            ) : (
                                btn
                            )}
                        </div>
                        {checkUserPass && (
                            <span style={{ textAlign: 'center', margin: '10px 0' }} className={cx('body-warn')}>
                                Please check your user and password and try again!!!
                            </span>
                        )}

                        <div className={cx('body-register')}>
                            <span> {content}</span>
                            {params.key === 'register' && <p onClick={() => navigate('/welcome/login')}>Login</p>}
                            {params.key === 'login' && <p onClick={() => navigate('/welcome/register')}>Register</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('alert', alert && 'active')}>
                <div className={cx('overlay')}></div>
                <div className={cx('alert-box', alert && 'active')}>
                    <span className={cx('alert-title')}>This user is already!!!</span>
                    <div onClick={() => setAlert(false)} className={cx('alert-btn')}>
                        OK
                    </div>
                </div>
            </div>
            <div className={cx('alert-top', alertRegister && 'active')}>Register Success!!!</div>
            <div className={cx('alert-top', alertLogin && 'active')}>Login Success!!!</div>
        </div>
    );
}

export default Welcome;
