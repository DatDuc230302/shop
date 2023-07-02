import classNames from 'classnames/bind';
import style from './RenderNews.module.scss';
import { Link } from 'react-router-dom';

const news1 = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/News%2Fimg1.avif?alt=media&token=da2f705e-1320-45fa-8824-d88633fa1fc0',
        name: 'The Most Popular Games Sold on G2A.COM',
        content:
            'To help you with narrowing down the list of games worth paying attention to, we’ve prepared a list of the most popular games sold on G2A.',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/News%2Fimg2.jpg?alt=media&token=f3f13d24-18a1-4d7d-8a19-49cdc38c6a4b',
        name: 'The Best Selling & Most Popular Software on G2A.COM',
        content:
            'We’ve prepared a list of best-selling software suites on G2A Marketplace. If you need some inspiration, just take a look at what we’ve picked for you.',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/News%2Fimg3.webp?alt=media&token=c8f83372-43ec-49e2-ab64-f3c6176cd3cf',
        name: 'The Elite Games On Steam: The Highest Rated Games Cheaper',
        content:
            "Steam is one of the largest gaming storefronts on the market. Thanks to its large library of titles, it's often the first choice of marketplace for many players…",
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/News%2Fimg4.jpg?alt=media&token=3efc34bc-63e4-42bd-bceb-3571758e88d3',
        name: 'Top 25 Immersive Games | Updated 2022',
        content:
            'Immersion’s become something of a buzzword in recent years, and as a result it lost most of its meaning…',
    },
];

const cx = classNames.bind(style);
function RenderNews() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('header')}>Looking for something else? Get inspired by our articles!</span>
                <div className={cx('products')}>
                    {news1.map((item: any, index: number) => (
                        <Link to={'/anonymus/anonymus'} key={index} className={cx('item')}>
                            <div className={cx('item-img')}>
                                <img src={item.img} alt="" />
                            </div>
                            <span className={cx('item-name')}>{item.name}</span>
                            <span className={cx('item-content')}>{item.content}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RenderNews;
