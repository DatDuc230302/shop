import classNames from 'classnames/bind';
import style from './Category.module.scss';
import SearchArea from '../../components/SearchArea';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function Category() {
    const params = useParams();

    const location = useLocation();

    const [categoryDefault, setCategoryDefault] = useState('');

    useEffect(() => {
        if (location.pathname !== undefined) {
            setCategoryDefault(location.pathname.slice(1));
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchArea category={params.key} categoryDefault={categoryDefault} />
            </div>
        </div>
    );
}

export default Category;
