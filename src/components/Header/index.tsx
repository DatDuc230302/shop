import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>This is the Header</div>
        </div>
    );
}

export default Header;
