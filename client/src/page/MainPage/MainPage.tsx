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
import { MenuType } from '../../types/menuItemTypes';
import { pageContainer } from '../../utils/cosmeticsHelper';

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const loginState = useSelector<LoginState>((state) => state);
	const menuButtonList: ListBoxItemProps[] = [
		{ text: MenuType.SAVINGS, icon: <SavingsIcon/> },
		{ text: MenuType.BUDGETING, icon: <PaidIcon/> },
		{ text: MenuType.LOANS, icon: <CreditScoreIcon/> },
		{ text: MenuType.TRANSACTIONS, icon: <ReceiptIcon/> },
		{ text: MenuType.SETTINGS, icon: <SettingsIcon/> }
	];
	console.log(loginState);
	async function testApi() {
		try {
			const response = await getRequest("/api/budgetCategory");
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	function onMenuItemClick({ text }: ListBoxItemProps) {
		testApi();
		switch (text) {
			case MenuType.SAVINGS:
				navigate("/savings");
				break;
		}
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<ListBox items={menuButtonList} onItemClick={onMenuItemClick}/>
		</Container>
	);
}

export default MainPage;
