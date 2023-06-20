import classNames from 'classnames/bind';
import style from './SecondLayout.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const cx = classNames.bind(style);

interface MyComponentProps {
    children?: React.ReactNode;
}

function SecondLayout({ children }: MyComponentProps): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
                <div className={cx('body')}>
                    <div className={cx('body-inner')}>{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SecondLayout;
