import css from "./ImageGallery.module.css";

type Props = {
	children: React.ReactNode;
};

export default function ImageGallery({ children }: Props) {
	return (
		<>
			<ul className={css.gallery}>{children}</ul>
		</>
	);
}
