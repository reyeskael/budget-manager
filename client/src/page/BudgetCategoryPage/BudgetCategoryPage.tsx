import { useNavigate } from 'react-router-dom';
import SelectableList, { SelectableListItemProps } from '../../component/SelectableList/SelectableList';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../../utils/apiHelper';
import './BudgetCategoryPage.css';
import { Button, Container, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import FormWindow, { FormWindowItemProps, FormWindowItemType, FormWindowSubmitEvent } from '../../component/FormWindow/FormWindow';
import ConfirmationBox from '../../component/ConfirmationBox/ConfirmationBox';
import { footerButton, pageContainer } from '../../utils/cosmeticsHelper';

const BudgetCategoryPage: React.FC = () => {
	const navigate = useNavigate();
	const [ budgetCategories, setBudgetCategories ] = useState<SelectableListItemProps[]>([]);
	const [ isAddNewBudgetCategoryOpen, setIsAddNewBudgetCategoryOpen ] = useState(false);
	const [ isEditBudgetCategoryOpen, setIsEditBudgetCategoryOpen ] = useState(false);
	const [ isDeleteConfirmationOpen, setIsDeleteConfirmationOpen ] = useState(false);
	const [ selectedBudgetCategory, setSelectedBudgetCategory ] = useState<any | null>(null);
	const newBudgetCategoryFormItems: FormWindowItemProps[] = [
		{
			type: FormWindowItemType.TEXTFIELD,
			label: "Name",
			key: "name",
			required: true
		}
	];

	useEffect(() => {
		getBudgetCategory();
	}, []);
	
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

	async function addBudgetCategory(name: string) {
		try {
			const response = await postRequest("/api/budgetCategory", { name });
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

	async function editBudgetCategory(_id: string, name: string) {
		try {
			const response = await patchRequest("/api/budgetCategory", _id, { name });
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

	async function deleteBudgetCategory(_id: string) {
		try {
			const response = await deleteRequest("/api/budgetCategory", _id);
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
		const name = e.data.name?.toString() || "";

		addBudgetCategory(name);
		setIsAddNewBudgetCategoryOpen(false);
	}

	function onEditBudgetCategoryClick(e: any) {
		setIsEditBudgetCategoryOpen(true);
		setSelectedBudgetCategory(e);
	}

	function onDeleteEditBudgetCategoryClick(e: any) {
		console.log(e);
		setIsDeleteConfirmationOpen(true);
	}

	function onCloseEditBudgetCategoryClick() {
		setIsEditBudgetCategoryOpen(false);
	}

	function onEditBudgetCategorySubmit(e: FormWindowSubmitEvent) {
		const _id = e.data._id?.toString() || "";
		const name = e.data.name?.toString() || "";

		editBudgetCategory(_id, name);
		setIsEditBudgetCategoryOpen(false);
	}

	function onActionClick(e: any) {
		console.log(e);
		switch(e.value) {
			case "no":
				setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen);
				break;
			case "yes":
				const _id: string = selectedBudgetCategory._id;
				deleteBudgetCategory(_id);
				setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen);
				setIsEditBudgetCategoryOpen(false);

		}
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<SelectableList onItemSelected={onEditBudgetCategoryClick} items={budgetCategories}/>
			{
				isAddNewBudgetCategoryOpen ?
				<FormWindow
					title="Add New Budget Category"
					items={newBudgetCategoryFormItems}
					onSubmit={onAddNewBudgetCategorySubmit}
					onCancelClick={onCloseAddNewBudgetCategoryClick}
				/> :
				null
			}
			{
				isEditBudgetCategoryOpen ?
				<FormWindow 
					title="Edit Budget Category"
					edit={true}
					editValue={selectedBudgetCategory}
					items={newBudgetCategoryFormItems}
					onSubmit={onEditBudgetCategorySubmit}
					onDeleteClick={onDeleteEditBudgetCategoryClick}
					onCancelClick={onCloseEditBudgetCategoryClick}
				/> :
				null
			}
			<ConfirmationBox
				open={isDeleteConfirmationOpen}
				title="Budget Category"
				text="Are you sure you want to delete this data?"
				onActionClick={onActionClick}
			/>
			<Button
				sx = {footerButton}
				onClick={onAddNewBudgetCategoryClick}
				variant="contained"
				color="secondary"
			>
				Add Budget Category
			</Button>
		</Container>
	);
}

export default BudgetCategoryPage;
