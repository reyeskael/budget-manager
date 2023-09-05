import './SavingsDetailsPage.css';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/rootReducer';
import { pageContainer } from '../../utils/cosmeticsHelper';
import SavingsDetailsCard from './SavingsDetailsCard/SavingsDetailsCard';

const SavingsDetailsPage = () => {
	const savingsState = useSelector((state: RootState) => state?.savingsReducer);
	console.log(savingsState);
	return (
		<Container className="pageContainerWithHeader" sx={pageContainer}>
			<SavingsDetailsCard data={savingsState}/>
		</Container>
	);
}

export default SavingsDetailsPage;
