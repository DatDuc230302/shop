import classNames from 'classnames/bind';
import style from './Home.module.scss';

const cx = classNames.bind(style);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>Xin chao</div>
        </div>
    );
}

export default Home;
