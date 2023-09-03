import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InsightsIcon from '@mui/icons-material/Insights';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import './SideMenu.css';

interface SideMenuProps {
	isOpen?: boolean,
	onToggleDrawer?: (e: any) => void
}

const SideMenu = ({ isOpen, onToggleDrawer }: SideMenuProps) => {
	return (
		<Drawer anchor="left" open={isOpen} onClose={onToggleDrawer}
			PaperProps={{
				sx: {
					width: 300
				}
			}}
		>
			<List>
				<ListItem className="sideMenuHeader">
					<ListItemText primary="Menu" />
				</ListItem>
				<Divider/>
				<ListItem onClick={onToggleDrawer}>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText primary="Profile" />
				</ListItem>
				<ListItem onClick={onToggleDrawer}>
					<ListItemIcon>
						<CategoryIcon />
					</ListItemIcon>
					<ListItemText primary="Budget Categories" />
				</ListItem>
				<ListItem onClick={onToggleDrawer}>
					<ListItemIcon>
						<InsightsIcon />
					</ListItemIcon>
					<ListItemText primary="Insights" />
				</ListItem>
				<ListItem onClick={onToggleDrawer}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem>
			</List>
		</Drawer>
	);
}

export default SideMenu;
