import { FC } from "react";
import styles from "./Input.module.css";
import classNames from "classnames";

type InputProps = {
	placeholder?: string;
	type?: "text" | "password";
};

export const Input: FC<InputProps> = props => {
	const { placeholder, type } = props;

	return (
		<div className={styles.container}>
			<input
				type={type}
				className={classNames(styles.input, "w-full", {
					[styles.password]: type === "password",
				})}
				placeholder={placeholder}
			/>

			{type === "password" && <div className={styles.passwordIcon} />}
		</div>
	);
};

Input.defaultProps = {
	placeholder: "Text",
	type: "text",
};
