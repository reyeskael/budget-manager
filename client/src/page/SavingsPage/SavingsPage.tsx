import { useEffect, useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';
import './SavingsPage.css';
import { Button, Container } from '@mui/material';
import SelectableList, { SelectableListItemProps } from '../../component/SelectableList/SelectableList';
import { footerButton, pageContainer } from '../../utils/cosmeticsHelper';
import { getRequest, postRequest } from '../../utils/apiHelper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectSavings } from '../../action/savingsAction';

const SavingsPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ savingsResponse, setSavingsResponse ] = useState([]);
	const [ computeSavingsTransactionsResponse, setComputeSavingsTransactionsResponse ] = useState([]);
	const [ savings, setSavings ] = useState<SelectableListItemProps[]>([]);
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
			inputType: "number",
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

	useEffect(() => {
		getSavings();
		computeTotalTransactions();
	}, []);

	useEffect(() => {
		setSavings(parseSavings(savingsResponse, computeSavingsTransactionsResponse));
	}, [savingsResponse, computeSavingsTransactionsResponse])

	function parseSavings(savingsData: any[], computeSavingsTransactionsResponse: any[]) {
		return savingsData.map((currentSavingsData) => {
			const computeSavingsTransactions: any = computeSavingsTransactionsResponse.find(item => item._id.savingsId === currentSavingsData._id);
			const parsedCurrentSavings: SelectableListItemProps = 
			{
				...currentSavingsData,
				progressBar: {
					currentValue: computeSavingsTransactions?.totalAmount || 0,
					targetValue: currentSavingsData.amount
				}
			};
			return parsedCurrentSavings;
		});
	}

	async function computeTotalTransactions() {
		try {
			const response = await getRequest("/api/savingsTransaction/computeTotalTransactions");
			setComputeSavingsTransactionsResponse(response);
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	async function getSavings() {
		try {
			const response = await getRequest("/api/savings");
			setSavingsResponse(response);
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	async function addSavings(data: any) {
		try {
			const response = await postRequest("/api/savings", data);
			getSavings();
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	function onAddNewSavingsClick() {
		setIsAddNewSavingsOpen(true);
	}

	function onCloseAddNewSavingsClick() {
		setIsAddNewSavingsOpen(false);
	}

	function onAddNewSavingsSubmit(e: FormWindowSubmitEvent) {
		console.log(e);
		addSavings(e.data);
		setIsAddNewSavingsOpen(false);
	}

	function onSelectSavingsClick(e: any) {
		console.log(e);
		dispatch(selectSavings(e));
		navigate("/savingsDetails");
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<SelectableList onItemSelected={onSelectSavingsClick} items={savings}/>
			{
				isAddNewSavingsOpen ?
				<FormWindow 
					title="Add New Savings"
					items={addNewSavingsFormItems}
					onSubmit={onAddNewSavingsSubmit}
					onCancelClick={onCloseAddNewSavingsClick}
				/> :
				null
			}
			<Button
				sx = {footerButton}
				onClick={onAddNewSavingsClick}
				variant="contained"
				color="secondary"
			>
				New Savings
			</Button>
		</Container>
	);
}

export default SavingsPage;
