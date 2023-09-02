import { Provider } from 'react-redux';
import './App.css';
import LoginPage from './page/LoginPage/LoginPage';
import MainPage from './page/MainPage/MainPage';
import SavingsPage from './page/SavingsPage/SavingsPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import rootReducer from './reducer/rootReducer';
import { legacy_createStore as createStore } from 'redux';
import PageHeader from './component/PageHeader/PageHeader';


const store = createStore(rootReducer);

const App: React.FC = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';

	return (
		<Provider store={store}>
			{isLoginPage ? null : <PageHeader title="Welcome!" />}
			<Routes>
				<Route path="/" element={<MainPage/>} />
				<Route path="/login" element={<LoginPage/>} />
				<Route path="/savings" element={<SavingsPage/>} />
			</Routes>
		</Provider>
	);
}

export default App;
