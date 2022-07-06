import React, { FC, useEffect, useState } from "react";

import styles from "./Home.module.css";

export const Home: FC = () => {
	const [bonjour, setBonjour] = useState("");

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:3000/");
			const data = await response.text();

			setBonjour(data);
		})();
	}, [setBonjour]);

	return <div className={styles.container}>{bonjour}</div>;
};
