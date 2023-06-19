import classNames from 'classnames/bind';
import style from './Footer.module.scss';

const cx = classNames.bind(style);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('body')}></div>
            </div>
        </div>
    );
}

export default Footer;
