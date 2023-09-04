import { BottomNavigation, BottomNavigationAction, Box, Container } from '@mui/material';
import './FooterNavigation.css';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const FooterNavigation = () => {
	const navigate = useNavigate();
	return (
		<Container
			className="footerNavigation"
			sx = {
				{
					height: '7vh'
				}
			}
		>
			<BottomNavigation
				showLabels
			>
				<BottomNavigationAction label="Home" icon={<HomeIcon/>} />
				<BottomNavigationAction label="Dashboard" icon={<DashboardIcon/>} />
				<BottomNavigationAction label="Settings" icon={<SettingsIcon/>} />
			</BottomNavigation>
		</Container>
	);
}

export default FooterNavigation;
