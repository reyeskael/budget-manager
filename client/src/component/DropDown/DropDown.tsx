import { useState } from 'react';
import './DropDown.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface DropDownOptionProps {
	label: string,
	value: string
}

interface DropDownProps {
	label?: string,
	variant?: "standard" | "outlined" | "filled" | undefined,
	options: DropDownOptionProps[],
	onOptionSelect?: (e: any) => void
}

const DropDown = ({label, variant, options}: DropDownProps) => {
	const [ selectedOption, setSelectedOption ] = useState("");

	function onOptionChange(e: any) {
		setSelectedOption(e.target.value);
	}

	return (
		<>
			<InputLabel id="input-label">{label}</InputLabel>
			<Select
				labelId="input-label"
				label={label}
				variant={variant}
				value={selectedOption}
				onChange={onOptionChange}
			>
				{
					options.map((item: DropDownOptionProps, index: number) => (
						<MenuItem
							key={index}
							value={item.value}
						>
							{item.label}
						</MenuItem>
					))
				}
			</Select>
		</>
	);
}

export default DropDown;
