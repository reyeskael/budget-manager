import { Box, Tab, Tabs } from '@mui/material';
import './TabMenu.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { SyntheticEvent, useState } from 'react';

export interface TabMenuItemProps {
	label: string,
	element: React.FC
}

export interface TabMenuProps {
	items: TabMenuItemProps[]
}

const defaultValue = "1";

const TabMenu = ({ items }: TabMenuProps) => {
	const [ value, setValue ] = useState(defaultValue);

	const onSelectedTabChange = (event: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	
	return (
		<Box
			sx={
				{
					width: '100%',
					typography: 'body1'
				}
			}
		>
			<TabContext
				value={value}
			>
				<Box
					sx={
						{
							borderBottom: 1,
							borderColor: 'divider'
						}
					}
				>
					<TabList
						onChange={onSelectedTabChange}
						sx={
							{
								display: "flex",
								justifyContent: "space-between",
								width: "100%"
							}
						}
					>
						{
							items.map((item: TabMenuItemProps, index: number) => (
								<Tab label={item.label} value={index.toString()} key={index}/>
							))
						}
					</TabList>
				</Box>
				{
					items.map((item: TabMenuItemProps, index: number) => (
						<TabPanel
							value={index.toString()}
							key={index}
							sx={{ padding: "0px" }}
						>
							{ item.element({}) }
						</TabPanel>
					))
				}
			</TabContext>
		</Box>
	);
}

export default TabMenu;
