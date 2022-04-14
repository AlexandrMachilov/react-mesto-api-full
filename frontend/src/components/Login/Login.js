import { useState } from 'react';

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    handleLogin(formData);
    setFormData({ email: '', password: '' });
  }

  return (
    <main className='content content__sign'>
      <section className='sign content__section'>
        <h3 className='sign__title'>Вход</h3>
        <form className={`sign__form sign__form_login`} onSubmit={handleSubmit}>
          <input
            value={formData.email}
            onChange={handleChange}
            type='email'
            className='sign__input sign__input_type_email'
            name='email'
            id='login-email'
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
            id='login-password'
            placeholder='Пароль'
            required
          />
          <button
            type='submit'
            className={`sign__button sign__button_action_submit sign__button_action_login`}
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
