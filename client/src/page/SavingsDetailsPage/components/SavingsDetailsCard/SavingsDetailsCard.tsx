import { Card, CardContent, LinearProgress, Typography } from '@mui/material';
import './SavingsDetailsCard.css';
import { savingsDetailsCard } from '../../../../utils/cosmeticsHelper';
import { SavingsFrequency } from '../../../../types/savingsType';
import { SavingsState } from '../../../../reducer/savingsReducer';
import apiConfig from "../../../../config/apiConfig.json";
import { formatDate } from '../../../../utils/helper';

const { currency } = apiConfig;

export interface SavingsDetailsCardProps {
	data: SavingsState
}

const SavingsDetailsCard = ({ data }: SavingsDetailsCardProps) => {
	const currentAmount: number = data?.progressBar?.currentValue || 0;
	const targetAmount: number = data?.progressBar?.targetValue || 0;
	const dateToFinish: string = data.dateToFinish?.toString() || "";
	const frequency: string = data.frequency?.toString() || "";

	function renderProgressBar() {
		return (
			<div>
				<LinearProgress
					variant="determinate"
					value={(currentAmount / targetAmount) * 100}
					style={
						{
							borderRadius: "5px"
						}
					}
				/>
				<div className="progressText">
					<Typography variant="body1">
						{`${currency} ${currentAmount.toLocaleString()}`}
					</Typography>
					<Typography variant="body1">
						{`${currency} ${targetAmount.toLocaleString()}`}
					</Typography>
				</div>
			</div>
		);
	}

	return (
		<Card className="savingsDetailsCard">
			<CardContent sx={savingsDetailsCard}>
				<Typography variant="h5" component="div">
					{data.name}
				</Typography>
				{ renderProgressBar() }
				<Typography variant="body1">
					{`Finished by: ${formatDate(dateToFinish)}`}
				</Typography>
				<Typography variant="body1">
					{`Frequency: ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}`}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default SavingsDetailsCard;
