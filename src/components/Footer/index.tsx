import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useEffect } from 'react';

const infoLists = [
    {
        title: 'G2A',
        contents: ['About us', 'Newsroom', 'Contact', 'Careers', 'Reliability'],
    },
    {
        title: 'COOPERATION',
        contents: ['Marketing Partnership', 'Affiliate Program', 'Reviews'],
    },
    {
        title: 'FOR BUYERS',
        contents: ['Buyers Support', 'How to Buy', 'Stay Safe', 'Sitemap'],
    },
    {
        title: 'FOR SELLERS',
        contents: ['Sellers Support', 'How to Sell', 'Import via API', 'Business Center'],
    },
    {
        title: 'USER TERMS & PRIVACY',
        contents: ['Terms & Conditions', 'Privacy & Cookies'],
    },
    {
        title: 'OUR PRODUCTS',
        contents: ['G2A Plus', 'G2A News', 'G2A Loot'],
    },
];

const listSocials = [
    'https://images.g2a.com/facebook/28x28/1x1x1/8e99c08cdbda/605ae42d7e696c259961a462',
    'https://images.g2a.com/twitter/28x28/1x1x1/225a9ced8d38/605ae47e46177c04b511d712',
    'https://images.g2a.com/youtube/28x28/1x1x1/6624e20dfc20/605ae4d746177c471a610dd2',
    'https://images.g2a.com/instagram/28x28/1x1x1/a28f82123e6b/605ae4aa7e696c2a5346b672',
    'https://images.g2a.com/linkedin/28x28/1x1x1/8223483aa633/605ae5127e696c2efa512f62',
    'https://images.g2a.com/twitch/28x28/1x1x1/9422ab6d9c45/605ae53646177c7b1b4eb952',
    'https://images.g2a.com/reddit/28x28/1x1x1/8a5840c01a34/605ae17746177c6d930f11c2',
];

const paymentsLight = [
    'https://www.g2a.com/static/assets/payment-methods/visa.svg',
    'https://www.g2a.com/static/assets/payment-methods/mastercard.svg',
    'https://www.g2a.com/static/assets/payment-methods/paysafecard.svg',
    'https://www.g2a.com/static/assets/payment-methods/discover.svg',
    'https://www.g2a.com/static/assets/payment-methods/paypal.svg',
];

const paymentDark = [
    'https://www.g2a.com/static/assets/payment-methods/dark/visa.svg',
    'https://www.g2a.com/static/assets/payment-methods/dark/mastercard.svg',
    'https://www.g2a.com/static/assets/payment-methods/dark/paysafecard.svg',
    'https://www.g2a.com/static/assets/payment-methods/dark/discover.svg',
    'https://www.g2a.com/static/assets/payment-methods/dark/paypal.svg',
    'https://www.g2a.com/static/assets/payment-methods/dark/paypal.svg',
];

const locationLists = [
    [
        'G2A.COM Limited 31/F, Tower Two, Times Square, 1 Matheson Street',
        'Causeway Bay, Hong Kong',
        'Incorporation number: 2088957',
        'Business registration number: 63264201',
    ],
    [
        'Customer (support) services are granted by G2A PL Sp. z o.o.',
        'Address:',
        'G2A PL Sp. z o.o.',
        '53 Emilii Plater Street',
        '00-113 Warsaw',
    ],
];

const cx = classNames.bind(style);
function Footer({ theme }: any) {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [activeItems, setActiveItems] = useState<number[]>([]);
    const [listPayments, setListPayments] = useState<string[]>([]);

    // Function
    const handleItemClick = (index: number) => {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter((item) => item !== index));
        } else {
            setActiveItems([...activeItems, index]);
        }
    };

    useEffect(() => {
        if (theme === 'dark') {
            setListPayments(paymentDark);
        } else {
            setListPayments(paymentsLight);
        }
    }, [theme]);

    return (
        <div
            style={{ background: theme === 'dark' ? '#212121' : '#ffffff' }}
            className={cx('wrapper', tb && 'tb', mb && 'mb')}
        >
            <div className={cx('inner')}>
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    <div className={cx('payment')}>
                        <div className={cx('payment-methods')}>
                            {pc && <div className={cx('paymentMethods-title')}>Payment methods:</div>}
                            <div className={cx('paymentMethods-list')}>
                                {listPayments.map((item: string, index: number) => (
                                    <img key={index} src={item} alt="" />
                                ))}
                                and 200+ more
                            </div>
                        </div>
                        <div className={cx('payment-languages')}>
                            <div className={cx('paymentLanguages-img')}>
                                <img src="https://www.g2a.com/static/assets/flags/englishus.svg" alt="" />
                            </div>
                            <span className={cx('paymentLanguages-title')}>United States (English) / USD</span>
                            {pc && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18px"
                                    height="18px"
                                    fill="currentColor"
                                >
                                    <path
                                        fill="none"
                                        strokeMiterlimit="10"
                                        d="M16 10l-4 4-4-4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="#ccc"
                                    ></path>
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('info-list')}>
                            {infoLists.map((item: any, index: number) => (
                                <div
                                    onClick={() => handleItemClick(index)}
                                    key={index}
                                    className={cx('info-item', activeItems.includes(index) ? 'active' : '')}
                                >
                                    <span className={cx('infoItem-title')}>
                                        {item.title}
                                        {!pc && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24px"
                                                height="24px"
                                                fill="#999999"
                                            >
                                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                            </svg>
                                        )}
                                    </span>
                                    {item.contents.map((content: any, index: number) => (
                                        <span
                                            style={{ color: theme === 'dark' ? '#c6c6c6' : '#0000008a' }}
                                            key={index}
                                            className={cx('infoItem-content')}
                                        >
                                            {content}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {!pc && (
                            <div className={cx('location-socials')}>
                                <img
                                    src="https://images.g2a.com/facebook/28x28/1x1x1/8e99c08cdbda/605ae42d7e696c259961a462"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/twitter/28x28/1x1x1/225a9ced8d38/605ae47e46177c04b511d712"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/youtube/28x28/1x1x1/6624e20dfc20/605ae4d746177c471a610dd2"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/instagram/28x28/1x1x1/a28f82123e6b/605ae4aa7e696c2a5346b672"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/linkedin/28x28/1x1x1/8223483aa633/605ae5127e696c2efa512f62"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/twitch/28x28/1x1x1/9422ab6d9c45/605ae53646177c7b1b4eb952"
                                    alt=""
                                />
                                <img
                                    src="https://images.g2a.com/reddit/28x28/1x1x1/8a5840c01a34/605ae17746177c6d930f11c2"
                                    alt=""
                                />
                            </div>
                        )}
                        <div className={cx('info-contact')}>
                            <span
                                style={{ color: theme === 'dark' ? '#ffffffde' : '#000' }}
                                className={cx('infoContact-title')}
                            >
                                Install the G2A app
                            </span>
                            <span className={cx('infoContact-content')}>Get great deals on games wherever you go!</span>
                            <div className={cx('infoContact-vote')}>
                                <div className={cx('infoContact-starts')}>
                                    <svg
                                        fill="#FFB400"
                                        width={15}
                                        height={15.2}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                        fill="#FFB400"
                                        width={15}
                                        height={15.2}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                        fill="#FFB400"
                                        width={15}
                                        height={15.2}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                        fill="#FFB400"
                                        width={15}
                                        height={15.2}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                        width={15}
                                        height={15.2}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="url(#i5)"
                                    >
                                        <defs>
                                            <linearGradient id="i5">
                                                <stop
                                                    stopOpacity="1"
                                                    offset="50%"
                                                    style={{ color: '#FFB400', fill: '#FFB400', stopColor: '#FFB400' }}
                                                ></stop>
                                                <stop
                                                    stopOpacity="1"
                                                    offset="50%"
                                                    style={{ fill: '#D9D9D9', stopColor: '#D9D9D9' }}
                                                ></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                </div>
                                <span style={{ fontSize: '1.4rem', marginRight: 4 }}>
                                    4.5 &nbsp;&nbsp;-&nbsp;&nbsp; 48,736{' '}
                                </span>
                                votes
                            </div>
                            <div className={cx('infoContact-get')}>
                                <div className={cx('infoContact-getImg')}>
                                    <img src="https://www.g2a.com/static/assets/images/badge_google_play.svg" alt="" />
                                </div>
                                <div className={cx('infoContact-getImg')}>
                                    <img src="https://www.g2a.com/static/assets/images/badge_app_store.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('location')}>
                        <div className={cx('location-detail')}>
                            {locationLists.map((item: any, index: number) => (
                                <div key={index} className={cx('location-list')}>
                                    {item.map((title: any, index: number) => (
                                        <span key={index} className={cx('locationList-item')}>
                                            {title}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {pc && (
                            <div className={cx('location-socials')}>
                                {listSocials.map((item: string, index: number) => (
                                    <img key={index} src={item} alt="" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={cx('privacy')}>
                        Use of this Web site constitutes acceptance of the
                        <span style={{ color: theme === 'dark' ? '#fff' : '#000' }} className={cx('privacy-link')}>
                            {' '}
                            Terms and Conditions{' '}
                        </span>
                        and
                        <span style={{ color: theme === 'dark' ? '#fff' : '#000' }} className={cx('privacy-link')}>
                            {' '}
                            Privacy policy{' '}
                        </span>
                        . All copyrights, trade marks, service marks belong to the corresponding owners.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
