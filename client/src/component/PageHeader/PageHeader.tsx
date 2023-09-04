import './PageHeader.css';
import { Toolbar, Typography, AppBar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postRequest } from '../../utils/apiHelper';

interface PageHeaderProps {
	title: string,
	onMenuToggle?: () => void
}

const PageHeader = ({title, onMenuToggle}: PageHeaderProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isHomePage, setIsHomePage] = useState(false);

	useEffect(() => {
		setIsHomePage(location.pathname === "/");
	}, [location.pathname]);

	function onBackIconClick() {
		if (!isHomePage) {
			navigate("/");
		}
	}

	async function onLogoutClick() {
		await postRequest("/api/profile/logout", {});
		navigate("/login");
	}

	return (
		<AppBar position="static" className='pageHeader' style={{ height: '6vh' }}>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={isHomePage ? onMenuToggle : onBackIconClick}
				>
					{ isHomePage ? <MenuIcon /> : <KeyboardBackspaceIcon /> }
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
				{ isHomePage ? <Button color="inherit" onClick={onLogoutClick}>Logout</Button> : null }
			</Toolbar>
		</AppBar>
	);
}

export default PageHeader;
