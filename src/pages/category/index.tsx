import classNames from 'classnames/bind';
import style from './Category.module.scss';
import SearchArea from '../../components/SearchArea';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
function Category() {
    const params = useParams();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchArea category={params.key} />
            </div>
        </div>
    );
}

export default Category;
