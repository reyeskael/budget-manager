import './BudgetingPage.css';
import { Container } from '@mui/material';
import { pageContainer } from '../../utils/cosmeticsHelper';
import BudgetingSummaryCard from './components/BudgetingSummaryCard/BudgetingSummaryCard';
import TabMenu, { TabMenuItemProps } from '../../component/TabMenu/TabMenu';
import SelectableList from '../../component/SelectableList/SelectableList';

const BudgetingPage: React.FC = () => {
	const tabMenuItems: TabMenuItemProps[] = [
		{
			label: "Needs",
			element: renderNeedsTab
		},
		{
			label: "Savings",
			element: renderSavingsTab
		},
		{
			label: "Wants",
			element: renderWantsTab
		}
	];

	function renderNeedsTab() {
		return <Container>
			<SelectableList
				search={false}
				items={
					[
						{
							name: "Food",
							progressBar: {
								targetValue: 3000,
								currentValue: 2400
							}
						}
					]
				}
			/>
		</Container>
	}

	function renderSavingsTab() {
		return <div>Savings</div>
	}

	function renderWantsTab() {
		return <div>Needs</div>
	}

	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<BudgetingSummaryCard data={{}}/>
			<TabMenu items={tabMenuItems}/>
		</Container>
	);
}

export default BudgetingPage;