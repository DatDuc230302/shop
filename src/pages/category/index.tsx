import classNames from 'classnames/bind';
import style from './Category.module.scss';
import SearchArea from '../../components/SearchArea';

const cx = classNames.bind(style);
function Category() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchArea />
            </div>
        </div>
    );
}

export default Category;
