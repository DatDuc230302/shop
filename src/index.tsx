import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyle';
import { Provider } from 'react-redux';
import store from './redux/index.';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <GlobalStyle>
        <Provider store={store}>
            <App />
        </Provider>
    </GlobalStyle>,
    // </React.StrictMode>
);

reportWebVitals();
