import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../../Header/Header';

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
    <Header/>
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
        
        <Link className="login__link" to="/signup">
         Ainda não é um membro? Inscreva-se aqui!
        </Link>
      </form>
    </div>
  );
}

export default Login;