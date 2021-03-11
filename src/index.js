import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";

//import component from material ui
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Router />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
