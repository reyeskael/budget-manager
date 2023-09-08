import './BudgetingSummaryCard.css';
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { customCard } from '../../../../utils/cosmeticsHelper';
import PieGraph from '../../../../component/PieGraph/PieGraph';

export interface BudgetingSummaryCardProps {
	data: any
}

const BudgetingSummaryCard = ({ data }: BudgetingSummaryCardProps) => {
	return (
		<Card className="customCard">
			<CardContent
				sx={customCard}
			>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center' }}
				>
					<Button color="inherit">
						<ArrowBackIosIcon/>
					</Button>
					<Typography variant="subtitle1">August 1 - 30</Typography>
					<Button color="inherit">
						<ArrowForwardIosIcon/>
					</Button>
				</div>
				<Divider/>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center' }}
				>
					<div>
						<Typography variant="subtitle2">Total Budget:</Typography>
						<Typography variant="h6">PHP 70,000.00</Typography>
						<Divider/>
						<Typography variant="subtitle2">Total Expenses:</Typography>
						<Typography variant="h6">PHP 56,455.50</Typography>
					</div>
					<div>
						<PieGraph data={{}}/>
					</div>
				</div>
				{/* <Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography variant="subtitle2">Total Budget:</Typography>
						<Typography variant="h6">PHP 70,000.00</Typography>
						<Divider/>
						<Typography variant="subtitle2">Total Expenses:</Typography>
						<Typography variant="h6">PHP 56,455.50</Typography>
					</Grid>
					<Grid item xs={6}>
						Test
						<PieGraph data={{}}/>
					</Grid>
				</Grid> */}
			</CardContent>
		</Card>
	);
}

export default BudgetingSummaryCard;