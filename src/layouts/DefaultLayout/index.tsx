import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import { useMediaQuery } from 'react-responsive';
import Present from '../../components/Present';
import Footer from '../../components/Footer';

const cx = classNames.bind(style);

interface MyComponentProps {
    children?: React.ReactNode;
}

function DefautlLayout({ children }: MyComponentProps): JSX.Element {
    const pc = useMediaQuery({ minWidth: 992 });

    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const mb = useMediaQuery({ maxWidth: 767 });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    <div className={cx('body-inner')}>{children}</div>
                </div>
                <Present />
                <Footer />
            </div>
        </div>
    );
}

export default DefautlLayout;
