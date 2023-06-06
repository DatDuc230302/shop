import classNames from 'classnames/bind';
import style from './SecondLayout.module.scss';

const cx = classNames.bind(style);

interface MyComponentProps {
    children?: React.ReactNode;
}

function SecondLayout({ children }: MyComponentProps): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>{children}</div>
        </div>
    );
}

export default SecondLayout;
