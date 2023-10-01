import { MagnifyingGlass } from "react-loader-spinner";
import PropTypes from "prop-types";

import css from "./Loader.module.css";

export default function Loader({ visible }) {
	return (
		<>
			<MagnifyingGlass
				visible={visible}
				color="#3f51b5"
				glassColor="#8bdefa"
				wrapperClass={css.wrapper}
				width={110}
				height={110}
			/>
		</>
	);
}

Loader.propTypes = {
	visible: PropTypes.bool.isRequired,
};
