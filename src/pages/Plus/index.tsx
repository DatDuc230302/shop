import classNames from 'classnames/bind';
import style from './Plus.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { sectionLeftG2A, sectionLeftItems } from './sectionLeftISvgs';

const cx = classNames.bind(style);

const list1 = [
    'Cheaper games up to 10%',
    'Free game each month',
    'Games & software for any platform',
    'Cancel anytime',
];

const list2 = [
    'Cheaper games up to 10%',
    'Free game each month',
    'Games & software for any platform',
    'Collect savings all year round',
];

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
                <div className={cx('section')}>
                    <div className={cx('section-bg')}>
                        <img src={require('./../../assets/imgs/Plus/session_bg.webp')} alt="" />
                    </div>
                    <div className={cx('section-body')}>
                        <div className={cx('section-row')}>
                            <div className={cx('section-left')}>
                                <div className={cx('sectiongLeft-svg')}>{sectionLeftG2A}</div>
                                <span className={cx('sectionLeft-title')}>
                                    Every game at the lowest possible price!
                                </span>
                                {sectionLeftItems.map((item: any, index: number) => (
                                    <div key={index} className={cx('sectionLeft-item')}>
                                        {item.svg}
                                        <span>{item.title}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('section-right')}>
                                <div className={cx('sectionRight-Box')}>
                                    <span className={cx('sectionRightBox-header')}>For Gamers and Geeks</span>
                                    <span className={cx('sectionRightBox-name')}>G2A Plus</span>
                                    <div className={cx('sectionRightBox-price')}>
                                        <sup>$</sup>
                                        <span>2.49</span>
                                        <p>/month</p>
                                        <text>+ VAT</text>
                                    </div>
                                    <div className={cx('sectionRightBox-detail')}>
                                        <div className={cx('sectionRightBox-list')}>
                                            {list1.map((item: string, index: number) => (
                                                <div key={index} className={cx('sectionRightBox-item')}>
                                                    <img src={require('../../assets/imgs/check.png')} />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('sectionRightBox-btn')}>Save monthly</div>
                                </div>
                                <div className={cx('sectionRight-Box', 'active')}>
                                    <div className={cx('sectionRightBox-present')}>
                                        <span>BEST VALUE</span>
                                        <p>2 months free</p>
                                    </div>
                                    <span className={cx('sectionRightBox-name')}>
                                        G2A Plus<span style={{ fontWeight: 100 }}> PRO GAMER</span>
                                    </span>
                                    <div className={cx('sectionRightBox-price')}>
                                        <sup>$</sup>
                                        <span>24.99</span>
                                        <p>/year</p>
                                        <text>+ VAT</text>
                                    </div>
                                    <div className={cx('sectionRightBox-detail')}>
                                        <div className={cx('sectionRightBox-list')}>
                                            {list2.map((item: string, index: number) => (
                                                <div key={index} className={cx('sectionRightBox-item')}>
                                                    <img src={require('../../assets/imgs/check.png')} />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('sectionRightBox-btn')}>Save yearly</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('section-privacy')}>
                        <div className={cx('sectionPrivacy-col')}>
                            <div>
                                <span>
                                    As a G2A Plus member, you will be charged monthly or yearly, depending on the plan
                                    you choose.
                                </span>
                                <p>
                                    By selecting a plan, you acknowledge you’ve read and agreed to G2A.COM
                                    <a>Terms and Conditions</a>and <a>Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('members')}></div>
            </div>
        </div>
    );
}

export default Plus;
