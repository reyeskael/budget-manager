import './TransactionList.css';
import { List, ListItem, ListItemText } from '@mui/material';
import { formatDate } from '../../utils/helper';
import apiConfig from "../../config/apiConfig.json";
import { customTheme } from '../../utils/cosmeticsHelper';

const { currency } = apiConfig;

export enum TransactionDirection {
	POSITIVE = "positive",
	NEGATIVE = "negative"
}

export interface TransactionListItemProps {
	date: Date,
	direction: TransactionDirection,
	amount: number
}

interface TransactionListProps {
	items: TransactionListItemProps[],
	onItemSelected?: (e: any) => void
}

const TransactionList = ({items, onItemSelected}: TransactionListProps) => {

	function onItemClick(e: any) {
		if (onItemSelected) {
			onItemSelected(e);
		}
	}

	return (
		<List>
			{
				items?.map((item: TransactionListItemProps, index: number) => (
					<ListItem
						key={index}
						onClick={() => onItemClick(item)}
						sx={{
							borderBottom: `1.75px solid ${customTheme.palette.secondary.main}`
						}}
						className="selectableListItemContainer"
					>
						<div className="transactionListText">
							<ListItemText
								className="selectableListItemContent"
								primary={formatDate(item.date.toString())}
								primaryTypographyProps={
									{
										fontSize: "1.05rem",
										fontWeight: "bold"
									}
								}
							/>
							<ListItemText
								className="selectableListItemContent"
								primary={`${item.direction === TransactionDirection.POSITIVE ? "+" : "-"} ${currency} ${item.amount.toLocaleString()}`}
								primaryTypographyProps={
									{
										fontSize: "1.05rem",
										fontWeight: "bold",
										align: "right"
									}
								}
								sx={
									item.direction === TransactionDirection.POSITIVE ?
									{ color: "green" } :
									{ color: "red" }
								}
							/>
						</div>
					</ListItem>
				))
			}
		</List>
	);
}

export default TransactionList;
