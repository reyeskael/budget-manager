import { useState } from 'react';
import './LoginPage.css';
import { Box, Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../utils/apiHelper';
import { useDispatch } from 'react-redux';
import { addLogin } from '../../action/loginAction';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage: React.FC = () => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ isShowPassword, setIsShowPassword ] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleShowPassword = () => {
		setIsShowPassword(!isShowPassword);
	};

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
						type={isShowPassword ? "text" : "password"}
						variant="outlined"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
						InputProps={{
						  endAdornment: (
							<InputAdornment position="end">
							  <IconButton onClick={toggleShowPassword}>
								{isShowPassword ? <VisibilityOff /> : <Visibility />}
							  </IconButton>
							</InputAdornment>
						  ),
						}}
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
