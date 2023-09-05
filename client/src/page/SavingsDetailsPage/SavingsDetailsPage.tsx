import './SavingsDetailsPage.css';
import { Button, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/rootReducer';
import { footerButton, pageContainer } from '../../utils/cosmeticsHelper';
import SavingsDetailsCard from './components/SavingsDetailsCard/SavingsDetailsCard';
import { useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';
import SavingsGoalCard from './components/SavingsGoalCard/SavingsGoalCard';
import TransactionList, { TransactionDirection } from '../../component/TransactionList/TransactionList';

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
			<SavingsGoalCard/>
			<Typography variant="h6" component="div">Savings Transactions</Typography>
			<TransactionList items={
				[
					{
						amount: 2500,
						date: new Date(),
						direction: TransactionDirection.POSITIVE
					},
					{
						amount: 750,
						date: new Date(),
						direction: TransactionDirection.NEGATIVE
					},
					{
						amount: 3000,
						date: new Date(),
						direction: TransactionDirection.POSITIVE
					}
				]
			}/>
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
