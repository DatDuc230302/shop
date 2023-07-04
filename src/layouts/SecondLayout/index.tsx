import classNames from 'classnames/bind';
import style from './SecondLayout.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

interface MyComponentProps {
    children?: React.ReactNode;
}

function SecondLayout({ children }: MyComponentProps): JSX.Element {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

    const path = window.location.pathname;

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (window.location.pathname === '/plus') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [path]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
                <div className={cx('body', tb && 'tb', mb && 'mb')}>
                    <div className={cx('body-inner')}>{children}</div>
                </div>
                {<Footer theme={theme} />}
            </div>
        </div>
    );
}

export default SecondLayout;
