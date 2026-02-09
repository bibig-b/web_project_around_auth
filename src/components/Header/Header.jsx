import logo from '../../imagens/around.png';
import line from '../../imagens/Line.png';

export default function Header() {
  return (
 <header className='header'>
        <img src={logo} alt='logo header' className='header__logo' />
        <img src={line} alt='linha header' className='header__line' />
      </header>
    );
}