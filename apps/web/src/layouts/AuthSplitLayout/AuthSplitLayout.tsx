import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

import styles from "./AuthSplitLayout.module.css";

export type AuthSplitLayoutProps = {
  LeftSideComponent?: ReactNode;
  RightSideComponent?: ReactNode;
  leftSideClassName?: string;
  rightSideClassName?: string;
};

export const AuthSplitLayout: FC<AuthSplitLayoutProps> = (props) => {
  const {
    LeftSideComponent,
    RightSideComponent,
    leftSideClassName,
    rightSideClassName,
  } = props;

  return (
    <div className="grid h-screen grid-cols-2">
      <div className={cn(styles.left, leftSideClassName)}>
        {LeftSideComponent}
      </div>
      <div className={cn(styles.right, rightSideClassName)}>
        {RightSideComponent}
      </div>
    </div>
  );
};
