import classNames from 'classnames/bind';
import style from './RenderKeys.module.scss';

const cx = classNames.bind(style);
function RenderKeys() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>Hi</div>
        </div>
    );
}

export default RenderKeys;
