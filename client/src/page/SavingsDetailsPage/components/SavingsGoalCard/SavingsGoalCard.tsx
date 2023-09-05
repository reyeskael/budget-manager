import { Card, CardContent, Typography } from '@mui/material';
import './SavingsGoalCard.css';
import { savingsDetailsCard } from '../../../../utils/cosmeticsHelper';

export interface SavingsGoalCardProps {
}

const SavingsGoalCard = ({}: SavingsGoalCardProps) => {
	return (
		<Card className="savingsDetailsCard">
			<CardContent sx={savingsDetailsCard}>
				<Typography variant="h5" component="div">
					Test
				</Typography>
			</CardContent>
		</Card>
	);
}

export default SavingsGoalCard;
