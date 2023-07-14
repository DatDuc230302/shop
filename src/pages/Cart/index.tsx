import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import { useEffect, useId, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { emptyCart } from '../../assets/imgs/empty_cart';
import { ServerURL } from '../../connect';
import { useDispatch, useSelector } from 'react-redux';
import cartAction from '../../redux/actions/cartAction';
import HeadLessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { choose } from '../../apiLocal/choose';
import { useMediaQuery } from 'react-responsive';
import RenderCustom from '../../components/RenderCustom';
import Loading, { loadingApi } from '../../components/Loading';

const cx = classNames.bind(style);

function Cart() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState<Object[]>([]);
    const [apiUnique, setApiUnique] = useState<string[]>([]);
    const [apiKeys, setApiKeys] = useState<string[]>([]);
    const [showChange, setShowChange] = useState<boolean>(false);
    const [indexProduct, setIndexProduct] = useState<number>(-1);
    const [tooMany, setTooMany] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [mustLogin, setMustLogin] = useState<boolean>(false);

    // React-Router
    const navigate = useNavigate();

    // Redux
    const dispath = useDispatch();
    const currentUser = useSelector((state: any) => state.authReducer);
    const rerender = useSelector((state: any) => state.cartReducer);

    // Effect
    useEffect(() => {
        getApi();
    }, [rerender, currentUser]);

    // Function
    const getApi = loadingApi(async () => {
        if (currentUser) {
            const idUser = localStorage.getItem('currentUser');
            const apiKeysData = await axios.get(`${ServerURL}/carts/getCarts?idUser=${idUser}`);
            if (apiKeys !== undefined) {
                const keys = apiKeysData.data.result.products.map((item: any, index: number) => item.idProduct);
                const api = await axios.post(`${ServerURL}/products/findAllById`, { arrId: keys });
                const arr = api.data.result;
                // Unique mảng khi có nhiều _id trùng nhau và chỉ lấy 1 _id
                const uniqueArr: string[] = [];
                const uniqueIds: Record<string, boolean> = {};
                arr.forEach((item: any) => {
                    if (!uniqueIds[item._id]) {
                        uniqueIds[item._id] = true;
                        uniqueArr.push(item);
                    }
                });
                setApiKeys(apiKeysData.data.result.products);
                setApi(api.data.result);
                setApiUnique(uniqueArr);
            }
        } else {
            const cartsLocal = localStorage.getItem('cartsLocal');
            const apiKeysData = JSON.parse(`${cartsLocal}`);
            if (apiKeys !== undefined) {
                const keys = apiKeysData.map((item: any, index: number) => item.idProduct);
                const api = await axios.post(`${ServerURL}/products/findAllById`, { arrId: keys });
                const arr = api.data.result;
                const uniqueArr: string[] = [];
                const uniqueIds: Record<string, boolean> = {};
                arr.forEach((item: any) => {
                    if (!uniqueIds[item._id]) {
                        uniqueIds[item._id] = true;
                        uniqueArr.push(item);
                    }
                });
                setApiKeys(apiKeysData);
                setApi(api.data.result);
                setApiUnique(uniqueArr);
            }
        }
    }, setLoading);

    const handleChoose = (id: number) => {
        setIndexProduct(id);
        setShowChange(!showChange);
    };

    const handleChange = async (idProduct: string, quantity: number) => {
        if (currentUser) {
            const idUser = localStorage.getItem('currentUser');
            const retunrKeys = apiKeys
                .filter((item: any) => item.idProduct === idProduct && item)
                .map((item: any) => item.key);
            // Return lại những keys hiện tại trở về products
            await axios.post(`${ServerURL}/products/returnKeys`, {
                idProduct: idProduct,
                returnKeys: retunrKeys,
            });
            // Lấy những keys mới thêm vào carts
            const api = await axios.post(`${ServerURL}/carts/updateChangeProductsCarts`, {
                idUser: idUser,
                idProduct: idProduct,
                quantity: quantity,
            });
            switch (api.data.message) {
                case 'The key is not enough':
                    alert('Keys không đủ');
                    break;
                case 'Cart is full':
                    setTooMany(true);
                    break;
                default:
                    break;
            }
        } else {
            const cartsLocal = localStorage.getItem('cartsLocal');
            let cartArray = cartsLocal ? JSON.parse(cartsLocal) : [];

            // Kiểm tra xem idProduct đã tồn tại trong cartArray hay chưa
            const exists = cartArray.some((item: any) => item.idProduct === idProduct);

            // Nếu idProduct đã tồn tại, xóa các phần tử có idProduct đó
            if (exists) {
                cartArray = cartArray.filter((item: any) => item.idProduct !== idProduct);
            }

            // Thêm idProduct mới vào cartArray dựa trên quantity
            for (let i = 0; i < quantity; i++) {
                const cartItem = { idProduct: idProduct };
                cartArray.unshift(cartItem);
            }

            if (cartArray.length <= 15) {
                const updatedCart = JSON.stringify(cartArray);
                localStorage.setItem('cartsLocal', updatedCart);
            } else {
                setTooMany(true);
            }
        }

        dispath(cartAction());
        setShowChange(false);
    };

    const handleDelete = async (idProduct: string) => {
        if (currentUser) {
            const idUser = localStorage.getItem('currentUser');
            // Khi click vào deleteAll thì sẽ return các keys hiện đang có trong giỏ hàng về lại product
            const retunrKeys = apiKeys
                .filter((item: any) => item.idProduct === idProduct && item)
                .map((item: any) => item.key);
            await axios.post(`${ServerURL}/products/returnKeys`, {
                idProduct: idProduct,
                returnKeys: retunrKeys,
            });
            // Khi click vào deleteAll thì sẽ xóa tất cả các key trong carts
            await axios.post(`${ServerURL}/carts/deleteAllByIdProducts`, {
                idProduct: idProduct,
                idUser: idUser,
            });
        } else {
            const cartsLocal = localStorage.getItem('cartsLocal');
            let cartArray = JSON.parse(`${cartsLocal}`);
            cartArray = cartArray.filter((item: any) => item.idProduct !== idProduct);
            const updatedCart = JSON.stringify(cartArray);
            localStorage.setItem('cartsLocal', updatedCart);
        }
        dispath(cartAction());
    };

    const handleNextPay = async () => {
        if (currentUser) {
            const userId = localStorage.getItem('currentUser');
            const totalPrice = api
                .reduce(
                    (accumulator: any, item: any) =>
                        accumulator + (item.discount > 0 ? item.priceDiscount : item.price),
                    0,
                )
                .toFixed(2);
            const result = await axios.post(`${ServerURL}/orders/addOrders`, {
                userId: userId,
                productsFromCarts: apiKeys,
                totalPrice: totalPrice,
            });

            if (result.data.message === 'successfully') {
                navigate('/payment');
            }
        } else {
            setMustLogin(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {loading ? (
                    <div style={{ minHeight: 790, marginTop: 40 }}>
                        <Loading />
                    </div>
                ) : api.length === 0 ? (
                    <div className={cx('empty')}>
                        <div className={cx('img')}>{emptyCart}</div>
                        <span className={cx('title')}>Your cart is empty</span>
                        <span className={cx('content')}>Go ahead and add some cool stuff to it!</span>
                        <Link to="/category" className={cx('browse')}>
                            Browse deals
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={cx('header', tb && 'tb', mb && 'mb')}>
                            <div className={cx('row')}>
                                <span className={cx('title')}>Your cart</span>
                                <span className={cx('quantity')}>({api.length} products)</span>
                            </div>
                            <div className={cx('warn')}>
                                <svg
                                    style={{ flexShrink: 0 }}
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
                        <div className={cx('body', tb && 'tb', mb && 'mb')}>
                            <div className={cx('box-product')}>
                                {apiUnique.map((item: any, index: any) => (
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
                                            <div className={cx('productItem-detail')}>
                                                <span className={cx('product-name')}>{item.name}</span>
                                                <div className={cx('productItem-last')}>
                                                    <div className={cx('product-tools')}>
                                                        <HeadLessTippy
                                                            interactive
                                                            appendTo={'parent'}
                                                            visible={indexProduct === index && showChange}
                                                            placement="bottom"
                                                            offset={[0, 2]}
                                                            onClickOutside={() => setShowChange(false)}
                                                            render={() => (
                                                                <div className={cx('sub-change')}>
                                                                    {choose.map((it, index) => (
                                                                        <div
                                                                            onClick={() => handleChange(item._id, it)}
                                                                            key={index}
                                                                            className={cx('subChange-item')}
                                                                        >
                                                                            {it}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        >
                                                            <div
                                                                onClick={() => handleChoose(index)}
                                                                className={cx('tools-change', showChange && 'active')}
                                                            >
                                                                {
                                                                    api.filter(
                                                                        (it: any, index: number) => it._id === item._id,
                                                                    ).length
                                                                }
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="22px"
                                                                    height="22px"
                                                                    fill="currentColor"
                                                                    style={{
                                                                        marginLeft: 17,
                                                                        transform: 'translateY(-3px)',
                                                                    }}
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
                                                        </HeadLessTippy>
                                                        <svg
                                                            onClick={() => handleDelete(item._id)}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="13.8px"
                                                            height="13.6px"
                                                            fill="#9b9b9b"
                                                            style={{
                                                                cursor: 'pointer',
                                                                transform: 'translateY(-0.8px)',
                                                            }}
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
                                                                {(
                                                                    (item.discount > 0
                                                                        ? item.priceDiscount
                                                                        : item.price) *
                                                                    api.filter(
                                                                        (it: any, index: number) => it._id === item._id,
                                                                    ).length
                                                                ).toFixed(2)}
                                                            </span>
                                                        </span>
                                                        <span className={cx('vat')}>VAT inc. if applicable</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('footer')}>Buy more from this seller</div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('pay', tb && 'tb', mb && 'mb')}>
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
                                                    fontSize="14px"
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
                                                    fontSize="14px"
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
                                                    fontSize="14px"
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
                                <div className={cx('pay-box2')}>
                                    <div className={cx('payBox2-price')}>
                                        <span className={cx('payBox2-title')}>Total price</span>
                                        <span className={cx('payBox2-dollars')}>
                                            ${' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                {api
                                                    .reduce(
                                                        (accumulator: any, item: any) =>
                                                            accumulator +
                                                            (item.discount > 0 ? item.priceDiscount : item.price),
                                                        0,
                                                    )
                                                    .toFixed(2)}
                                            </span>
                                        </span>
                                    </div>
                                    <div onClick={() => handleNextPay()} className={cx('payBox2-button')}>
                                        Continue to payment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div>{<RenderCustom type={'Csgo'} />}</div>
            </div>
            <div className={cx('login', mustLogin && 'active')}>
                <div className={cx('many-overlay')}></div>
                <div className={cx('many-box', tooMany && 'active')}>
                    <span className={cx('many-header')}>Too many products in the cart</span>
                    <div className={cx('many-info')}>
                        <span>You can add up to:</span>
                        <li>15 products in bundles</li>
                    </div>
                    <span className={cx('many-content')}>
                        Go to the cart and remove something before adding a new product. Or, continue to payment with
                        your cart as it is.
                    </span>
                    <div onClick={() => setTooMany(false)} className={cx('many-btn')}>
                        OK
                    </div>
                </div>
            </div>
            <div className={cx('many', mustLogin && 'active')}>
                <div onClick={() => setMustLogin(false)} className={cx('many-overlay')}></div>
                <div className={cx('many-box', mustLogin && 'active')}>
                    <span style={{ textAlign: 'center' }} className={cx('many-header')}>
                        You have to login to add product to cart!!!
                    </span>
                    <div
                        onClick={() => navigate('/welcome/login')}
                        style={{ width: '100%' }}
                        className={cx('many-btn')}
                    >
                        Login Here
                    </div>
                    <div
                        style={{ width: '100%' }}
                        onClick={() => setMustLogin(false)}
                        className={cx('many-btn', 'disable')}
                    >
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
