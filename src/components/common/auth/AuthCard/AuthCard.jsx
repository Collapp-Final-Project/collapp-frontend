import "./AuthCard.scss";


export const AuthCard = ({ title, subtitle, children, footer }) => (
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
      {footer}
    </div>
  </div>
);