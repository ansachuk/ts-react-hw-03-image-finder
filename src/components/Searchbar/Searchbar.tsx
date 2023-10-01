import { ChangeEvent, Component, FormEvent } from "react";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import fetchPhotos from "../../services/fetchPhotos";

import { Image } from "../../@types/types";

import icons from "../../icons/search.svg";
import css from "./Searchbar.module.css";

type Props = {
	onFetchPhotos(photos: Image[], query: string): void;
	toggleLoader(): void;
};

type State = { query: string };

export default class Searchbar extends Component<Props, State> {
	state = {
		query: "",
	};

	onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ query: e.currentTarget.value });
	};

	onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const {
			state: { query },
			props: { toggleLoader, onFetchPhotos },
		} = this;

		if (query.trim() !== "") {
			toggleLoader();
			const images = await fetchPhotos(query);

			onFetchPhotos(images, query);

			toggleLoader();

			this.setState({
				query: "",
			});
		} else {
			Notify.warning("Please, enter a query!");

			this.setState({
				query: "",
			});
		}
	};

	render() {
		return (
			<header className={css.searchbar}>
				<form className={css.form} onSubmit={this.onSubmit}>
					<button type="submit" className={css.button}>
						<span className={css.label}></span>

						{
							<svg width="32" height="32">
								<use href={icons + "#search"}></use>
							</svg>
						}
					</button>

					<input
						onChange={this.onInputChange}
						value={this.state.query}
						className={css.input}
						name="query"
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</form>
			</header>
		);
	}
}
