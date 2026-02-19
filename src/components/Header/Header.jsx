import logo from '../../images/around.png';
import line from '../../images/Line.png';
import { NavLink, useLocation } from 'react-router-dom';



export default function Header() {

  const location = useLocation();

  let btnText = '';
  let btnLink = '';
  
  if (location.pathname === '/signin') {
    btnText = 'Registrar';
    btnLink = '/signup';
  } else if (location.pathname === '/signup') {
    btnText = 'Entrar';
    btnLink = '/signin';
  } else if (location.pathname === '/') {
    btnText = 'Sair';
    btnLink = '/signin';
    ;
  }  

  return (
    <>
 <header className='header'>
    <div className='header__top'>
        <img src={logo} alt='logo header' className='header__logo' />

        {location.pathname === "/" ?(
          <div className='header__in-button'>
            <p className='header__email'>{userEmail}</p>
            <NavLink to={btnLink} className='header__logout' onClick={onSignOut}>{btnText}
            </NavLink>
          </div>
        ) : (
          <NavLink to={btnLink} className='header__link'>{btnText}</NavLink>

        )}
      </div>

        <img src={line} alt='linha header' className='header__line' />
       

      </header>
    </>
  );



}