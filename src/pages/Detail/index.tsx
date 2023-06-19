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
    const [loadingCart, setLoadingCart] = useState(false);

    // Effect
    useEffect(() => {
        getApi();
        window.scrollTo(0, 0);
    }, [params.key]);

    // Function
    const getApi = loadingApi(async () => {
        const data = await axios.post(`${ServerURL}/products/findAndUpdateViews`, { id: String(params.key) });
        setApi(data.data);
    }, setLoading);

    const addCarts = loadingApi(async (userId: string, item: string) => {
        axios.post(`${ServerURL}/users/addCarts`, { id: userId, item: item });
        dispath(cartAction());
    }, setLoadingCart);

    const handlePickPrice = (bool: boolean) => {
        if (bool) {
            setPickPrice(true);
            setPlus('Add to cart');
        } else {
            setPickPrice(false);
            setPlus('Register Premium Member');
        }
    };

    const handleAddCart = (item: string) => {
        if (currentUser) {
            addCarts(localStorage.getItem('currentUser'), item);
        } else {
            var cartsValue = localStorage.getItem('cartsLocal');
            if (cartsValue === null || typeof cartsValue !== 'string') {
                var cartsArray = [];
            } else {
                cartsArray = JSON.parse(cartsValue);
            }
            cartsArray.push(item);
            dispath(cartAction());
            localStorage.setItem('cartsLocal', JSON.stringify(cartsArray));
        }
        navigate('/page/cart');
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
                    <Loading />
                ) : (
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
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    fill="white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M24 15.571h-5.187l-.823-5.102-3.023 5.065h-.574c-.344-.586-.479-1.436-.479-1.966 0-.407.013-.81.026-1.239.015-.485.031-1.003.031-1.595 0-1.474-.44-2.249-1.608-2.532v-.038c2.469-.341 3.599-1.966 3.599-4.234C15.962.7 13.78 0 10.928 0H3.253L0 15.193h4.076l1.186-5.537H7.98c1.454 0 2.047.7 2.047 2.042 0 .545-.032 1.03-.062 1.484-.027.394-.052.763-.052 1.123 0 .283.057.964.268 1.229l2.947 3.08L10.584 24l5.435-3.193 4.058 3.08-.746-5.083L24 15.571zM9.206 6.822H5.953l.783-3.666H9.76c1.072 0 2.201.283 2.201 1.568.001 1.644-1.282 2.098-2.755 2.098zm3.1 15.325l3.79-2.23 2.986 2.288-.556-3.742 3.1-2.136h-3.445l-.593-3.685-2.182 3.647h-3.463l2.105 2.192-1.742 3.666z"
                                                        fill="#white"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className={cx('description')}>
                                                <div className={cx('title')}>
                                                    <span className={cx('subtitle')}>Platform:</span>
                                                    Rockstar
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
                                                <span style={{ fontWeight: 'bold', color: '#000', marginRight: '3px' }}>
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
                                        <div onClick={() => handleAddCart(item._id)} className={cx('pay-cart')}>
                                            {plus}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Detail;
