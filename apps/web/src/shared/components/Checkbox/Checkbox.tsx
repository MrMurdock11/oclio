import { FC } from "react";
import styles from "./Checkbox.module.css";
import classNames from "classnames";

type CheckboxProps = {
	label: string;
	checked?: boolean;
};

export const Checkbox: FC<CheckboxProps> = props => {
	const { label, checked = false } = props;

	return (
		<div className={styles.container}>
			<div
				className={classNames(styles.checkbox, {
					[styles.checked]: checked,
					[styles.unchecked]: !checked,
				})}
			/>
			<span className={styles.label}>{label}</span>
		</div>
	);
};
