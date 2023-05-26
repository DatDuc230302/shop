import React from 'react';
import './GlobalStyle.module.scss';

interface MyComponentProps {
    children: React.ReactNode;
}

function GlobalStyle({ children }: MyComponentProps): JSX.Element {
    return <>{children}</>;
}

export default GlobalStyle;
