import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { emptyCart } from '../../assets/imgs/empty_cart';
import { ServerURL } from '../../connect';
import Loading from '../../components/Loading';
import { loadingApi } from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import cartAction from '../../redux/actions/cartAction';
import HeadLessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { choose } from '../../apiLocal/choose';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);

function Cart() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [api, setApi] = useState([]);
    const [showChange, setShowChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [indexProduct, setIndexProduct] = useState(-1);

    // React-Router
    const navigate = useNavigate();

    // Redux
    const dispath = useDispatch();
    const currentUser = useSelector((state: any) => state.authReducer);
    const rerender = useSelector((state: any) => state.cartReducer);

    // Effect
    useEffect(() => {
        getApi();
        window.scrollTo(0, 0);
    }, [rerender, currentUser]);

    let apiUnique = api.filter((obj: any, index: any, self: any) => {
        return index === self.findIndex((item: any) => item._id === obj._id);
    });

    // Function
    const getApi = loadingApi(async () => {
        if (currentUser) {
            const idUser = localStorage.getItem('currentUser');
            const cartsUser = await axios.post(`${ServerURL}/users/queryId?id=${idUser}`);
            const data = await axios.post(`${ServerURL}/products/findAllById`, { arrId: cartsUser.data[0].carts });
            setApi(data.data);
        } else {
            if (localStorage.getItem('cartsLocal') !== null) {
                const arrId = JSON.parse(`${localStorage.getItem('cartsLocal')}`);
                const data = await axios.post(`${ServerURL}/products/findAllById`, { arrId: arrId });
                setApi(data.data);
            }
        }
    }, setLoading);

    const updateCarts = async (newArr: any, item: any) => {
        await axios.post(`${ServerURL}/users/updateCarts`, {
            id: localStorage.getItem('currentUser'),
            newArr: newArr,
            item: item,
        });
        dispath(cartAction());
    };

    const deleteCarts = loadingApi(async (item: any) => {
        await axios.post(`${ServerURL}/users/deleteCarts`, {
            id: localStorage.getItem('currentUser'),
            item: item,
        });
        dispath(cartAction());
    }, setLoading);

    const handleChoose = (id: number) => {
        setIndexProduct(id);
        setShowChange(!showChange);
    };

    const handleChange = (id: any, quantity: number) => {
        if (currentUser) {
            const arr = [];
            for (let i = 0; i < quantity; i++) {
                arr.push(id);
            }
            updateCarts(arr, id);
        } else {
            const arr = JSON.parse(`${localStorage.getItem('cartsLocal')}`);
            const lenArr = arr.filter((item: any) => item === id).length;
            let count = 0;
            const filteredArr = arr.filter((obj: any) => {
                if (obj === id) {
                    count++;
                    return count <= quantity;
                }
                return true;
            });
            if (lenArr >= quantity) {
                localStorage.setItem('cartsLocal', JSON.stringify(filteredArr));
                dispath(cartAction());
            } else {
                for (let i = 0; i < quantity - lenArr; i++) {
                    arr.push(id);
                }
                localStorage.setItem('cartsLocal', JSON.stringify(arr));
                dispath(cartAction());
            }
        }

        setShowChange(false);
    };

    const handleDelete = (id: any) => {
        if (currentUser) {
            deleteCarts(id);
        } else {
            const arr = JSON.parse(`${localStorage.getItem('cartsLocal')}`);
            let count = 0;
            const filteredArr = arr.filter((obj: any) => {
                if (obj === id) {
                    count++;
                    return count <= 0; // Giữ lại tối đa 0 phần tử
                }
                return true;
            });

            localStorage.setItem('cartsLocal', JSON.stringify(filteredArr));
            dispath(cartAction());
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {loading ? (
                    <div style={{ paddingTop: 100 }}>
                        <Loading />
                    </div>
                ) : api.length === 0 ? (
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
                                    <Link to={'/payment'} className={cx('payBox2-button')}>
                                        Continue to payment
                                    </Link>
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
