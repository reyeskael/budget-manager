import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { Container } from '@mui/material';
import { getRequest } from '../../utils/apiHelper';
import ListBox, { ListBoxItemProps } from '../../component/ListBox/ListBox';

import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { LoginState } from '../../reducer/loginReducer';
import { useSelector } from 'react-redux';

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const loginState = useSelector<LoginState>((state) => state);
	const menuButtonList: ListBoxItemProps[] = [
		{ text: "Savings", icon: <SavingsIcon/> },
		{ text: "Budgeting", icon: <PaidIcon/> },
		{ text: "Loans", icon: <CreditScoreIcon/> },
		{ text: "Transactions", icon: <ReceiptIcon/> },
		{ text: "Settings", icon: <SettingsIcon/> }
	];
	console.log(loginState);
	async function testApi() {
		try {
			const response = await getRequest("/api/budgetCategory");
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token.") {
				navigate("/login");
			}
			console.error(error);
		}
	}
	return (
		<Container>
			<h1>Welcome!</h1>
			<ListBox items={menuButtonList} onItemClick={(e) => { testApi(); console.log(e) }}/>
		</Container>
	);
}

export default MainPage;
