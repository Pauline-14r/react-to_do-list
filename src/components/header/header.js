import logo from '../../pictures/logo.svg';
export function Header() {
  return (
    <div className="header">
      <span className="header_logo-wrapper">
        <img src={logo} alt="logo" />
      </span>
    </div>
  );
}
