import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Entrar</h2>
        
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button className="login__button" type="submit">
          Entrar
        </button>
        
        <p className="login__text">
          Ainda não é membro? <a href="/signup" className="login__link">Inscreva-se aqui!</a>
        </p>
      </form>
    </div>
  );
}

export default Login;