import classNames from 'classnames/bind';
import style from './Category.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchArea from '../../components/SearchArea';

const cx = classNames.bind(style);
function Category() {
    const url = window.location.href;
    const params = useParams();
    let str = url.indexOf('query=');

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (str !== -1) {
            let temp = url.slice(str + 6);
            temp = temp.replace(/%/g, ' ');
            temp = temp.replace(/20/g, '');
            setQuery(temp);
        } else {
            setQuery('Dat');
        }
    }, [params]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchArea />
            </div>
        </div>
    );
}

export default Category;
