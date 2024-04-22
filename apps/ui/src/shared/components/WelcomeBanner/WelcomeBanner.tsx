import styles from "./WelcomeBanner.module.css";

export const WelcomeBanner = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.title}>
				✍ Digital platform{" "}
				<span className={styles.highlight}>independent</span> writers
			</div>
			<div className={styles.call}>
				Sign in now and start showing off your writing skills to the
				masses
			</div>
		</div>
	);
};
