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
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg1.avif?alt=media&token=18345c23-a623-4b8d-acb9-9161d91b7cd4"
                                alt=""
                            />
                        </div>
                        <div className={cx('box1-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg2.avif?alt=media&token=08d5f6ec-c685-4376-998a-b5ad9566723c"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={cx('box2')}>
                        <div className={cx('box2-item')}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg3.webp?alt=media&token=088c1b9a-98b6-4355-a4ea-85098270c43e"
                                alt=""
                            />
                        </div>
                    </div>
                    {pc && (
                        <div className={cx('box3')}>
                            <div className={cx('box3-item')}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg4.jpg?alt=media&token=33ecc62f-7e6a-4868-8cee-e627a7e4b700"
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
                                    src="https://firebasestorage.googleapis.com/v0/b/shop-g2a-d5524.appspot.com/o/Posters%2Fimg4.jpg?alt=media&token=33ecc62f-7e6a-4868-8cee-e627a7e4b700"
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
