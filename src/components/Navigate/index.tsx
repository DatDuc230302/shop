import classNames from 'classnames/bind';
import style from './Navigate.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { categories } from '../../apiLocal/categories';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Navigate() {
    const [showList, setShowList] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const navigate = useNavigate();

    const handleItem = (slug: string) => {
        navigate(`/category/${slug}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <HeadlessTippy
                    appendTo={'parent'}
                    visible={showList}
                    onClickOutside={() => setShowList(false)}
                    interactive
                    placement="bottom-start"
                    offset={[0, 0]}
                    render={() => (
                        <div className={cx('list')}>
                            {categories.map((item, index) => (
                                <div
                                    onMouseEnter={() => setShowOverlay(true)}
                                    onMouseLeave={() => setShowOverlay(false)}
                                    onClick={() => handleItem(item.slug)}
                                    key={index}
                                    className={cx('list-item')}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    )}
                >
                    <div onClick={() => setShowList(!showList)} className={cx('categories', showList && 'active')}>
                        <svg
                            width={24}
                            height={24}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgba(255,255,255,0.7)"
                        >
                            <path d="M17 8H3V6h14v2zm4-2h-2v2h2V6zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2zm-4 5H3v2h14v-2zm4 0h-2v2h2v-2z"></path>
                        </svg>
                        <span className={cx('categories-title')}>CATEGORIES</span>
                    </div>
                </HeadlessTippy>
                <div className={cx('item')}>Steam Gift Cards</div>
                <div className={cx('item')}>Bestsellers</div>
                <Link to="/editor/1" className={cx('item')}>
                    Random Keys
                </Link>
                <div className={cx('item')}>Software</div>
                <div className={cx('plus')}>Save more with G2A Plus</div>
            </div>
            <div className={cx('overlay', showOverlay && 'show')}></div>
        </div>
    );
}

export default Navigate;
