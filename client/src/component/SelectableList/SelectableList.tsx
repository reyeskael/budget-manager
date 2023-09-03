import './SelectableList.css';
import { Divider, IconButton, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';

interface SelectableListProps {
	items?: any[]
}

const SelectableList = ({items}: SelectableListProps) => {
	const [ searchText, setSearchText ] = useState("");
	const [ searchedItem, setSearchedItem ] = useState(items || []);

	useEffect(() => {
		const filterItems: any[] = items?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) || [];
		setSearchedItem(filterItems);
	}, [searchText]);

	function onSearchChange(e: any) {
		setSearchText(e.target.value);
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
					<>
						<ListItem
							key={index}
							disableGutters
							secondaryAction={
								<IconButton>
									<ArrowForwardIosIcon/>
								</IconButton>
							}
						>
							<ListItemText primary={item.name} />
						</ListItem>
						<Divider key={`${index}-2`}/>
					</>
				))
			}
		</List>
	);
}

export default SelectableList;
