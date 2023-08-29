import './App.css';
import LoginPage from './page/LoginPage/LoginPage';
import MainPage from './page/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage/>} />
			<Route path="/login" element={<LoginPage/>} />
		</Routes>
	);
}

export default App;
