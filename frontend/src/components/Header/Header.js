import headerLogo from '../../images/logo-header.svg';

function Header() {
    return(
        <header className="header page__header">
        <img
          /* src="<%=require('./images/logo-header.svg')%>" */
          src={headerLogo}
          alt="Логотип место"
          className="header__logo"
        />
      </header>
    );
}

export default Header;