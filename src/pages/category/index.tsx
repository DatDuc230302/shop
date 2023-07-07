import classNames from 'classnames/bind';
import style from './Category.module.scss';
import SearchArea from '../../components/SearchArea';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import queryString from 'query-string';

const cx = classNames.bind(style);
function Category() {
    const params = useParams();
    const location = useLocation();
    const [categoryDefault, setCategoryDefault] = useState('');
    const [priceMaxUrl, setPriceMaxUrl] = useState(0);

    useEffect(() => {
        document.title = 'Buy & Sell Online: PC Games, Software, Gift Cards and More on G2A.COM';
    }, []);

    useEffect(() => {
        if (location.pathname !== undefined) {
            setCategoryDefault(location.pathname.slice(1));
            const queryValues = queryString.parse(location.search);
            const priceMaxUrl = queryValues.priceMax;
            if (priceMaxUrl !== undefined) {
                setPriceMaxUrl(Number(priceMaxUrl));
            }
        }
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchArea category={params.key} categoryDefault={categoryDefault} priceMaxUrl={priceMaxUrl} />
            </div>
        </div>
    );
}

export default Category;
