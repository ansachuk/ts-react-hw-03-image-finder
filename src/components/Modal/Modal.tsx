import { Component, MouseEvent } from "react";

import { Image } from "../../@types/types";
import css from "./Modal.module.css";

interface KeyboardEvent {
	code: string;
}
type Props = {
	onESCPress(e: KeyboardEvent): void;
	closeModal(e: MouseEvent<HTMLButtonElement | HTMLDivElement>): void;
	currentModalImg: Image | object;
};

export default class Modal extends Component<Props> {
	componentDidMount = () => {
		window.addEventListener("keydown", this.props.onESCPress);
	};

	componentWillUnmount = () => {
		window.removeEventListener("keydown", this.props.onESCPress);
	};

	render() {
		let largeImageURL;
		let tags;

		const { currentModalImg } = this.props;

		if (currentModalImg["largeImageURL" as keyof typeof Image]) {
			largeImageURL = (currentModalImg as Image).largeImageURL;
			tags = (currentModalImg as Image).tags;
		}

		return (
			<div onClick={this.props.closeModal} className={css.Overlay}>
				<div className={css.Modal}>
					<img src={largeImageURL} alt={tags} />
				</div>
			</div>
		);
	}
}
