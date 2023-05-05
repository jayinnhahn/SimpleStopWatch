import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { grey, green, red, blue } from "@mui/material/colors";
import "./stopwatch.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const CustomBox = styled(Box)(() => ({
	width: "6rem",
	height: "2rem",
	margin: "1.5rem",
	backgroundColor: "#ed7e30",
	color: "white",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	boxShadow: 22,
}));

const ColorButton = styled(Button)(() => ({
	color: grey[50],
	backgroundColor: grey[900],
	width: "12.5rem",
	height: "5rem",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	"&:hover": {
		backgroundColor: grey[700],
	},
}));

export const Stopwatch = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const hours = Math.floor(time / 360000);
	const minutes = Math.floor((time % 360000) / 6000);
	const seconds = Math.floor((time % 6000) / 100);
	const milliseconds = time % 100;

	useEffect(() => {
		let intervalId;
		if (isRunning) {
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	const start = () => {
		if (!isRunning) {
			setIsRunning(!isRunning);
		}
	};

	const stop = () => {
		if (isRunning) {
			setIsRunning(!isRunning);
		}
	};

	const reset = () => {
		setTime(0);
		if (isRunning) {
			setIsRunning(!isRunning);
		}
	};

	return (
		<div className="App">
			<div className="Application">
				<Grid
					className="StopWatch"
					container
					direction="row"
					justifyContent="space-evenly"
					alignItems="center"
				>
					<Grid item xs="auto">
						<CustomBox>{hours.toString().padStart(2, "0")} hr</CustomBox>
					</Grid>

					<Grid item xs="auto">
						<CustomBox>{minutes.toString().padStart(2, "0")} min</CustomBox>
					</Grid>

					<Grid item xs="auto">
						<CustomBox>{seconds.toString().padStart(2, "0")} sec</CustomBox>
					</Grid>

					<Grid item xs="auto">
						<CustomBox>{milliseconds.toString().padStart(2, "0")} ms</CustomBox>
					</Grid>
				</Grid>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ mt: "4rem" }}
				>
					<Grid item xs="auto">
						<ColorButton
							sx={{
								"&:hover": {
									backgroundColor: green[600],
								},
							}}
							onClick={start}
						>
							Start
						</ColorButton>
					</Grid>

					<Grid item xs="auto">
						<ColorButton
							sx={{
								"&:hover": {
									backgroundColor: red[600],
								},
							}}
							onClick={stop}
						>
							Pause
						</ColorButton>
					</Grid>

					<Grid item xs="auto">
						<ColorButton
							sx={{
								"&:hover": {
									backgroundColor: blue[600],
								},
							}}
							onClick={reset}
						>
							Reset
						</ColorButton>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
