import classNames from 'classnames/bind';
import style from './Navigate.module.scss';

const cx = classNames.bind(style);
function Navigate() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('categories')}>
                    <svg
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.7)"
                    >
                        <path d="M17 8H3V6h14v2zm4-2h-2v2h2V6zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2z"></path>
                    </svg>
                    <span className={cx('categories-title')}>CATEGORIES</span>
                </div>
                <div className={cx('item')}>Steam Gift Cards</div>
                <div className={cx('item')}>Bestsellers</div>
                <div className={cx('item')}>Random Keys</div>
                <div className={cx('item')}>Software</div>
                <div className={cx('plus')}>Save more with G2A Plus</div>
            </div>
        </div>
    );
}

export default Navigate;
