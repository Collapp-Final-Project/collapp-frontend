import { Link } from "react-router-dom";
import "./AuthFooter.scss";

export const AuthFooter = ({ prompt, linkText, to }) => (
  <div className="auth-footer">
    <span>{prompt}</span>
    <Link to={to} className="auth-link">
      {linkText}
    </Link>
  </div>
);
