import { useNavigate } from 'react-router-dom';
import SelectableList from '../../component/SelectableList/SelectableList';
import { getRequest, postRequest } from '../../utils/apiHelper';
import './BudgetCategoryPage.css';
import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';

const BudgetCategoryPage: React.FC = () => {
	const navigate = useNavigate();
	const [ budgetCategories, setBudgetCategories ] = useState([]);
	const [ isAddNewBudgetCategoryOpen, setIsAddNewBudgetCategoryOpen ] = useState(false);
	const addNewBudgetCategoryFormItems: FormWindowItemProps[] = [
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Name",
			required: true
		},
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Code",
			required: true
		}
	];

	useEffect(() => {
		getBudgetCategory();
	}, [])
	
	async function getBudgetCategory() {
		try {
			const response = await getRequest("/api/budgetCategory");
			setBudgetCategories(response);
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	async function addBudgetCategory(name: string, code: string) {
		try {
			const response = await postRequest("/api/budgetCategory", { name, code });
			getBudgetCategory();
			console.log(response);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token." || error.message === "Token is expired.") {
				navigate("/login");
			}
			console.error(error);
		}
	}

	function onAddNewBudgetCategoryClick() {
		setIsAddNewBudgetCategoryOpen(true);
	}

	function onCloseAddNewBudgetCategoryClick() {
		setIsAddNewBudgetCategoryOpen(false);
	}

	function onAddNewBudgetCategorySubmit(e: FormWindowSubmitEvent) {
		console.log(e);
		const name = e.data.Name.value?.toString() || "";
		const code = e.data.Code.value?.toString() || "";

		addBudgetCategory(name, code);
		setIsAddNewBudgetCategoryOpen(false);
	}

	return (
		<Container>
			<SelectableList items={budgetCategories}/>
			<Button
				variant="outlined"
				onClick={onAddNewBudgetCategoryClick}
			>
				Add Budget Category
			</Button>
			{ isAddNewBudgetCategoryOpen ? <FormWindow items={addNewBudgetCategoryFormItems} onSubmit={onAddNewBudgetCategorySubmit} onCancelClick={onCloseAddNewBudgetCategoryClick} /> : null }
		</Container>
	);
}

export default BudgetCategoryPage;
