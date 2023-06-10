import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { emptyCart } from '../../assets/imgs/empty_cart';
import { ServerURL } from '../../connect';

const cx = classNames.bind(style);

function Cart() {
    // State
    const [api, setApi] = useState([]);
    const [showChange, setShowChange] = useState(false);

    // Effect
    useEffect(() => {
        getApi();
    }, []);

    // React-Router
    const navigate = useNavigate();

    // Function
    const getApi = async () => {
        if (localStorage.getItem('cartsLocal') !== null) {
            const arrId = JSON.parse(`${localStorage.getItem('cartsLocal')}`);
            const data = await axios.post(`${ServerURL}/products/findAllById`, { arrId: arrId });
            setApi(data.data);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {localStorage.getItem('cartsLocal') === null ? (
                    <div className={cx('empty')}>
                        <div className={cx('img')}>{emptyCart}</div>
                        <span className={cx('title')}>Your cart is empty</span>
                        <span className={cx('content')}>Go ahead and add some cool stuff to it!</span>
                        <Link to="/" className={cx('browse')}>
                            Browse deals
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={cx('header')}>
                            <div className={cx('row')}>
                                <span className={cx('title')}>Your cart</span>
                                <span className={cx('quantity')}>({api.length} products)</span>
                            </div>
                            <div className={cx('warn')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    color="#2F82FB"
                                >
                                    <g
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="12" r="11" fill="none" strokeMiterlimit="10"></circle>
                                        <path fill="none" strokeMiterlimit="10" d="M12 11v6"></path>
                                        <circle data-stroke="none" cx="12" cy="7" r="1" stroke="none"></circle>
                                    </g>
                                </svg>
                                <span className={cx('content')}>
                                    Complete the order - adding products to the cart does not mean booking.
                                </span>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('box-product')}>
                                {api.map((item: any, index: any) => (
                                    <div key={index} className={cx('product')}>
                                        <div className={cx('product-header')}>
                                            <span className={cx('header-title')}>
                                                YOU ARE BUYING FROM{' '}
                                                <span style={{ color: '#757575' }}>Green_and_red</span>
                                            </span>
                                            <span
                                                style={{ transform: 'translateY(-1px)' }}
                                                className={cx('header-title')}
                                            >
                                                By buying from this seller you accept their
                                                <span style={{ color: '#757575' }}> Terms & conditions</span>
                                            </span>
                                        </div>
                                        <div className={cx('product-item')}>
                                            <img
                                                onClick={() => navigate(`/detail/${item._id}`)}
                                                className={cx('img')}
                                                src={item.img}
                                                alt=""
                                            />
                                            <span className={cx('product-name')}>
                                                Red Dead Redemption 2 (PC) - Rockstar Key - GLOBAL
                                            </span>
                                            <div className={cx('product-tools')}>
                                                <div
                                                    onClick={() => setShowChange(true)}
                                                    className={cx('tools-change', showChange && 'active')}
                                                >
                                                    1
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="22px"
                                                        height="22px"
                                                        fill="currentColor"
                                                        style={{ marginLeft: 17, transform: 'translateY(-3px)' }}
                                                    >
                                                        <path
                                                            fill="none"
                                                            strokeMiterlimit="10"
                                                            d="M16 10l-4 4-4-4"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="13.8px"
                                                    height="13.6px"
                                                    fill="#9b9b9b"
                                                    style={{ cursor: 'pointer', transform: 'translateY(-0.8px)' }}
                                                >
                                                    <g
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="#9b9b9b"
                                                        fill="none"
                                                        strokeMiterlimit="10"
                                                    >
                                                        <path d="M20 9v12a2 2 0 01-2 2H6a2 2 0 01-2-2V9M1 5h22M12 12v6M8 12v6M16 12v6M8 5V1h8v4"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className={cx('product-price')}>
                                                <span className={cx('dollars')}>
                                                    ${' '}
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        {item.discount > 0 ? item.priceDiscount : item.price}
                                                    </span>
                                                </span>
                                                <span className={cx('vat')}>VAT inc. if applicable</span>
                                            </div>
                                        </div>
                                        <div className={cx('footer')}>Buy more from this seller</div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('pay')}>
                                <div className={cx('pay-box1')}>
                                    <span className={cx('payBox1-header')}>Save extra with G2A Plus</span>
                                    <div className={cx('payBox1-detail')}>
                                        <div className={cx('payBox1-description')}>
                                            <span className={cx('payBox1-title')}>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14.4px"
                                                    height="14px"
                                                    fill="#6202EA"
                                                    font-size="14px"
                                                >
                                                    <path
                                                        d="M6 12l4 4 8-8"
                                                        stroke="#6202EA"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                    ></path>
                                                </svg>
                                                Discounts on all games
                                            </span>
                                            <span className={cx('payBox1-title')}>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14.4px"
                                                    height="14px"
                                                    fill="#6202EA"
                                                    font-size="14px"
                                                >
                                                    <path
                                                        d="M6 12l4 4 8-8"
                                                        stroke="#6202EA"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                    ></path>
                                                </svg>
                                                Free game every month
                                            </span>
                                            <span className={cx('payBox1-title')}>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14.4px"
                                                    height="14px"
                                                    fill="#6202EA"
                                                    font-size="14px"
                                                >
                                                    <path
                                                        d="M6 12l4 4 8-8"
                                                        stroke="#6202EA"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                    ></path>
                                                </svg>
                                                Cancel anytime in your account settings
                                            </span>
                                        </div>
                                        <div className={cx('payBox1-button')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
