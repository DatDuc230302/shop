import classNames from 'classnames/bind';
import style from './Plus.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

const cx = classNames.bind(style);
function Plus() {
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', tb && 'tb', mb && 'mb')}>
                <div className={cx('poster')}>
                    <div className={cx('poster-box')}>
                        <div className={cx('poster-img')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Plus%2FPoster.avif?alt=media&token=4d1dd441-2068-436c-93d0-4539445d4c3f"
                                alt=""
                            />
                        </div>
                        <div className={cx('poster-introduce')}>
                            <span className={cx('poster-title')}>G2A PLUS DAY</span>
                            <span className={cx('poster-content')}>
                                Try 3 months of G2A Plus for 2.99 EUR and get a free game!
                            </span>
                        </div>
                        <div className={cx('poster-cost')}>
                            <div className={cx('poster-price')}>
                                <span className={cx('price-main')}>2.99 EUR</span>
                                <span className={cx('price-old')}>7.94 EUR</span>
                            </div>
                            <div className={cx('poster-btn')}>Learn more</div>
                        </div>
                    </div>
                </div>
                <div className={cx('session')}>
                    <div className={cx('session-bg')}>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Plus%2Fsession_bg.webp?alt=media&token=496e6a2e-f051-434a-9515-004a9d85e752"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plus;
