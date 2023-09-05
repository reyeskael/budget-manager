import './SelectableList.css';
import { IconButton, InputAdornment, LinearProgress, List, ListItem, ListItemText, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { colorPalette, selectableListItem } from '../../utils/cosmeticsHelper';
import apiConfig from "../../config/apiConfig.json";

const { currency } = apiConfig;
interface SelectableListProgressProps {
	currentValue: number,
	targetValue: number
}
export interface SelectableListItemProps {
	[key: string]: any,
	name: string,
	progressBar?: SelectableListProgressProps
}

interface SelectableListProps {
	items?: SelectableListItemProps[],
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

	function renderLinearProgressBar({ currentValue, targetValue }: SelectableListProgressProps) {
		return (
			<div className="selectableListItemContent">
				<ListItemText
					primary={`${currency} ${currentValue.toLocaleString()} / ${currency} ${targetValue.toLocaleString()}`}
					className="selectableListItemProgressText"
				/>
				<LinearProgress
					variant="determinate"
					className="selectableListProgressBar"
					value={(currentValue / targetValue) * 100}
				/>
			</div>
		);
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
				searchedItem?.map((item: SelectableListItemProps, index: number) => (
					<ListItem
						key={index}
						onClick={() => onItemClick(item)}
						sx={selectableListItem}
						className="selectable-list-item-container"
						secondaryAction={
							<IconButton sx={{ color: colorPalette.WHITE }}>
								<ArrowForwardIosIcon/>
							</IconButton>
						}
					>
						<ListItemText
							className="selectableListItemContent"
							primary={item.name}
							primaryTypographyProps={
								{
									fontSize: "1.05rem",
									fontWeight: "bold"
								}
							}
						/>
						{
							item.progressBar ? renderLinearProgressBar(item.progressBar) : null
						}
					</ListItem>
				))
			}
		</List>
	);
}

export default SelectableList;
