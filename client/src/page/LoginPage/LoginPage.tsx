import { useEffect, useState } from 'react';
import './LoginPage.css';
import { Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../utils/apiHelper';

const LoginPage: React.FC = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		getRequest("/api/token/verifyToken")
		.then(async (response) => {
			if (response.success) {
				navigate("/");
			}
		}).catch(error => {
			console.error(error);
		});
	}, []);

	async function login() {
		try {
			const response: any = await postRequest("/api/profile/login", { username, password });
			if (response.success) {
				navigate("/");
			}
		} catch (error: any) {
			alert(error.message);
			console.error(error);
		}
	}

	return (
		<Container maxWidth="xs">
			<form>
				<TextField
					label="Username"
					variant="outlined"
					fullWidth
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					margin="normal"
				/>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={login}
				>
					Login
				</Button>
			</form>
	  </Container>
	);
}

export default LoginPage;
