import { useState } from 'react';
import FormWindow from '../../component/FormWindow/FormWindow';
import './SavingsPage.css';
import { Button, Container } from '@mui/material';

const SavingsPage: React.FC = () => {
	const [ isAddNewSavingsOpen, setIsAddNewSavingsOpen ] = useState(false);

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
			{ isAddNewSavingsOpen ? <FormWindow onCancelClick={onCloseAddNewSavingsClick} /> : null }
		</Container>
	);
}

export default SavingsPage;
