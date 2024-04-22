import { FC } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export type ButtonColors = "primary" | "secondary";

export type ButtonProps = {
	color: ButtonColors;
	Icon?: JSX.Element;
	className?: string;
	filled?: boolean;
	children?: string;
};

export const Button: FC<ButtonProps> = props => {
	const { color, Icon, className, filled, children } = props;

	return (
		<button
			className={classNames(styles.button, className, {
				[styles.primary]: color === "primary",
				[styles.secondary]: color === "secondary",
				"w-full": filled ?? false,
			})}
		>
			{Icon && Icon}
			{children}
		</button>
	);
};
