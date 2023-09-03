import { useNavigate } from 'react-router-dom';
import SelectableList from '../../component/SelectableList/SelectableList';
import { getRequest } from '../../utils/apiHelper';
import './BudgetCategoryPage.css';
import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';

const BudgetCategoryPage: React.FC = () => {
	const navigate = useNavigate();
	const [ budgetCategories, setBudgetCategories ] = useState([]);

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
	return (
		<Container>
			<SelectableList items={budgetCategories}/>
			<Button
				variant="outlined"
			>
				Add Budget Category
			</Button>
		</Container>
	);
}

export default BudgetCategoryPage;
