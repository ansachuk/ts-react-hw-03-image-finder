import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App/App";
import css from "./components/App/App.module.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App className={css.App} />
	</React.StrictMode>,
);
