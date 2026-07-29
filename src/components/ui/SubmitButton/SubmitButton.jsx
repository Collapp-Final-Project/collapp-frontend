import "./SubmitButton.scss";

export const SubmitButton = ({ isLoading, loadingText, children, ...rest }) => (
  <button
    type="submit"
    className="auth-submit-button"
    disabled={isLoading}
    {...rest}
  >
    {isLoading ? loadingText : children}
  </button>
);
