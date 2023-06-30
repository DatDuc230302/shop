import classNames from 'classnames/bind';
import style from './SoftWareDeals.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(style);

function SoftWareDeals() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('session')}>
                    <div className={cx('session-background')}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fbgmain.avif?alt=media&token=7fa4a8c1-15ce-4b53-9e5a-48ae8fff3c56" />
                    </div>
                    <div className={cx('session-body')}>
                        <div className={cx('session-row', tb && 'tb', mb && 'mb')}>
                            <div className={cx('session-col1')}>
                                <Link to={'/detail/648d3f3807e377acc28237e3'} className={cx('sessionCol1-img')}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsession%2Fwin11Pro.avif?alt=media&token=c2cb04b3-558d-445a-9988-8d67c76ea55e"
                                        alt=""
                                    />
                                    <div className={cx('session-buy')}>Buy now</div>
                                </Link>
                            </div>
                            <div className={cx('session-col2')}>
                                <Link to={'/detail/648d24d01e5af6a1363b8971'} className={cx('sessionCol2-img')}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsession%2Fwin10home.avif?alt=media&token=6aee5954-b00d-4618-92e6-0a53a8c66c2f"
                                        alt=""
                                    />
                                    <div className={cx('session-buy')}>Buy now</div>
                                </Link>
                                <div className={cx('sessionCol2-row')}>
                                    <Link to={'/detail/648d3fb407e377acc28237e7'} className={cx('sessionCol2-rowImg')}>
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsession%2Fwin10pro.avif?alt=media&token=55cdcb37-dfb4-4dbe-a1e6-6aa730d6b08c"
                                            alt=""
                                        />
                                        <div className={cx('session-buy')}>Buy now</div>
                                    </Link>
                                    <Link to={'/detail/648d404c07e377acc28237eb'} className={cx('sessionCol2-rowImg')}>
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsession%2Fwin11home.avif?alt=media&token=f0950c7c-31d2-4872-b1a8-e597f6d02ad3"
                                            alt=""
                                        />
                                        <div className={cx('session-buy')}>Buy now</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SoftWareDeals;
