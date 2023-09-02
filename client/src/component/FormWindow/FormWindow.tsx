import DropDown, { DropDownOptionProps } from '../DropDown/DropDown';
import './FormWindow.css';
import { Button, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export enum FormWindowItemType {
	DROPDOWN = "Dropdown",
	TEXTFIELD = "Textfield",
	DATEPICKER = "DatePicker"
}

export interface FormWindowItemProps {
	type: FormWindowItemType,
	required?: boolean,
	label: string
	options?: DropDownOptionProps[]
}

interface FormWindowProps {
	items: FormWindowItemProps[],
	onCancelClick?: (e: any) => void
}

const FormWindow = ({ onCancelClick, items }: FormWindowProps) => {

	function renderFormWindowFields(itemDetails: FormWindowItemProps, index: number) {
		switch(itemDetails.type) {
			case FormWindowItemType.TEXTFIELD:
				return renderTextField(itemDetails, index);
			case FormWindowItemType.DROPDOWN:
				return renderDropdown(itemDetails, index);
			case FormWindowItemType.DATEPICKER:
				return renderDatePicker(itemDetails, index);
			default:
				return null;
		}
	}

	function renderDatePicker(itemDetails: FormWindowItemProps, index: number) {
		return <FormControl required={itemDetails.required || false} className="textField" fullWidth key={index}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label={itemDetails.label}
					slotProps={{ textField: { variant: 'outlined', fullWidth: true, key: index} }}
				/>
			</LocalizationProvider>
		</FormControl>
	}

	function renderDropdown(itemDetails: FormWindowItemProps, index: number) {
		return <FormControl required={itemDetails.required || false} className="textField" fullWidth key={index}>
			<DropDown
				label={itemDetails.label}
				variant="outlined"
				options={itemDetails.options || []}
			/>
		</FormControl>
	}

	function renderTextField(itemDetails: FormWindowItemProps, index: number) {
		return <FormControl required={itemDetails.required || false} className="textField" fullWidth key={index}>
			<TextField
				label={itemDetails.label}
				variant="outlined"
			/>
		</FormControl>
	}

	return (
		<Container className="container">
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="div">
					Add New Savings
				</Typography>
				{
					items.map((item: FormWindowItemProps, index: number) => renderFormWindowFields(item, index))
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
