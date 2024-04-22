import { FC } from "react";
import { Button, ButtonProps } from "../Button";
import { GoogleIcon } from "../GoogleIcon";

type SocialButtonProps = {
	social: "google";
} & Omit<ButtonProps, "color">;

export const SocialButton: FC<SocialButtonProps> = props => {
	const { social, ...buttonProps } = props;

	return <Button color="secondary" Icon={<GoogleIcon />} {...buttonProps} />;
};
