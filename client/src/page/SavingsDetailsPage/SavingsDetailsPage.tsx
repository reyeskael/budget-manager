import './SavingsDetailsPage.css';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/rootReducer';
import { footerButton, pageContainer } from '../../utils/cosmeticsHelper';
import SavingsDetailsCard from './SavingsDetailsCard/SavingsDetailsCard';
import { useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';

const SavingsDetailsPage = () => {
	const savingsState = useSelector((state: RootState) => state?.savingsReducer);
	const [ isAddNewTransactionOpen, setIsAddNewTransactionOpen ] = useState(false);
	const newTransactionFormItems: FormWindowItemProps[] = [
		{
			type: FormWindowItemType.DROPDOWN,
			label: "Type",
			key: "type",
			required: true,
			options: [
				{
					label: "Savings",
					value: "savings"
				},
				{
					label: "Withdrawal",
					value: "withdrawal"
				}
			]
		},
		{
			type: FormWindowItemType.TEXTFIELD,
			inputType: "number",
			label: "Amount",
			key: "amount",
			required: true
		},
		{
			type: FormWindowItemType.DATEPICKER,
			label: "Date",
			key: "date",
			required: true
		},
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Note",
			key: "note"
		}
	];
	
	function onAddNewTransactionClick(e: any) {
		console.log(e);
		setIsAddNewTransactionOpen(true);
	}

	function onCloseAddNewTransactionClick(e: any) {
		console.log(e);
		setIsAddNewTransactionOpen(false);
	}

	function onAddNewTransactionSubmit(e: FormWindowSubmitEvent) {
		const type = e.data.type?.toString() || "";
		const date = e.data.date?.toString() || "";
		const amount = e.data.amount?.toString() || "";
		console.log(e);
		// addBudgetCategory(name);
		setIsAddNewTransactionOpen(false);
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<SavingsDetailsCard data={savingsState}/>
			{
				isAddNewTransactionOpen ?
				<FormWindow 
					title="Add New Transaction"
					items={newTransactionFormItems}
					onSubmit={onAddNewTransactionSubmit}
					onCancelClick={onCloseAddNewTransactionClick}
				/> :
				null
			}
			<Button
				sx = {footerButton}
				onClick={onAddNewTransactionClick}
				variant="contained"
				color="secondary"
			>
				Add New Transaction
			</Button>
		</Container>
	);
}

export default SavingsDetailsPage;
