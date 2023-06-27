import classNames from 'classnames/bind';
import style from './LoginAdmin.module.scss';

const cx = classNames.bind(style);
function LoginAdmin() {
    return <div className={cx('Hi')}>loggin Admin</div>;
}

export default LoginAdmin;
