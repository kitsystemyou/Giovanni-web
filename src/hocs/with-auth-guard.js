import { AuthGuard } from 'src/guards/auth-guard';
// import GoogleLoginPage from "src/guards/google-auth-guard";

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
