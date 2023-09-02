import './FormWindow.css';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';

export interface FormWindowItemProps {
	label: string
}

interface FormWindowProps {
	items: FormWindowItemProps[],
	onCancelClick?: (e: any) => void
}

const FormWindow = ({ onCancelClick, items }: FormWindowProps) => {
	return (
		<Container className="container">
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="div">
					Add New Savings
				</Typography>
				{
					items.map((item: FormWindowItemProps, index: number) => (
						<TextField
							label={item.label}
							variant="outlined"
							className="textField"
							fullWidth
							key={index}
						/>
					))
				}
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
