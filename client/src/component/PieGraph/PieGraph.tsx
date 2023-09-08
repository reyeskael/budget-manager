import { Box, CircularProgress, SxProps, Typography } from '@mui/material';
import './PieGraph.css';

export interface PieGraphProps {
	data: any
}

const circularProgressText: SxProps = {
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
}

const PieGraph = ({ data }: PieGraphProps) => {
	return (
		<Box sx={
				{
					position: 'relative',
					display: 'inline-flex',
					paddingTop: "10px"
				}
			}
		>
			<CircularProgress
				variant="determinate"
				sx={
					{
					color: (theme) =>
						theme.palette.grey[theme.palette.mode === "light" ? 600 : 900]
					}
				}
				value={100}
				size={175}
				thickness={2.5}
			/>
			<CircularProgress
				variant="determinate"
				value={89}
				size={175}
				thickness={2.5}
				sx={
					{
						color: (theme) => {
							console.log(theme);
							return theme.palette.grey[theme.palette.mode === 'light' ? 200 : 100]
						},
						position: "absolute",
						left: 0,
						'& circle': {
							strokeLinecap: 'round',
						}
					}
				}
			/>
			<Box
				sx={circularProgressText}
			>
				<Typography
					variant="subtitle2"
					component="div"
					color="inherit"
				>
					{"PHP 57,570.50"}
				</Typography>
			</Box>
		</Box>
	);
}

export default PieGraph;