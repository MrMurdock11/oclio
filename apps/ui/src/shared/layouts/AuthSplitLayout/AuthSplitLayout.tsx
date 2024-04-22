import { FC, ReactNode } from "react";
import styles from "./AuthSplitLayout.module.css";
import classNames from "classnames";

export type AuthSplitLayoutProps = {
	LeftSideComponent?: ReactNode;
	RightSideComponent?: ReactNode;
	leftSideClassName?: string;
	rightSideClassName?: string;
};

export const AuthSplitLayout: FC<AuthSplitLayoutProps> = props => {
	const {
		LeftSideComponent,
		RightSideComponent,
		leftSideClassName,
		rightSideClassName,
	} = props;

	return (
		<div className="grid grid-cols-2 h-screen">
			<div className={classNames(styles.left, leftSideClassName)}>
				{LeftSideComponent}
			</div>
			<div className={classNames(styles.right, rightSideClassName)}>
				{RightSideComponent}
			</div>
		</div>
	);
};
