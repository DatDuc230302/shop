import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDyQRWXnT2usw-8NILIi_n0Dne709Mq5Mg',
    authDomain: 'shop-g2a-d5524.firebaseapp.com',
    projectId: 'shop-g2a-d5524',
    storageBucket: 'shop-g2a-d5524.appspot.com',
    messagingSenderId: '483378173165',
    appId: '1:483378173165:web:5e0d25b6a093a3173ca8e4',
    measurementId: 'G-4DNJXSB0CQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {routes.map((item, index) => {
                        const Page = item.component;
                        let Layout: any;
                        !!item.layout ? (Layout = item.layout) : (Layout = 'div');
                        return <Route path={item.path} key={index} element={<Layout>{Page}</Layout>} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
