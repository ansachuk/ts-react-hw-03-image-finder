const makeSmoothScroll = (): void => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export default makeSmoothScroll;
