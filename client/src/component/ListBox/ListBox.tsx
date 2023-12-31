import { MenuType } from '../../types/menuItemTypes';
import './ListBox.css';
import { Button, Grid } from '@mui/material';

export interface ListBoxItemProps {
	text: MenuType,
	icon?: any
}

interface ListBoxProps {
	items: ListBoxItemProps[],
	onItemClick?: (e: any) => void
}

const ListBox = ({items, onItemClick}: ListBoxProps) => {
	return (
		<Grid container className="listBoxGrid" spacing={2} columns={{xs: 4, sm: 8, md: 12}}>
			{
				items.map((item: ListBoxItemProps, index: number) => (
					<Grid item key={index} xs={2} sm={4} md={4}>
						<Button
							variant="contained"
							className="iconOnTopButton"
							fullWidth
							color="secondary"
							onClick={() => {
								if (onItemClick) onItemClick(item);
							}}
							startIcon={item?.icon || null}
						>
							{item.text}
						</Button>
					</Grid>
				))
			}
		</Grid>
	);
}

export default ListBox;
