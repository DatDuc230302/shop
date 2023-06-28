import classNames from 'classnames/bind';
import style from './Loading.module.scss';

const cx = classNames.bind(style);

export const loadingApi = (apiFunction: any, setLoading: any) => {
    return async (...args: any) => {
        setLoading(true);
        try {
            const response = await apiFunction(...args);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };
};

function Loading({ size = '6rem' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div style={{ width: `${size}`, height: `${size}` }} className={cx('loading')}></div>
            </div>
        </div>
    );
}

export default Loading;
