import PropTypes from "prop-types";

import css from "./Button.module.css";
import fetchPhotos from "../../services/fetchPhotos";

export default function Button({ onFetch, query, page, toggleLoader }) {
	const onButtonClick = async () => {
		toggleLoader();
		const images = await fetchPhotos(query, page + 1);

		onFetch(images);
		toggleLoader();
	};

	return (
		<button onClick={onButtonClick} className={css.Button}>
			Load More
		</button>
	);
}

Button.propTypes = {
	onFetch: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	toggleLoader: PropTypes.func.isRequired,
};
