import css from "./Button.module.css";

import { Image } from "../../@types/types";

import fetchPhotos from "../../services/fetchPhotos";

type Props = {
	onFetch(photos: Image[]): void;
	query: string;
	page: number;
	toggleLoader(): void;
};

export default function Button({ onFetch, query, page, toggleLoader }: Props) {
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
