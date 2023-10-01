import PropTypes from "prop-types";

import css from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ id, webURL, tags, onClick }) {
	return (
		<li onClick={onClick} className={css.item}>
			<img id={id} src={webURL} alt={tags} className={css.image} />
		</li>
	);
}

ImageGalleryItem.propTypes = {
	id: PropTypes.number.isRequired,
	webURL: PropTypes.string.isRequired,
	tags: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};
