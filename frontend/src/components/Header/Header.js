import { useLocation } from 'react-router-dom';
import headerLogo from '../../images/logo-header.svg';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, userEmail, handleExit }) {
  const location = useLocation();
  const button = {
    link: '',
    text: '',
  };
  function headerAuthText() {
    // eslint-disable-next-line default-case
    switch (location.pathname) {
      case '/':
        button.link = '/signin';
        button.text = 'Выйти';
        return button;

      case '/signin':
        button.link = '/signup';
        button.text = 'Зарегистрироваться';
        return button;

      case '/signup':
        button.link = '/signin';
        button.text = 'Войти';
        return button;
    }
  }

  headerAuthText();
  return (
    <header className='header page__header'>
      <div className='header__container'>
        <img src={headerLogo} alt='Логотип место' className='header__logo' />
        <div className='header__auth'>
          {isLoggedIn ? <p className='header__email'>{userEmail}</p> : ''}
          <Link to={button.link} onClick={handleExit} className='button header__link'>
            {button.text}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
