import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(formData);
  }

  return (
    <main className='content content__sign'>
      <section className='sign content__section'>
        <h3 className='sign__title'>Регистрация</h3>
        <form className={`sign__form sign__form_register`} onSubmit={handleSubmit}>
          <input
            value={formData.email}
            onChange={handleChange}
            type='email'
            className='sign__input sign__input_type_email'
            name='email'
            id='register-email'
            placeholder='Email'
            autoComplete='off'
            required
          />
          <input
            value={formData.password}
            onChange={handleChange}
            type='password'
            className='sign__input sign__input_type_password'
            name='password'
            id='register-password'
            placeholder='Пароль'
            required
          />
          <button
            type='submit'
            className={`sign__button sign__button_action_submit sign__button_action_register`}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className='sign__regster-signin'>
          <p className='sign__regster-signin_title'>Уже зарегистрированы?</p>
          <Link to='/signin' className='sign__regster-signin_link'>
            &ensp;Войти
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
