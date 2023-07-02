import classNames from 'classnames/bind';
import style from './Skeleton.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function Skeleton({ quantity = 4 }) {
    const [arr, setArr] = useState<number[]>([]);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        switch (quantity) {
            case 4:
                setArr([1, 2, 3, 4]);
                setWidth(270);
                break;
            case 6:
                setArr([1, 2, 3, 4, 5, 6]);
                setWidth(170);
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('list')}>
                    {arr.map((item: number) => (
                        <div key={item} style={{ width: width }} className={cx('item')}>
                            <div className={cx('img', 'skeleton')}></div>
                            <div className={cx('name', 'skeleton')}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
