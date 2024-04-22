import { FC, ReactNode } from "react";
import { AuthSplitLayout } from "../AuthSplitLayout";
import { WelcomeBanner } from "../../components/WelcomeBanner";
import styles from "./AuthPageLayout.module.css";

export type AuthPageLayoutProps = {
	children?: ReactNode;
};

export const AuthPageLayout: FC<AuthPageLayoutProps> = props => {
	const { children } = props;

	return (
		<AuthSplitLayout
			LeftSideComponent={<WelcomeBanner />}
			RightSideComponent={children}
			leftSideClassName={styles.leftSide}
			rightSideClassName={styles.rightSide}
		/>
	);
};
