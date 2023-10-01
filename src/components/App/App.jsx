import { Component } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import makeSmoothScroll from "../../services/smoothScroll";

export default class App extends Component {
	state = {
		images: [],
		isModalOpen: false,
		showLoader: false,
		currentModalImg: {},
		searchQuery: "",
		currentPage: 1,
	};

	onESCPress = e => {
		if (e.code === "Escape") {
			return this.setState({ isModalOpen: false, currentModalImg: {} });
		}
	};

	onLoadMoreClick = photos => {
		this.setState(state => {
			return {
				images: [...state.images, ...photos],
				currentPage: state.currentPage + 1,
			};
		});
	};

	toggleLoader = () => {
		this.setState(state => {
			return { showLoader: !state.showLoader };
		});
	};

	onFetchPhotos = (photos, query) => {
		setTimeout(() => {
			makeSmoothScroll();
		}, 200);

		this.setState({ images: [...photos], searchQuery: `${query}`, currentPage: 1 });
	};

	closeModal = e => {
		const { currentTarget, target } = e;

		if (currentTarget === target) {
			this.setState({ isModalOpen: false, currentModalImg: {} });
		}
	};

	onImgClick = e => {
		const { images } = this.state;

		const currentImg = images.find(image => image.id === Number(e.target.id));
		this.setState({ currentModalImg: currentImg, isModalOpen: true });
	};

	render() {
		const {
			state: { images, isModalOpen, currentModalImg, searchQuery, currentPage, showLoader },
			onFetchPhotos,
			onLoadMoreClick,
			onImgClick,
			onESCPress,
			closeModal,
			toggleLoader,
		} = this;

		return (
			<>
				<Searchbar onSubmit={onFetchPhotos} toggleLoader={toggleLoader}></Searchbar>

				<ImageGallery>
					{images.map(({ tags, webformatURL, id }) => (
						<ImageGalleryItem onClick={onImgClick} key={id} id={id} webURL={webformatURL} tags={tags} />
					))}
				</ImageGallery>

				<Loader visible={showLoader} />

				{searchQuery && (
					<Button toggleLoader={toggleLoader} onFetch={onLoadMoreClick} query={searchQuery} page={currentPage} />
				)}

				{isModalOpen && <Modal onESCPress={onESCPress} closeModal={closeModal} currentModalImg={currentModalImg} />}
			</>
		);
	}
}
