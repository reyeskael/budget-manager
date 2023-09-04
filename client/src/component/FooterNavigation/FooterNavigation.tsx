import { BottomNavigation, BottomNavigationAction, Box, Container } from '@mui/material';
import './FooterNavigation.css';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { SyntheticEvent, useState } from 'react';
import { footerNavigation } from '../../utils/cosmeticsHelper';

interface FooterNavigationProps {
	onChange?: (e: SyntheticEvent, newValue: string) => void
}

const FooterNavigation = ({onChange}: FooterNavigationProps) => {
	const navigate = useNavigate();
	const [value, setValue] = useState('recents');

	const onNavigationChange = (event: SyntheticEvent, newValue: string) => {
	  setValue(newValue);
	  if(onChange) {
		onChange(event, newValue);
	  }
	};
	return (
		<Container
			className="footerNavigation"
			sx = {footerNavigation}
		>
			<BottomNavigation
				showLabels
				value={value}
				onChange={onNavigationChange}
			>
				<BottomNavigationAction
					label="Home"
					value="home"
					icon={<HomeIcon/>}
				/>
				<BottomNavigationAction
					label="Dashboard"
					value="dashboard"
					icon={<DashboardIcon/>}
				/>
				<BottomNavigationAction
					label="Settings"
					value="settings"
					icon={<SettingsIcon/>}
				/>
			</BottomNavigation>
		</Container>
	);
}

export default FooterNavigation;
