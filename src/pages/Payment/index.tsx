import classNames from 'classnames/bind';
import style from './Payment.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const payments = [
    {
        img: 'https://checkout.pay.g2a.com/g2awallet.png',
        title: 'G2A Wallet',
        content: 'Pay with G2A Wallet.',
        payTitle: 'Pay with G2A Wallet',
    },
    {
        img: 'https://checkout.pay.g2a.com/paypal.png',
        title: 'PayPal',
        content: 'Pay with PayPal.',
        payTitle: 'Pay with PayPal',
    },
    {
        img: 'https://checkout.pay.g2a.com/zen_skrill.png',
        title: 'Skrill',
        content: 'Pay with Skrill.',
        payTitle: 'Pay with Skrill',
    },
    {
        img: 'https://checkout.pay.g2a.com/zen_paybyzen.png',
        title: 'ZEN.COM',
        content: 'Pay with ZEN.COM.',
        payTitle: 'Pay with ZEN.COM',
    },
    {
        img: 'https://checkout.pay.g2a.com/zen_btc.png',
        title: 'Bitcoin',
        content: "In the next step, you'll see a QR code. Scan it to pay for your order.",
        payTitle: 'Pay with Bitcoin',
    },
];

const cx = classNames.bind(style);
function Payment() {
    // Redux
    const currentUser = useSelector((state: any) => state.authClientReducer);

    // State
    const [activeItem, setActiveItem] = useState<number>(0);
    const [activeProducts, setActiveProducts] = useState<boolean>(false);
    const [titlePay, setTitlePay] = useState<string>('Pay with G2A Wallet');
    const [api, setApi] = useState<Object[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [products, setProducts] = useState<Object[]>([]);
    const [productsView, setProductsView] = useState<Object[]>([]);

    const navigate = useNavigate();

    const handleItem = (index: number, content: string) => {
        setActiveItem(index);
        setTitlePay(content);
    };

    useEffect(() => {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId !== null) {
            getOrder(currentUserId);
        } else {
            navigate('/');
        }
    }, []);

    const getOrder = async (userId: string) => {
        const api = await axios.get(`${ServerURL}/orders/getOrders?userId=${userId}`);
        setApi(api.data.result);
        setTotalPrice(api.data.result.totalPrice);
        setProducts(api.data.result.products);

        const arr = api.data.result.products.map((item: any) => item.idProduct);

        const arrId: string[] = arr.filter((value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
        });

        const productsUnique = await axios.post(`${ServerURL}/products/findAllById`, {
            arrId: arrId,
        });
        setProductsView(productsUnique.data.result);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div className={cx('header-box')}>
                        <Link to="/page/cart" className={cx('header-back')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="23px"
                                height="23px"
                                fill="currentColor"
                            >
                                <path
                                    fill="none"
                                    strokeMiterlimit="10"
                                    d="M14 16l-4-4 4-4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="#757575"
                                ></path>
                            </svg>
                            <span>Back to</span>
                            <img src="https://www.g2a.com/static/assets/images/logo_g2a_dark.svg" alt="" />
                        </Link>
                        <div className={cx('header-auth')}>
                            <span>Authorized by</span>
                            <img src="https://www.g2a.com/best-deals/static/static/assets/images/zen_logo.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-box')}>
                        <span className={cx('body-header')}>Payment methods</span>
                        <div className={cx('body-section')}>
                            <div className={cx('body-payments')}>
                                <div className={cx('payments-header')}>
                                    <svg
                                        style={{ flexShrink: 0 }}
                                        fill="#29B474"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width={24.4}
                                        height={30}
                                    >
                                        <path d="M17,10 L17,8 C17,5.2 14.8,3 12,3 C9.2,3 7,5.2 7,8 L7,10 L5,10 L5,13 L5,22 L19,22 L19,13 L19,10 L17,10 Z M15.9398627,14 L17,14.4322279 C16.1802718,17.4401256 14.4798508,19 12,19 C9.60871527,19 7.94218103,17.5495556 7.09119341,14.7489566 L7,14.4322279 L8.0601373,14 C8.7303862,16.4594006 10.0099195,17.6331754 12,17.6331754 C13.9071605,17.6331754 15.1617524,16.5551774 15.8529009,14.3007372 L15.9398627,14 Z M12,5 C13.7,5 15,6.3 15,8 L15,10 L9,10 L9,8 C9,6.3 10.3,5 12,5 Z"></path>
                                    </svg>
                                    <span>
                                        All transactions are secured, processed and authorized by external payment
                                        providers
                                    </span>
                                </div>
                                <div className={cx('payments-list')}>
                                    {payments.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className={cx('payments-item', index === activeItem && 'active')}
                                            onClick={() => handleItem(index, item.payTitle)}
                                        >
                                            <div className={cx('payments-box')}>
                                                <div className={cx('item-pay')}>
                                                    <div className={cx('item-btn')}></div>
                                                    <div className={cx('item-img')}>
                                                        <img src={item.img} alt="" />
                                                    </div>
                                                </div>
                                                <div className={cx('item-recommended')}>
                                                    <span>{item.title}</span>
                                                </div>
                                            </div>
                                            <span className={cx('payments-content')}>{item.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('body-pay')}>
                                <div className={cx('pay-products', activeProducts && 'active')}>
                                    <div className={cx('pay-info')}>
                                        <div
                                            onClick={() => setActiveProducts(!activeProducts)}
                                            className={cx('payInfo-name')}
                                        >
                                            <span>
                                                Subtotal ({products.length} item from {products.length} seller)
                                            </span>
                                            <i className={cx(activeProducts && 'active')}></i>
                                        </div>
                                        <div className={cx('payInfo-price')}>
                                            <p>$</p>
                                            <span>{totalPrice}</span>
                                        </div>
                                    </div>
                                    {productsView.map((item: any, index: number) => (
                                        <div key={index} className={cx('product')}>
                                            <span className={cx('product-name')}>{item.name}</span>
                                            <span className={cx('product-quantity')}>
                                                {products.filter((it: any) => it.idProduct === item._id).length}x
                                            </span>
                                            <span className={cx('product-price')}>
                                                <div className={cx('main-price')}>
                                                    <p>$</p>
                                                    <span>{item.discount > 0 ? item.priceDiscount : item.price}</span>
                                                </div>
                                                {item.discount > 0 && (
                                                    <div className={cx('old-price')}>
                                                        <p>$</p>
                                                        <span>{item.price}</span>
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('pay-detail')}>
                                    <div className={cx('payDetail-cost')}>
                                        <span className={cx('payDetail-total')}>Total price</span>
                                        <div className={cx('payDetail-price')}>
                                            <p>$</p>
                                            <span>{totalPrice}</span>
                                        </div>
                                    </div>
                                    <div className={cx('payDetail-btn')}>{titlePay}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
