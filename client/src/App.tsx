import { Provider } from 'react-redux';
import './App.css';
import LoginPage from './page/LoginPage/LoginPage';
import MainPage from './page/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import rootReducer from './reducer/rootReducer';
import { legacy_createStore as createStore } from 'redux';


const store = createStore(rootReducer);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<MainPage/>} />
				<Route path="/login" element={<LoginPage/>} />
			</Routes>
		</Provider>
	);
}

export default App;
