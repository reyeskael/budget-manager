import { Card, CardContent, Typography } from '@mui/material';
import './SavingsGoalCard.css';
import { savingsDetailsCard } from '../../../../utils/cosmeticsHelper';
import TollIcon from '@mui/icons-material/Toll';
import { SavingsState } from '../../../../reducer/savingsReducer';
import { dateDifference } from '../../../../utils/helper';
import apiConfig from "../../../../config/apiConfig.json";

const { currency } = apiConfig;

export interface SavingsGoalCardProps {
	data: SavingsState
}

const SavingsGoalCard = ({data}: SavingsGoalCardProps) => {
	console.log(data);

	function computeAmountNeededBaseOnFrequency() {
		const { frequency, dateToFinish, progressBar } = data;
		if (dateToFinish && frequency && progressBar) {
			const { currentValue, targetValue } = progressBar;
	
			const remainingAmount = targetValue - currentValue;
	
			const amountDivisor = dateDifference(frequency, new Date(dateToFinish), new Date()) ?? 0;

			const amountNeeded = remainingAmount / amountDivisor;

			return amountNeeded.toLocaleString();
		}
		return null;
	}

	return (
		<Card className="savingsDetailsCard">
			<CardContent
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start"
				}}
				sx={savingsDetailsCard}
			>
				<div>
					<Typography variant="h6" component="div">
						Save atleast
					</Typography>
					<Typography variant="h3">
						{`${currency} ${computeAmountNeededBaseOnFrequency()}`}
					</Typography>
					<Typography variant="h6">
						{` /${data.frequency} to reach ${currency} ${data?.progressBar ? data?.progressBar.targetValue.toLocaleString() : 0.00}`}
					</Typography>
				</div>
				<TollIcon style={{height: "60px", width: "60px"}}/>
			</CardContent>
		</Card>
	);
}

export default SavingsGoalCard;
