import { FC } from "react";
import { Form } from "./children/Form";
import { AuthPageLayout } from "../../shared/layouts/AuthPageLayout/AuthPageLayout";

export const SignUp: FC = () => {
	return (
		<AuthPageLayout>
			<Form />
		</AuthPageLayout>
	);
};
