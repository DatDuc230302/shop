import classNames from 'classnames/bind';
import style from './Plus.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import {
    sectionLeftG2A,
    sectionLeftItems,
    sectionRightBox1 as list1,
    sectionRightBox2 as list2,
    membersQuantity,
    articles,
} from './ListItems';
import RenderCustom from '../../components/RenderCustom';

const cx = classNames.bind(style);

function Plus() {
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Buy & Sell Online: PC Games, Software, Gift Cards and More on G2A.COM';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('section', tb && 'tb', mb && 'mb')}>
                    <div className={cx('section-bg')}>
                        <img src={require('./../../assets/imgs/Plus/session_bg.webp')} alt="" />
                    </div>
                    <div className={cx('section-body')}>
                        <div className={cx('section-row', tb && 'tb', mb && 'mb')}>
                            <div className={cx('section-left', tb && 'tb', mb && 'mb')}>
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
                            <div className={cx('section-right', tb && 'tb', mb && 'mb')}>
                                <div className={cx('sectionRight-row', tb && 'tb', mb && 'mb')}>
                                    <div className={cx('sectionRight-col')}>
                                        <div className={cx('sectionRight-Box')}>
                                            <span className={cx('sectionRightBox-header')}>For Gamers and Geeks</span>
                                            <span className={cx('sectionRightBox-name')}>G2A Plus</span>
                                            <div className={cx('sectionRightBox-price')}>
                                                <sup>$</sup>
                                                <span>2.49</span>
                                                <p>/month</p>
                                                <h6>+ VAT</h6>
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
                                        </div>
                                        <div className={cx('sectionRightBox-btn')}>Save monthly</div>
                                    </div>
                                    <div className={cx('sectionRight-col')}>
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
                                                <h6>+ VAT</h6>
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
                                        </div>
                                        <div className={cx('sectionRightBox-btn')}>Save yearly</div>
                                    </div>
                                </div>
                                <div className={cx('section-privacy', tb && 'tb', mb && 'mb')}>
                                    <div className={cx('sectionPrivacy-col')}>
                                        <div className={cx('privacyCol-item')}>
                                            <span className={cx('privacyCol-title')}>
                                                As a G2A Plus member, you will be charged monthly or yearly, depending
                                                on the plan you choose.
                                            </span>
                                            <div className={cx('privacy-link')}>
                                                By selecting a plan, you acknowledge you’ve read and agreed to G2A.COM
                                                <span className={cx('privacyLink-item')}>Terms and Conditions</span>
                                                and
                                                <span className={cx('privacyLink-item')}>Privacy Policy.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('members', tb && 'tb', mb && 'mb')}>
                    <div className={cx('members-body')}>
                        <div className={cx('members-header')}>G2A Plus members already saved:</div>
                        <div className={cx('members-list')}>
                            <span className={cx('membersList-euro')}>€</span>
                            <div className={cx('membersList-quantity', tb && 'tb', mb && 'mb')}>
                                {membersQuantity.map((item, index) => (
                                    <div key={index} className={cx('membersQuantity-item', item.active && 'active')}>
                                        <div className={cx('membersItem-top')}></div>
                                        <span className={cx('membersItem-number')}>{item.number}</span>
                                        <div className={cx('membersItem-bottom')}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className={cx('members-footer')}>
                            Join hundreds of thousands G2A Plus members and start saving big today!
                        </span>
                    </div>
                </div>
                {articles.map((item: any, index: number) => (
                    <div key={index} className={cx('articles', item.active && 'active')}>
                        <div className={cx('articles-body')}>
                            <div className={cx('articles-info')}>
                                <span className={cx('articles-title')}>{item.title}</span>
                                <span className={cx('articles-content')}>{item.content}</span>
                                {item.activeBtns && (
                                    <div className={cx('articles-btns', tb && 'tb', mb && 'mb')}>
                                        <div className={cx('articles-btn')}>Redeem</div>
                                        <div className={cx('articles-btn', 'active')}>Buy Gift Card</div>
                                    </div>
                                )}
                            </div>
                            <div className={cx('articles-img', tb && 'tb', mb && 'mb', item.activeImg && 'active')}>
                                <img src={item.img} alt="" />
                            </div>
                        </div>
                    </div>
                ))}
                <div className={cx('products')}>
                    <div className={cx('products-body')}>
                        <RenderCustom type={'Trending'} theme={'dark'} />
                        <RenderCustom type={'Software'} theme={'dark'} />
                        <RenderCustom type={'underten'} theme={'dark'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plus;
