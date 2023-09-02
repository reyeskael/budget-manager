import { useState } from 'react';
import FormWindow, { FormWindowItemProps } from '../../component/FormWindow/FormWindow';
import './SavingsPage.css';
import { Button, Container } from '@mui/material';

const SavingsPage: React.FC = () => {
	const [ isAddNewSavingsOpen, setIsAddNewSavingsOpen ] = useState(false);
	const addNewSavingsFormItems: FormWindowItemProps[] = [
		{ label: "Name" },
		{ label: "Amount" },
		{ label: "Frequency" },
		{ label: "Date to finish" }
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
			{ isAddNewSavingsOpen ? <FormWindow items={addNewSavingsFormItems} onCancelClick={onCloseAddNewSavingsClick} /> : null }
		</Container>
	);
}

export default SavingsPage;
