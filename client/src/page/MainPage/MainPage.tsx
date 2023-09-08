import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { Container } from '@mui/material';
import ListBox, { ListBoxItemProps } from '../../component/ListBox/ListBox';

import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuType } from '../../types/menuItemTypes';
import { pageContainer } from '../../utils/cosmeticsHelper';

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const menuButtonList: ListBoxItemProps[] = [
		{ text: MenuType.SAVINGS, icon: <SavingsIcon/> },
		{ text: MenuType.BUDGETING, icon: <PaidIcon/> },
		{ text: MenuType.LOANS, icon: <CreditScoreIcon/> },
		{ text: MenuType.TRANSACTIONS, icon: <ReceiptIcon/> },
		{ text: MenuType.SETTINGS, icon: <SettingsIcon/> }
	];

	function onMenuItemClick({ text }: ListBoxItemProps) {
		switch (text) {
			case MenuType.SAVINGS:
				navigate("/savings");
				break;
			case MenuType.BUDGETING:
				navigate("/budgeting");
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
