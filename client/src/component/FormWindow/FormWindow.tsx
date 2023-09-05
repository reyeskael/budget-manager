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
	inputType?: string,
	required?: boolean,
	label: string,
	key: string,
	options?: DropDownOptionProps[]
}

export interface DropDownOptionProps {
	label: string,
	value: string
}

export interface FormWindowSubmitEvent {
	data: FormData
}

interface FormWindowProps {
	title: string,
	items: FormWindowItemProps[],
	edit?: boolean,
	editValue?: FormData | null,
	onCancelClick?: (e: any) => void,
	onDeleteClick?: (e: any) => void,
	onSubmit?: (e: FormWindowSubmitEvent) => void
}

const FormWindow = ({ title, items, edit = false, editValue, onCancelClick, onDeleteClick, onSubmit }: FormWindowProps) => {
	const [ formData, setFormData ] = useState<FormData>(editValue || {});

	function onFormChange(e: any) {
		if (e?.formData) {
			let currentFormData: FormData = {};
			currentFormData[e.formData.key] = e.formData.value;
			setFormData({ ...formData, ...currentFormData });
		}
	}

	function onFormDateChange(date: any, { label, key }: FormWindowItemProps) {
		const formData = {
			value: date,
			label,
			key
		}
		onFormChange({ formData });
	}

	function onFormTextChange(e: any, { label, key }: FormWindowItemProps) {
		const formData = {
			value: e.target.value,
			label,
			key
		}
		e["formData"] = formData;
		onFormChange(e);
	}

	function onFormOptionChange(e: any, { label, key }: FormWindowItemProps) {
		const formData = {
			value: e.target.value,
			label,
			key
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
	}

	function onFormDeleteClick() {
		if (onDeleteClick) {
			onDeleteClick({
				data: formData
			});
		}
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
					value={formData?.[itemDetails.key] || null}
					onChange={(date) => onFormDateChange(date, itemDetails)}
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
				value={formData?.[itemDetails.key] || ""}
				onChange={(e) => onFormOptionChange(e, itemDetails)}
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
				type={itemDetails?.inputType || "text"}
				required={itemDetails.required || false}
				value={formData?.[itemDetails.key] || ""}
				onChange={(e) => onFormTextChange(e, itemDetails)}
			/>
		</FormControl>
	}

	return (
		<Container className="container">
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="div">
					{title}
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

					{
						edit ?
						<Button
							type="button"
							variant="contained"
							className="button"
							color="primary"
							onClick={onFormDeleteClick}
						>
							Delete
						</Button> : null
					}
					<Button
						variant="contained"
						className="button"
						color="secondary"
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
