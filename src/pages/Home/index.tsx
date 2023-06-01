import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchArea from '../../components/SearchArea';

const cx = classNames.bind(style);
function Home() {
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
            setQuery('');
        }
    }, [params]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>{query.length > 0 && <SearchArea />}</div>
        </div>
    );
}

export default Home;
