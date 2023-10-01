import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Data, Image } from "../@types/types";

const AUTH_KEY = "34948813-296850008c19dad8d09f83fef";
const PHOTOS_PER_PAGE = 12;
axios.defaults.baseURL = "https://pixabay.com/api/";

const fetchPhotos = async (query: string, page: number = 1): Promise<Image[]> => {
	try {
		const res = await axios.get(`?key=${AUTH_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PHOTOS_PER_PAGE}`);

		const { hits, total } = res.data as Data;

		if (page === 1) {
			if (hits.length < PHOTOS_PER_PAGE) {
				Notify.info(`We found only ${hits.length} images!`);
			} else if (hits.length === 0) {
				Notify.failure(`Ooops! No images by ${query} request!`);
			} else {
				Notify.success(`We found ${total} images!`);
			}
		} else {
			if (hits.length < PHOTOS_PER_PAGE) {
				Notify.failure("Ooops! No more images");
			}
		}

		return hits;
	} catch (e) {
		throw Notify.failure(`${(e as Error).message}`);
	}
};

export default fetchPhotos;
