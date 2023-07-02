import classNames from 'classnames/bind';
import style from './SoftWareDeals.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import RenderCustom from '../../components/RenderCustom';
import RenderNews from '../../components/RenderNews';

const regionProducts = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg1.avif?alt=media&token=d36d4d89-36b5-4d53-a715-428ff70dfb7b',
        name: 'Office Professional Plus 2021',
        content:
            'Pretty much the best office suite that offers unparalleled tools for all sorts of business purposes. Get your Office supplies!',
        link: '648d3ff007e377acc28237e9',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg2.avif?alt=media&token=d4875e06-81fb-400a-9a2f-eb449196c455',
        name: 'Adobe Photoshop Elements 2023',
        content: 'The leading graphics editor on the market, now with a lovely discount. Grab it while stocks last!',
        link: '649f9582f9a4d3ec37fe782d',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg3.avif?alt=media&token=7f62d08d-be66-4ab7-aaea-0875dda6b53a',
        name: 'CCleaner Professional',
        content:
            'This piece of cleaner software - one of the best of its kind - will help you keep your system neat and tidy for the best performance. Start cleaning right away!',
        link: '649e5d0113ce4bc610b4953f',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg4.avif?alt=media&token=f8c4a5ec-e597-43a2-a239-85d203f8e68c',
        name: 'AIDA64 Extreme Edition',
        content:
            'Need detailed information on your computer and OS? Grab AIDA64, the best app in its class. Inspect your system!',
        link: '649f967bf9a4d3ec37fe786c',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg5.avif?alt=media&token=26919d3d-9e78-4f99-a6e9-75534e8c5d25',
        name: '3DMark',
        content:
            "There's no better tool to check your computer's performance and capabilities than this one. It still rocks in 2023! Test your hardware's power!",
        link: '648d26331e5af6a1363b897b',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fregion%2Fimg6.avif?alt=media&token=cd7ba2d8-1730-4d92-9910-018b305b392a',
        name: 'CorelDRAW Graphics Suite 2021',
        content:
            'Check out some of the best graphic design apps on the market. This suite suits any project: vectors, photo editing and so on. Unleash your artistic side!',
        link: '649f9702f9a4d3ec37fe7883',
    },
];

const securityProducts = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsecurity%2Fimg1.avif?alt=media&token=b7e81c48-ec51-4ac3-9839-79b428903076',
        link: '64a02bb3d65a1400bad62db5',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsecurity%2Fimg2.avif?alt=media&token=8cafce1c-12a8-4beb-8c90-ca05741ec0d3',
        link: '64a0224fada14244b2aefdd8',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsecurity%2Fimg3.avif?alt=media&token=7b2d793a-31ea-46c7-ac92-5775a75fd8b3',
        link: '64a0228aada14244b2aefddc',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsecurity%2Fimg4.avif?alt=media&token=0fde32d5-5b23-41a9-a812-650354022e5e',
        link: '64a02c38d65a1400bad62dd2',
    },
];

const cx = classNames.bind(style);
function SoftWareDeals() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Soft Ware Deals';
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div style={{ marginTop: 100 }}>
                    <Loading />
                </div>
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('session')}>
                        <div className={cx('session-background')}>
                            <img src={require('./../../assets/imgs/Software-deals/bgmain.avif')} />
                        </div>
                        <div className={cx('session-body', tb && 'tb', mb && 'mb')}>
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
                                        <Link
                                            to={'/detail/648d3fb407e377acc28237e7'}
                                            className={cx('sessionCol2-rowImg')}
                                        >
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Software-deals%2Fsession%2Fwin10pro.avif?alt=media&token=55cdcb37-dfb4-4dbe-a1e6-6aa730d6b08c"
                                                alt=""
                                            />
                                            <div className={cx('session-buy')}>Buy now</div>
                                        </Link>
                                        <Link
                                            to={'/detail/648d404c07e377acc28237eb'}
                                            className={cx('sessionCol2-rowImg')}
                                        >
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
                    <div className={cx('region')}>
                        <div className={cx('region-background')}>
                            <img src={require('./../../assets/imgs/Software-deals/bgRegion.avif')} alt="" />
                            <div className={cx('region-header', tb && 'tb', mb && 'mb')}>
                                <span className={cx('region-title')}>Utilities</span>
                                <span className={cx('region-content')}>
                                    View the best offers on utility software, and buy the must-have apps for both your
                                    home and office.
                                </span>
                            </div>
                        </div>
                        <div className={cx('region-body')}>
                            <div className={cx('region-products')}>
                                {regionProducts.map((item: any, index) => (
                                    <Link
                                        to={`/detail/${item.link}`}
                                        key={index}
                                        className={cx('region-item', tb && 'tb', mb && 'mb')}
                                    >
                                        <div className={cx('regionItem-img')}>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <span className={cx('regionItem-name')}>{item.name}</span>
                                        <span className={cx('regionItem-content')}>{item.content}</span>
                                        <div className={cx('regionItem-btn')}>Buy now</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('security', tb && 'tb', mb && 'mb')}>
                        <div className={cx('security-background')}>
                            <img src={require('./../../assets/imgs/Software-deals/bgSecurity.avif')} alt="" />
                        </div>
                        <div className={cx('security-body', tb && 'tb', mb && 'mb')}>
                            <div className={cx('security-box')}>
                                <div className={cx('security-info')}>
                                    <span className={cx('security-name')}>Security</span>
                                    <span className={cx('security-content')}>
                                        Check out the deals on some of the most essential security apps. Keep your data
                                        and digital privacy protected.
                                    </span>
                                </div>
                                <div className={cx('security-products')}>
                                    {securityProducts.map((item: any, index: number) => (
                                        <Link
                                            key={index}
                                            to={`/detail/${item.link}`}
                                            className={cx('securityProduct-img')}
                                        >
                                            <img src={item.img} alt="" />
                                            <div className={cx('security-btn')}>Buy now</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 1170 }}>
                            <RenderCustom type={'Antivirus'} />
                        </div>
                    </div>
                    <div style={{ padding: '0 16px' }}>
                        <RenderNews />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SoftWareDeals;
