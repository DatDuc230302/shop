import classNames from 'classnames/bind';
import style from './Category.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
function Category() {
    const url = window.location.href;
    const params = useParams();
    let str = url.indexOf('=');

    const [query, setQuery] = useState('');

    useEffect(() => {
        let temp = url.slice(str + 1);
        temp = temp.replace(/%/g, ' ');
        temp = temp.replace(/20/g, '');
        setQuery(temp);
    }, [params]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>{query}</div>
        </div>
    );
}

export default Category;
