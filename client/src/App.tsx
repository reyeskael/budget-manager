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
import BudgetCategoryPage from './page/BudgetCategoryPage/BudgetCategoryPage';
import FooterNavigation from './component/FooterNavigation/FooterNavigation';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './utils/cosmeticsHelper';
import SavingsDetailsPage from './page/SavingsDetailsPage/SavingsDetailsPage';
import BudgetingPage from './page/BudgetingPage/BudgetingPage';

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
			<ThemeProvider theme={customTheme}>
				{isLoginPage ? null : <PageHeader onMenuToggle={onToggleDrawer} title="Welcome!" />}
				<Routes>
					<Route path="/" element={<MainPage/>} />
					<Route path="/login" element={<LoginPage/>} />
					<Route path="/savings" element={<SavingsPage/>} />
					<Route path="/budgetCategory" element={<BudgetCategoryPage/>} />
					<Route path="/savingsDetails" element={<SavingsDetailsPage/>} />
					<Route path="/budgeting" element={<BudgetingPage/>} />
				</Routes>
				{isLoginPage ? null : <FooterNavigation/>}
				<SideMenu isOpen={isOpen} onToggleDrawer={onToggleDrawer} />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
