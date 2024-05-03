import { FC } from "react";
import { Form } from "./children/Form";
import { AuthPageLayout } from "../../shared/layouts/AuthPageLayout/AuthPageLayout";

export const SignIn: FC = () => {
	return (
		<AuthPageLayout>
			<Form />
		</AuthPageLayout>
	);
};
