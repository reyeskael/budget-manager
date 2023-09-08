import './SavingsDetailsPage.css';
import { Button, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/rootReducer';
import { footerButton, pageContainer } from '../../utils/cosmeticsHelper';
import SavingsDetailsCard from './components/SavingsDetailsCard/SavingsDetailsCard';
import { useEffect, useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';
import SavingsGoalCard from './components/SavingsGoalCard/SavingsGoalCard';
import TransactionList, { TransactionDirection } from '../../component/TransactionList/TransactionList';
import { getRequest, postRequest } from '../../utils/apiHelper';
import { useNavigate } from 'react-router-dom';

const SavingsDetailsPage = () => {
	const navigate = useNavigate();
	const savingsState = useSelector((state: RootState) => state?.savingsReducer);
	const [ isAddNewTransactionOpen, setIsAddNewTransactionOpen ] = useState(false);
	const [ savingsTransactions, setSavingsTransactions ] = useState<any[]>([]);
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

	useEffect(() => {
		getSavingsTransaction();
	}, []);

	function parseSavingsTransaction(savingsTransactionData: any[]) {
		return savingsTransactionData.map((currentSavingsTransactionData: any) => {
			const parsedCurrentSavingsTransactionData = 
			{
				...currentSavingsTransactionData,
				direction: currentSavingsTransactionData.type === "savings" ? TransactionDirection.POSITIVE : TransactionDirection.NEGATIVE
			};
			return parsedCurrentSavingsTransactionData;
		});
	}

	async function getSavingsTransaction() {
		try {
			const response = await getRequest("/api/savingsTransaction", `/${savingsState._id}`);
			setSavingsTransactions(parseSavingsTransaction(response));
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	async function addSavingsTransaction(data: any) {
		try {
			const response = await postRequest("/api/savingsTransaction", data);
			getSavingsTransaction();
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}
	
	function onAddNewTransactionClick(e: any) {
		console.log(e);
		setIsAddNewTransactionOpen(true);
	}

	function onCloseAddNewTransactionClick(e: any) {
		console.log(e);
		setIsAddNewTransactionOpen(false);
	}

	function onAddNewTransactionSubmit(e: FormWindowSubmitEvent) {
		console.log(e);
		addSavingsTransaction({
			...e.data,
			savingsId: savingsState._id
		});
		setIsAddNewTransactionOpen(false);
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<SavingsDetailsCard data={savingsState}/>
			<SavingsGoalCard data={savingsState}/>
			<Typography variant="h6" component="div">Savings Transactions</Typography>
			<TransactionList items={savingsTransactions}/>
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
				New Transaction
			</Button>
		</Container>
	);
}

export default SavingsDetailsPage;
