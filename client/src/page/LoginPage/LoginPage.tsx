import { useState } from 'react';
import './LoginPage.css';
import { Button, Container, TextField } from '@mui/material';

const LoginPage: React.FC = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	async function login() {
		try {
			const response = await fetch('http://localhost:4000/api/profile/login',
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					username,
					password
				}),
				headers: {
				   'Content-type': 'application/json; charset=UTF-8',
				},
			});
			const responseBody = await response.json();
			if (responseBody?.error) {
				throw new Error(responseBody.error);
			}
			console.log(responseBody);
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