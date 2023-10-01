import { Component, KeyboardEvent, MouseEvent } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import makeSmoothScroll from "../../services/smoothScroll";
import { Image } from "../../@types/types";

type State = {
	images: Image[];
	isModalOpen: boolean;
	showLoader: boolean;
	currentModalImg: Image | object;
	searchQuery: string;
	currentPage: number;
};

export default class App extends Component {
	state: State = {
		images: [],
		isModalOpen: false,
		showLoader: false,
		currentModalImg: {},
		searchQuery: "",
		currentPage: 1,
	};

	onESCPress = (e: KeyboardEvent<Window>) => {
		if (e.code === "Escape") {
			return this.setState({ isModalOpen: false, currentModalImg: {} });
		}
	};

	onLoadMoreClick = (photos: Image[]) => {
		this.setState(state => {
			return {
				images: [...(state as State).images, ...photos],
				currentPage: (state as State).currentPage + 1,
			};
		});
	};

	toggleLoader = (): void => {
		this.setState(state => {
			return { showLoader: !(state as State).showLoader };
		});
	};

	onFetchPhotos = (photos: Image[], query: string): void => {
		setTimeout(() => {
			makeSmoothScroll();
		}, 200);

		this.setState({ images: [...photos], searchQuery: `${query}`, currentPage: 1 });
	};

	closeModal = (e: MouseEvent<HTMLButtonElement>) => {
		const { currentTarget, target } = e;

		if (currentTarget === target) {
			this.setState({ isModalOpen: false, currentModalImg: {} });
		}
	};

	onImgClick = (e: MouseEvent<HTMLLIElement>): void => {
		const { images } = this.state;

		const currentImg = images.find(image => image.id === Number((e.target as HTMLImageElement).id));
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
				<Searchbar onFetchPhotos={onFetchPhotos} toggleLoader={toggleLoader}></Searchbar>

				<ImageGallery>
					{images.map(({ tags, webformatURL, id }) => (
						<ImageGalleryItem onClick={onImgClick} key={id} id={id} webURL={webformatURL} tags={tags} />
					))}
				</ImageGallery>

				<Loader visible={showLoader} />

				{searchQuery && <Button toggleLoader={toggleLoader} onFetch={onLoadMoreClick} query={searchQuery} page={currentPage} />}

				{isModalOpen && <Modal onESCPress={onESCPress} closeModal={closeModal} currentModalImg={currentModalImg} />}
			</>
		);
	}
}
