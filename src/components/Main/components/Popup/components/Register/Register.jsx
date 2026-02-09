import React from "react";
import './Register.css';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = React.useState({
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
    onRegister(formData);
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Registrar</h2>
        
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button className="register__button" type="submit">
          Inscreva-se
        </button>
        
        <p className="register__text">
          Já é membro? <Link to="/signin" className="register__link">Faça login aqui!</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;