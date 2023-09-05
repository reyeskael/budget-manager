import { useState } from 'react';
import './ConfirmationBox.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export interface ConfirmationBoxActionClickEvent {
	text: string,
	value: string
}

export interface ConfirmationBoxButtonProps {
	text: string,
	value: string
}

export const defaultButtons: ConfirmationBoxButtonProps[] = [
	{
		text: "Yes",
		value: "yes"
	},
	{
		text: "No",
		value: "no"
	}
]

interface ConfirmationBoxProps {
	open: boolean,
	title: string,
	text: string,
	buttons?: ConfirmationBoxButtonProps[]
	onActionClick?: (e: ConfirmationBoxActionClickEvent) => void
}

const ConfirmationBox = ({open = false, title, text, buttons = defaultButtons, onActionClick}: ConfirmationBoxProps) => {
	function onButtonClick(e: any) {
		if (onActionClick) {
			const text = e.target.textContent;
			const value = e.target.value;
			onActionClick({
				text,
				value
			});
		}
	}

	return (
		<Dialog open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{
					buttons.map((button, index) => 
						<Button onClick={onButtonClick} color="primary" value={button.value} key={index}>
							{button.text}
						</Button>
					)
				}
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmationBox;
