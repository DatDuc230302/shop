import classNames from 'classnames/bind';
import style from './Loading.module.scss';

const cx = classNames.bind(style);
function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('loading')}></div>
            </div>
        </div>
    );
}

export default Loading;
