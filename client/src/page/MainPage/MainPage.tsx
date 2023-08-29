import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { Button, Container } from '@mui/material';

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	async function testApi() {
		try {
			const response = await fetch('http://localhost:4000/api/budgetCategory',
			{
				method: 'GET',
				credentials: 'include'
			});
			const responseBody = await response.json();
			if (responseBody?.errorDetails) {
				throw new Error(responseBody.errorDetails.message);
			}
			console.log(responseBody);
		} catch (error: any) {
			alert(error.message);
			if (error.message === "Missing token.") {
				navigate("/login");
			}
			console.error(error);
		}
	}
	return (
		<Container maxWidth="xs">
			<h1>Welcome Page</h1>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				onClick={testApi}
			>
				Test API
			</Button>
		</Container>
	);
}

export default MainPage;
