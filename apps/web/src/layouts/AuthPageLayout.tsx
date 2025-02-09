import WelcomeBanner from '@/components/WelcomeBanner';
import { FC, ReactNode } from 'react';

import { AuthSplitLayout } from './AuthSplitLayout';

export type AuthPageLayoutProps = {
  children?: ReactNode;
};

const AuthPageLayout: FC<AuthPageLayoutProps> = (props) => {
  const { children } = props;

  return (
    <AuthSplitLayout
      LeftSideComponent={<WelcomeBanner />}
      RightSideComponent={children}
      leftSideClassName="flex items-center justify-center"
      rightSideClassName="flex items-center justify-center"
    />
  );
};

export default AuthPageLayout;
