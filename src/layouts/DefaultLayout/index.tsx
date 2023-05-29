import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../../components/Header';

const cx = classNames.bind(style);

interface MyComponentProps {
    children?: React.ReactNode;
}

function DefautlLayout({ children }: MyComponentProps): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
                {children}
            </div>
        </div>
    );
}

export default DefautlLayout;
