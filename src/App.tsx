import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

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
