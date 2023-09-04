import { useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType } from '../../component/FormWindow/FormWindow';
import './SavingsPage.css';
import { Button, Container } from '@mui/material';

const SavingsPage: React.FC = () => {
	const [ isAddNewSavingsOpen, setIsAddNewSavingsOpen ] = useState(false);
	const addNewSavingsFormItems: FormWindowItemProps[] = [
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Name",
			key: "name",
			required: true
		},
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Amount",
			key: "amount",
			required: true
		},
		{
			type: FormWindowItemType.DROPDOWN,
			label: "Frequency",
			key: "frequency",
			required: true,
			options: [
				{
					label: "Daily",
					value: "daily"
				},
				{
					label: "Weekly",
					value: "weekly"
				},
				{
					label: "Monthly",
					value: "monthly"
				}
			]
		},
		{
			type: FormWindowItemType.DATEPICKER,
			label: "Date to finish",
			key: "dateToFinish",
			required: true
		}
	];

	function onAddNewSavingsClick() {
		setIsAddNewSavingsOpen(true);
	}

	function onCloseAddNewSavingsClick() {
		setIsAddNewSavingsOpen(false);
	}

	return (
		<Container>
			<Button
				variant="outlined"
				onClick={onAddNewSavingsClick}
			>
				Add New Savings
			</Button>
			{
				isAddNewSavingsOpen ?
				<FormWindow 
					title="Add New Savings"
					items={addNewSavingsFormItems}
					onCancelClick={onCloseAddNewSavingsClick}
				/> :
				null
			}
		</Container>
	);
}

export default SavingsPage;
