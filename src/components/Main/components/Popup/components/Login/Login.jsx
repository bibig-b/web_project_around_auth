import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';
import Header from '../../../../../Header/Header.jsx';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Email e senha são obrigatórios');
      }
      await onLogin(formData); 

      setInfoTooltipStatus('success');
      setInfoTooltipMessage('Login bem-sucedido!');
      setIsInfoTooltipOpen(true);
    }
    catch (err) {
      console.error('Erro no login:', err);
      setInfoTooltipStatus('error');
      setInfoTooltipMessage('Falha no login. Verifique suas credenciais e tente novamente.');
      setIsInfoTooltipOpen(true);
    }
  };

  const handleCloseInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
    if (infoTooltipStatus === 'success') {
      navigate('/');
    }
  };

  return (
    <>
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
      {isInfoTooltipOpen && (
        <div className="popup__overlay">
        <InfoTooltip
      isOpen={isInfoTooltipOpen}
      status={infoTooltipStatus}
      message={infoTooltipMessage}
      onClose={ handleCloseInfoTooltip}
    />
    </div>
    )}
    </>
  );
 };
export default Login;