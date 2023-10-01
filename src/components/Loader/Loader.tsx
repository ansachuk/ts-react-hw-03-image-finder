import { MagnifyingGlass } from "react-loader-spinner";

import css from "./Loader.module.css";

type Props = { visible: boolean };

export default function Loader({ visible }: Props) {
	return (
		<>
			<MagnifyingGlass visible={visible} color="#3f51b5" glassColor="#8bdefa" wrapperClass={css.wrapper} width={110} height={110} />
		</>
	);
}
