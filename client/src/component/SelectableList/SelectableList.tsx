import './SelectableList.css';
import { Divider, IconButton, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { selectableListItem } from '../../utils/cosmeticsHelper';

interface SelectableListProps {
	items?: any[],
	onItemSelected?: (e: any) => void
}

const SelectableList = ({items, onItemSelected}: SelectableListProps) => {
	const [ searchedItem, setSearchedItem ] = useState(items || []);
	const [ searchText, setSearchText ] = useState("");

	useEffect(() => {
		setSearchedItem(items || []);
	}, [items]);

	useEffect(() => {
		const filterItems: any[] = items?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) || [];
		setSearchedItem(filterItems);
	}, [searchText]);

	function onSearchChange(e: any) {
		setSearchText(e.target.value);
	}

	function onItemClick(e: any) {
		if (onItemSelected) {
			onItemSelected(e);
		}
	}

	return (
		<List>
			<ListItem>
				<TextField
					label="Search"
					variant="outlined"
					fullWidth
					value={searchText}
					onChange={onSearchChange}
					InputProps={{
						startAdornment: (
						  <InputAdornment position="start">
							<SearchIcon />
						  </InputAdornment>
						),
					  }}
				/>
			</ListItem>
			{
				searchedItem?.map((item: any, index: number) => (
					<ListItem
						key={index}
						disableGutters
						onClick={() => onItemClick(item)}
						sx={selectableListItem}
						secondaryAction={
							<IconButton sx={{color:"#FFFFFF"}}>
								<ArrowForwardIosIcon/>
							</IconButton>
						}
					>
						<ListItemText primary={item.name} />
					</ListItem>
				))
			}
		</List>
	);
}

export default SelectableList;
