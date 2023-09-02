import './FormWindow.css';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';

interface FormWindowProps {
	onCancelClick?: (e: any) => void
}

const FormWindow = ({ onCancelClick }: FormWindowProps) => {
	return (
		<Container className="container">
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="div">
					Add New Savings
				</Typography>
				<TextField
					label="Name"
					variant="outlined"
					className="textField"
					fullWidth
				/>
				<TextField
					label="Email"
					variant="outlined"
					className="textField"
					fullWidth
				/>
				<Button
					type="submit"
					variant="contained"
					className="button"
					color="primary"
				>
					Save
				</Button>
				<Button
					variant="contained"
					className="button"
					onClick={onCancelClick}
				>
					Cancel
				</Button>
			</Paper>
		</Container>
	);
}

export default FormWindow;
