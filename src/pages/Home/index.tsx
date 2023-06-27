import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchArea from '../../components/SearchArea';
import { useMediaQuery } from 'react-responsive';
import PostersHome from '../../components/PostersHome';
import RenderProducts from '../../components/RenderProducts';
import queryString from 'query-string';

const posters = [
    require('./../../assets/imgs/poster1.avif'),
    require('./../../assets/imgs/poster2.avif'),
    require('./../../assets/imgs/poster3.avif'),
];

const posters1 = [
    require('./../../assets/imgs/Posters1/img1.avif'),
    require('./../../assets/imgs/Posters1/img2.jpg'),
    require('./../../assets/imgs/Posters1/img3.webp'),
];

const cx = classNames.bind(style);
function Home() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    // State
    const [query, setQuery] = useState('');
    const [viewAdmin, setViewAdmin] = useState(false);

    //
    const params = useParams();
    const location = useLocation();

    //
    useEffect(() => {
        document.title = 'G2A Store';
        setViewAdmin(true);
        setTimeout(() => {
            setViewAdmin(false);
        }, 4000);
    }, []);

    //

    // Effect
    useEffect(() => {
        const queryParams = queryString.parse(location.search);

        // Find query in URL after query=
        if (queryParams.query !== undefined) {
            setQuery(String(queryParams.query));
        } else {
            setQuery('');
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {query.length > 0 ? (
                    <SearchArea />
                ) : (
                    <div className={cx('body', tb && 'tb', mb && 'mb')}>
                        <div className={cx('posters')}>
                            {posters.map((item, index) => (
                                <div key={index} className={cx('poster-img')}>
                                    <img className={cx('img')} src={item} alt="" />
                                    <div className={cx('poster-buy')}>Buy cheaper</div>
                                </div>
                            ))}
                        </div>
                        <PostersHome />
                        <RenderProducts type={'trending'} />
                        <div className={cx('posters1')}>
                            {posters1.map((item, index) => (
                                <div key={index} className={cx('poster1-item')}>
                                    <img src={item} alt="" />
                                    <div className={cx('poster1-more')}>Show more</div>
                                </div>
                            ))}
                        </div>
                        <RenderProducts type={'bestSell'} />
                        <img
                            className={cx('advert-img')}
                            src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Advert%2Fad1.avif?alt=media&token=2f647f93-3287-42f2-ad19-0d80b0a4ce1f"
                            alt=""
                        />
                        <RenderProducts type={'giftcard'} />
                        <img
                            className={cx('advert-img')}
                            src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Advert%2Fad2.avif?alt=media&token=fd96562b-4ba8-437a-aebb-29e6538063ca"
                            alt=""
                        />
                        <RenderProducts type={'bestSoftware'} />
                        <br></br>
                        <RenderProducts type={'cheap'} />
                        <RenderProducts type={'other'} />
                    </div>
                )}
                {params.key !== 'search' && (
                    <div className={cx('tag', pc && 'pc', tb && 'tb', mb && 'mb')}>
                        <img src={require('./../../assets/imgs/tagAd2.webp')} alt="" />
                        {pc && 'Join G2A Plus and save more!'}
                    </div>
                )}
            </div>
            <Link to={'/admin/login'} className={cx('move-admin', viewAdmin && 'active')}>
                Are you admin?
            </Link>
        </div>
    );
}

export default Home;
