import React, { Component } from "react";
import PropTypes from "prop-types";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as SearchIcon } from "../../icons/searc.svg";
import fetchPhotos from "../../services/fetchPhotos";
import css from "./Searchbar.module.css";

export default class Searchbar extends Component {
	static propTypes = {
		toggleLoader: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		query: "",
	};

	onInputChange = e => {
		this.setState({ query: e.currentTarget.value });
	};

	onSubmit = async e => {
		e.preventDefault();

		const {
			state: { query },
			props: { toggleLoader, onSubmit },
		} = this;

		if (query.trim() !== "") {
			toggleLoader();
			const images = await fetchPhotos(query);

			onSubmit(images, query);

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

						<SearchIcon />
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
