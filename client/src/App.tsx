import { Provider } from 'react-redux';
import './App.css';
import LoginPage from './page/LoginPage/LoginPage';
import MainPage from './page/MainPage/MainPage';
import SavingsPage from './page/SavingsPage/SavingsPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import rootReducer from './reducer/rootReducer';
import { legacy_createStore as createStore } from 'redux';
import PageHeader from './component/PageHeader/PageHeader';
import { useEffect, useState } from 'react';
import { getRequest } from './utils/apiHelper';
import SideMenu from './component/SideMenu/SideMenu';


const store = createStore(rootReducer);

const App: React.FC = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';
	const navigate = useNavigate();
	const [ isOpen, setIsOpen ] = useState(false);

	useEffect(() => {
		getRequest("/api/token/verifyToken")
		.then(async (response) => {
			if (response.success) {
				navigate("/");
			}
		}).catch(error => {
			console.error(error);
			navigate("/login");
		});
	}, []);

	function onToggleDrawer() {
		setIsOpen(!isOpen);
	}

	return (
		<Provider store={store}>
			{isLoginPage ? null : <PageHeader onMenuToggle={onToggleDrawer} title="Welcome!" />}
			<Routes>
				<Route path="/" element={<MainPage/>} />
				<Route path="/login" element={<LoginPage/>} />
				<Route path="/savings" element={<SavingsPage/>} />
			</Routes>
			
			<SideMenu isOpen={isOpen} onToggleDrawer={onToggleDrawer} />
		</Provider>
	);
}

export default App;
