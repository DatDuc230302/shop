import classNames from 'classnames/bind';
import style from './Present.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);

const presents = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fimg1.webp?alt=media&token=ae7b3672-be15-46ec-997e-1d9bd8a4ca21',
        title: 'Get bonus discounts and a free game each month!',
        btn: 'Unlock membership',
        poster: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fps1.webp?alt=media&token=8da3394a-959e-4bb4-9058-719b0ad60fb1',
        active: false,
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fimg2.webp?alt=media&token=5c1a0807-72b6-4c3a-948a-91d9f56299f9',
        title: "Pop some cases open and see what you'll end up with. Get cool games for cheap!",
        btn: 'Go to G2A Loot',
        poster: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fps2.png?alt=media&token=6eaf9dfe-c2bb-47e9-b5b0-ba0370427f66',
        active: true,
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fimg3.webp?alt=media&token=d34e3104-5590-43a8-8654-3acd47973ee1',
        title: 'Share links to marketplace products to make extra money in a fast and easy way!',
        btn: 'Start earning now',
        poster: 'https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Footer%2Fps3.png?alt=media&token=ef478a9a-d0ab-4079-a9b7-7f21276aecd2',
        active: true,
    },
];

function Present() {
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('present')}>
                    <div className={cx('present-box', tb && 'tb', mb && 'mb')}>
                        {presents.map((item, index) => (
                            <div key={index} className={cx('present-item', item.active && 'active')}>
                                <div className={cx('present-img')}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className={cx('present-detail')}>
                                    <div className={cx('present-info')}>
                                        <span className={cx('present-title')}>{item.title}</span>
                                        <div className={cx('present-btn')}>{item.btn}</div>
                                    </div>
                                    <div className={cx('present-poster')}>
                                        <img src={item.poster} alt="" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Present;
