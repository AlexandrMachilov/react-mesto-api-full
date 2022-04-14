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
    switch (location.pathname) {
      case '/':
        button.link = '/sign-in';
        button.text = 'Выйти';
        return button;

      case '/sign-in':
        button.link = '/sign-up';
        button.text = 'Зарегистрироваться';
        return button;

      case '/sign-up':
        button.link = '/sign-in';
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
