import './FormWindow.css';
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormEvent, useState } from 'react';

export enum FormWindowItemType {
	DROPDOWN = "Dropdown",
	TEXTFIELD = "Textfield",
	DATEPICKER = "DatePicker"
}

export interface FormData {
	[key: string]: {
		value: string | Date | null
	}
}

export interface FormWindowItemProps {
	type: FormWindowItemType,
	required?: boolean,
	label: string
	options?: DropDownOptionProps[]
}

export interface DropDownOptionProps {
	label: string,
	value: string
}

interface FormWindowProps {
	items: FormWindowItemProps[],
	onCancelClick?: (e: any) => void,
	onSubmit?: (e: any) => void
}

const FormWindow = ({ onCancelClick, onSubmit, items }: FormWindowProps) => {
	const [ formData, setFormData ] = useState<FormData>({});

	function onFormChange(e: any) {
		console.log(e);
		if (e?.formData) {
			let currentFormData: FormData = {};
			currentFormData[e.formData.label] = {
				value: e.formData.value
			};
			setFormData({ ...formData, ...currentFormData });
		}
	}

	function onFormDateChange(date: any, label: string) {
		const formData = {
			value: date,
			label: label
		}
		onFormChange({ formData });
	}

	function onFormTextChange(e: any) {
		const label = e.target.labels[0].innerText.replace(" *", "");
		const formData = {
			value: e.target.value,
			label: label
		}
		e["formData"] = formData;
		onFormChange(e);
	}

	function onFormOptionChange(e: any, label: string) {
		const formData = {
			value: e.target.value,
			label: label
		}
		e["formData"] = formData;
		onFormChange(e);
	}

	function onFormSubmit(e: FormEvent) {
		e.preventDefault();
		if (onSubmit) {
			onSubmit({
				data: formData
			});
		}
		console.log(formData);
	}

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
		return <FormControl className="textField" fullWidth key={index}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label={itemDetails.label}
					value={formData?.[itemDetails.label]?.value || null}
					onChange={(date) => onFormDateChange(date, itemDetails.label)}
					slotProps={{ textField: { variant: 'outlined', fullWidth: true, key: index, required: itemDetails.required} }}
				/>
			</LocalizationProvider>
		</FormControl>
	}

	function renderDropdown(itemDetails: FormWindowItemProps, index: number) {
		return <FormControl required={itemDetails.required || false} className="textField" fullWidth key={index}>
			<InputLabel id="input-label">{itemDetails.label}</InputLabel>
			<Select
				labelId="input-label"
				label={itemDetails.label}
				variant="outlined"
				value={formData?.[itemDetails.label]?.value || ""}
				onChange={(e) => onFormOptionChange(e, itemDetails.label)}
			>
				{
					itemDetails?.options?.map((item: DropDownOptionProps, index: number) => (
						<MenuItem
							key={index}
							value={item.value}
						>
							{item.label}
						</MenuItem>
					))
				}
			</Select>
		</FormControl>
	}

	function renderTextField(itemDetails: FormWindowItemProps, index: number) {
		return <FormControl className="textField" fullWidth key={index}>
			<TextField
				label={itemDetails.label}
				variant="outlined"
				required={itemDetails.required || false}
				value={formData?.[itemDetails.label]?.value || ""}
				onChange={onFormTextChange}
			/>
		</FormControl>
	}

	return (
		<Container className="container">
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="div">
					Add New Savings
				</Typography>
				<form onSubmit={onFormSubmit}>
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
				</form>
			</Paper>
		</Container>
	);
}

export default FormWindow;
