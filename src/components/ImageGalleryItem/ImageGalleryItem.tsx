import { MouseEvent } from "react";
import css from "./ImageGalleryItem.module.css";

type Props = {
	id: number;
	webURL: string;
	tags: string;
	onClick(e: MouseEvent<HTMLLIElement>): void;
};

export default function ImageGalleryItem({ id, webURL, tags, onClick }: Props) {
	return (
		<li onClick={onClick} className={css.item}>
			<img id={String(id)} src={webURL} alt={tags} className={css.image} />
		</li>
	);
}
