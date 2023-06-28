import classNames from 'classnames/bind';
import style from './NotFound.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);
function NotFoundPage() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', tb && 'tb', mb && 'mb')}>
                <div className={cx('info')}>
                    <span className={cx('title')}>Sorry, page not found</span>
                    <span className={cx('content')}>Are you looking for something specific?</span>
                </div>
                <div className={cx('img')}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Chaotics%2FNotFound404.svg?alt=media&token=e0a42f17-0ca6-4bce-8d8e-6272b186c008" />
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
