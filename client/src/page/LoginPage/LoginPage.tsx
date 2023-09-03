import { useState } from 'react';
import './LoginPage.css';
import { Box, Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../utils/apiHelper';
import { useDispatch } from 'react-redux';
import { addLogin } from '../../action/loginAction';

const LoginPage: React.FC = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function login() {
		try {
			const response: any = await postRequest("/api/profile/login", { username, password });
			if (response.success) {
				dispatch(addLogin({ username, password }));
				navigate("/");
			}
		} catch (error: any) {
			alert(error.message);
			console.error(error);
		}
	}

	return (
		<Container maxWidth="xs">
			<Box className="loginPage">
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
			</Box>
	  </Container>
	);
}

export default LoginPage;
