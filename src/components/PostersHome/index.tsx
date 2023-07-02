import classNames from 'classnames/bind';
import style from './PostersHome.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(style);
function PostersHome() {
    // State
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', tb && 'tb', mb && 'mb')}>
                <div className={cx('row')}>
                    <div className={cx('box1')}>
                        <div className={cx('box1-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg1.jpg?alt=media&token=581ea9cb-08aa-4ab9-a0d1-554c949e35af"
                                alt=""
                            />
                        </div>
                        <div className={cx('box1-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg2.png?alt=media&token=35d751ea-e03f-49ec-a68c-19efb032161e"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={cx('box2')}>
                        <div className={cx('box2-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg3.png?alt=media&token=9ef6ce53-d6b6-4cbd-a05d-0a7e1dcd212b"
                                alt=""
                            />
                        </div>
                    </div>
                    {pc && (
                        <div className={cx('box3')}>
                            <div className={cx('box3-item')}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg4.avif?alt=media&token=b438e53b-c992-4878-beb3-6d260e103d89"
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                </div>
                {!pc && (
                    <div className={cx('row1')}>
                        <div className={cx('box3')}>
                            <div className={cx('box3-item')}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg4.avif?alt=media&token=b438e53b-c992-4878-beb3-6d260e103d89"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={cx('box3')}>
                            <div className={cx('box3-item')}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg5.avif?alt=media&token=834b41a1-0754-402d-9404-28b67e2b6fa7"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('row')}>
                    {pc && (
                        <div className={cx('box3')}>
                            <div className={cx('box3-item')}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg5.avif?alt=media&token=834b41a1-0754-402d-9404-28b67e2b6fa7"
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                    <div className={cx('box1')}>
                        <div className={cx('box1-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg6.avif?alt=media&token=ec6b8de5-06cf-4e43-bc85-5b1f08cb9c42"
                                alt=""
                            />
                        </div>
                        <div className={cx('box1-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg7.avif?alt=media&token=264d96c0-5065-46dc-968b-d519361a84bb"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={cx('box2')}>
                        <div className={cx('box2-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg8.avif?alt=media&token=5522e031-008a-4175-8f92-03b1edd8a73e"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostersHome;
