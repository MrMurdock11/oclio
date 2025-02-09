import AuthPageLayout from "@/layouts/AuthPageLayout";
import { FC } from "react";

import Form from "./children/Form";

const SignIn: FC = () => {
  return (
    <AuthPageLayout>
      <Form />
    </AuthPageLayout>
  );
};

export default SignIn;
