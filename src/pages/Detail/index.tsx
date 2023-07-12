import classNames from 'classnames/bind';
import style from './Detail.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { ServerURL } from '../../connect';
import axios from 'axios';
import Loading from '../../components/Loading';
import { loadingApi } from '../../components/Loading';
import cartAction from '../../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../NotFound';

const cx = classNames.bind(style);

function Detail() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // Router-Dom
    const params = useParams();
    const navigate = useNavigate();

    const backUrl = () => {
        window.history.back();
    };

    // Redux
    const dispath = useDispatch();
    const currentUser = useSelector((state: any) => state.authReducer);

    // State
    const [pickPrice, setPickPrice] = useState(true);
    const [api, setApi] = useState([]);
    const [plus, setPlus] = useState('Add to cart');
    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);

    // Effect
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getApi();
    }, [params.key]);

    // Function
    const getApi = loadingApi(async () => {
        const api = await axios.post(`${ServerURL}/products/findIdAndUpdateViews`, { id: String(params.key) });
        if (api.data.length > 0) {
            document.title = `Buy ${api.data[0].name}`;
            setApi(api.data);
            setKeys(api.data[0].keys);
        } else {
            document.title = `Buy Error`;
        }
    }, setLoading);

    const handlePickPrice = (bool: boolean) => {
        if (bool) {
            setPickPrice(true);
            setPlus('Add to cart');
        } else {
            setPickPrice(false);
            setPlus('Register Premium Member');
        }
    };

    const handleAddCart = async (id: string) => {
        if (currentUser) {
            const idUser = localStorage.getItem('currentUser');
            const idProduct = id;
            const api = await axios.post(`${ServerURL}/carts/updateProductsCarts`, {
                idUser: idUser,
                idProduct: idProduct,
            });
            if (api.data.message === 'successfully') {
                dispath(cartAction());
                navigate('/page/cart');
            } else {
            }
        } else {
            const cartsLocal = localStorage.getItem('cartsLocal');
            let cartArray = cartsLocal ? JSON.parse(cartsLocal) : [];
            const cartItem = { idProduct: String(params.key) };
            cartArray.push(cartItem);
            const updatedCart = JSON.stringify(cartArray);
            localStorage.setItem('cartsLocal', updatedCart);
            navigate('/page/cart');
            dispath(cartAction());
        }
    };

    return (
        <div className={cx('wrapper', tb && 'tb', mb && 'mb')}>
            <div className={cx('inner')}>
                <div className={cx('result')}>
                    <div onClick={backUrl} className={cx('result-back')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="12px"
                            height="12px"
                            fill="currentColor"
                            style={{ transform: 'translateY(0.8px)' }}
                        >
                            <path
                                fill="none"
                                strokeMiterlimit="10"
                                d="M14 16l-4-4 4-4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                            ></path>
                        </svg>
                        Search results
                    </div>
                    <div className={cx('result-box')}>
                        <Link to={'/'} className={cx('result-link')}>
                            G2A
                        </Link>
                        <span className={cx('result-character')}> › </span>
                        {api.map((item: any, index: number) => (
                            <div style={{ height: 14.4, display: 'flex', alignItems: 'center' }} key={index}>
                                <span className={cx('result-title')}>
                                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                </span>
                                <div className={cx('result-character')}> › </div>
                            </div>
                        ))}
                        <span className={cx('result-title')}>Search results</span>
                    </div>
                </div>
                <img className={cx('advert')} src={require('./../../assets/imgs/advert.avif')} alt="" />
                {loading ? (
                    <div style={{ marginTop: 100 }}>
                        <Loading />
                    </div>
                ) : api.length > 0 ? (
                    api.map((item: any, index: number) => (
                        <div key={index} className={cx('product', tb && 'tb', mb && 'mb')}>
                            <img src={item.img} className={cx('product-img')} alt="" />
                            <div className={cx('info', tb && 'tb', mb && 'mb')}>
                                <div className={cx('name')}>{item.name}</div>
                                <div className={cx('asset', tb && 'tb', mb && 'mb')}>
                                    <div className={cx('col')}>
                                        <div className={cx('item')}>
                                            <div className={cx('platform')}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    height="24px"
                                                >
                                                    <path
                                                        stroke="#777777"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM9 12H5m2 2v-4 4z"
                                                    ></path>
                                                    <path
                                                        stroke="#777777"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 14a2 2 0 100-4 2 2 0 000 4z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className={cx('description')}>
                                                <div className={cx('title')}>
                                                    <span className={cx('subtitle')}>Platform:</span>
                                                    HMA!
                                                </div>
                                                <span className={cx('check')}>Check activation guide</span>
                                            </div>
                                        </div>
                                        <div className={cx('item')}>
                                            <div className={cx('img')}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    height="24px"
                                                    fill="#777777"
                                                >
                                                    <g
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="#777777"
                                                        fill="none"
                                                        strokeMiterlimit="10"
                                                    >
                                                        <path d="M18 1L9.766 9.234A6.953 6.953 0 008 9a7 7 0 107 7c0-.891-.173-1.74-.476-2.524L17 11V8h3l3-3V1h-5z"></path>
                                                        <circle cx="8" cy="16" r="2"></circle>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className={cx('description')}>
                                                <div className={cx('title')}>
                                                    <span className={cx('subtitle')}>Type:</span>
                                                </div>
                                                <div className={cx('title')}>Key</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col')}>
                                        <div className={cx('item')}>
                                            <div className={cx('img')}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    height="24px"
                                                    fill="#777777"
                                                >
                                                    <g
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="#777777"
                                                        fill="none"
                                                        strokeMiterlimit="10"
                                                    >
                                                        <path d="M6 12l4 4 8-8"></path>
                                                        <circle cx="12" cy="12" r="11"></circle>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className={cx('description')}>
                                                <div className={cx('title')}>
                                                    <span className={cx('subtitle')}>Can activate in:</span>
                                                    Vietnam
                                                </div>
                                                <span className={cx('check')}>Check country restrictions</span>
                                            </div>
                                        </div>
                                        <div className={cx('item')}>
                                            <div className={cx('img')}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    height="24px"
                                                    fill="#777777"
                                                >
                                                    <g
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="#777777"
                                                        fill="none"
                                                        strokeMiterlimit="10"
                                                    >
                                                        <path d="M5.11 3.425L6.722 4.75l1.645 1.756-.404 2.74-2.594 1.312L4 11.726l.667 1.138 1.307 1.4.706 2.473-1.963 1.647-.359 1.528M20.32 4.805l-1.477.838-3 .357-2.284-1.838-.62-1.813L12.127 1M19.007 12.903l-.928 2.098-.954 2.151-1.763 1.641-2.339.15-1.394-1.69.468-2.17-.403-2.143 1.593-1.997 2.227-.782 2.358.564 1.135 2.178z"></path>
                                                        <circle cx="12" cy="12" r="11"></circle>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className={cx('description')}>
                                                <div className={cx('title')}>
                                                    <span className={cx('subtitle')}>Version:</span>
                                                </div>
                                                <div className={cx('title')}>GLOBAl</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className={cx('system')}>
                                    Check system requirements{' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        height="24px"
                                        fill="currentColor"
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
                                </span>
                                <span className={cx('info-description')}>{item.description}</span>
                                <span className={cx('more')}>Read more</span>
                            </div>
                            <div className={cx('contact', tb && 'tb', mb && 'mb')}>
                                <div className={cx('contact-box')}>
                                    <span className={cx('title')}>{item.title.toUpperCase()}</span>
                                    <div className={cx('feedBack')}>
                                        <img
                                            className={cx('img')}
                                            src="https://images.g2a.com/96x96/1x0x0/Kinguin.jpg/0bb109055ad54c60ae907b93"
                                            alt=""
                                        />
                                        <div className={cx('info')}>
                                            <span className={cx('info-name')}>Kinguin</span>
                                            <div className={cx('info-percent')}>
                                                <span
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: '#000',
                                                        marginRight: '3px',
                                                    }}
                                                >
                                                    93%
                                                </span>
                                                Positive feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('pay')}>
                                        <div className={cx('pay-list')}>
                                            <div
                                                onClick={() => handlePickPrice(true)}
                                                className={cx('pay-item', pickPrice && 'active')}
                                            >
                                                <div className={cx('pay-button', pickPrice && 'active')}></div>
                                                <span className={cx('pay-price')}>
                                                    <span>
                                                        $
                                                        <span style={{ fontWeight: 'bold', marginLeft: 8.4 }}>
                                                            {item.discount > 0 ? item.priceDiscount : item.price}
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div
                                                style={{ height: '75.6px' }}
                                                onClick={() => handlePickPrice(false)}
                                                className={cx('pay-item', !pickPrice && 'active')}
                                            >
                                                <div
                                                    style={{ transform: 'translateY(-1px)' }}
                                                    className={cx('pay-button', !pickPrice && 'active')}
                                                ></div>
                                                <div className={cx('pay-price')}>
                                                    <span>
                                                        $
                                                        <span style={{ fontWeight: 'bold', marginLeft: 8.4 }}>
                                                            {(
                                                                (item.discount > 0 ? item.priceDiscount : item.price) -
                                                                0.41
                                                            ).toFixed(2)}
                                                        </span>
                                                    </span>
                                                    <span
                                                        style={{
                                                            transform: 'translateY(-11px)',
                                                            height: '18px',
                                                            fontSize: '1.2rem',
                                                            color: '#6202ea',
                                                        }}
                                                    >
                                                        Save <strong style={{ height: '18px' }}>$ 0.41 </strong>with G2A
                                                        Plus
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => keys.length > 0 && handleAddCart(item._id)}
                                            className={cx('pay-cart', keys.length === 0 && 'disable')}
                                        >
                                            {keys.length === 0 ? 'Sold Out' : plus}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <NotFoundPage />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Detail;
