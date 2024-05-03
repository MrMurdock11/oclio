import { Link } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { Checkbox } from "../../../../shared/components/Checkbox";
import { Input } from "../../../../shared/components/Input";
import styles from "./Form.module.css";
import { SocialButton } from "../../../../shared/components/SocialButton";
export const Form = () => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <span className={styles.title}>Hello, hello!</span>
        <span className={styles.description}>
          Enter your information below in order to sign in to your Oclio account
        </span>
      </div>

      <div className={styles.form}>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>

      <div className={styles.actions}>
        <Checkbox label="Remember me" checked />
        <Button color="primary">Sign in</Button>
        <div className={styles.hint}>
          Do not have an account?{" "}
          <Link to="/sign-up" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>

      <div className={styles.divider}>
        <hr /> or <hr />
      </div>

      <div className={styles.thirdPartSocial}>
        <SocialButton social="google" filled>
          Sign in with Google
        </SocialButton>
      </div>
    </div>
  );
};
