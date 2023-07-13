import classNames from 'classnames/bind';
import style from './Welcome.module.scss';
import logo2 from '../../assets/logo2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cx = classNames.bind(style);
function Welcome() {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [btn, setBtn] = useState<string>('');
    const [emailLogin, setEmailLogin] = useState<string>('');
    const [passLogin, setPassLogin] = useState<string>('');
    const [warn, setWarn] = useState<boolean>(false);
    //
    const [nameRegister, setNameRegister] = useState<string>('');
    const [emailRegister, setEmailRegister] = useState<string>('');
    const [passRegister, setPassRegister] = useState<string>('');
    const [confirmPassRegister, setConfirmPassRegister] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<boolean>(false);

    useEffect(() => {
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
                break;
        }
    }, [params.key]);

    const handlePost = () => {
        switch (params.key) {
            case 'login':
                if (
                    nameRegister.length <= 0 ||
                    emailRegister.length <= 0 ||
                    passRegister.length <= 0 ||
                    confirmPassRegister.length <= 0
                ) {
                    setWarn(true);
                } else {
                }
                break;
            case 'register':
                if (
                    nameRegister.length <= 0 ||
                    emailRegister.length <= 0 ||
                    passRegister.length <= 0 ||
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

    const registerUser = async () => {
        if (passRegister !== confirmPassRegister) {
            setConfirmPass(true);
        } else {
            alert('Cut');
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
                                {warn && emailLogin.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    onChange={(e) => setEmailLogin(String(e.target.value))}
                                    value={emailLogin}
                                    autoFocus
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your email"
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
                            </>
                        )}
                        {params.key === 'register' && (
                            <>
                                {warn && nameRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    autoFocus
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={(e) => setNameRegister(String(e.target.value))}
                                    value={nameRegister}
                                />
                                {warn && emailRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
                                )}
                                <input
                                    className={cx('body-input')}
                                    type="text"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmailRegister(String(e.target.value))}
                                    value={emailRegister}
                                />
                                {warn && passRegister.length <= 0 && (
                                    <span className={cx('body-warn')}>Please fill here!</span>
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
                            {btn}
                        </div>
                        <div className={cx('body-register')}>
                            <span> {content}</span>
                            {params.key === 'register' && <p onClick={() => navigate('/welcome/login')}>Login</p>}
                            {params.key === 'login' && <p onClick={() => navigate('/welcome/register')}>Register</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
