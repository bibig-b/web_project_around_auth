import {Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import viteLogo from '/vite.svg'
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Login from './Main/components/Popup/components/Login/Login.jsx';
import Register from './Main/components/Popup/components/Register/Register.jsx';  
import{ api }from '../utils/api.js';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';
import ProtectedRoute from './Main/components/Popup/components/ProtectedRoute/ProtectedRoute.jsx';
import {checkToken, login, register} from '../utils/auth.js';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup,setPopup] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
 
  const navigate = useNavigate();

const handleLogin = async (formData) => { console.log('handleLogin chamada com:', formData);
  try {
    setIsLoading(true);
    const res = await login(formData);
    console.log('Resposta do login:', res);
    if (res.token) {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      setUserEmail(formData.email);
      navigate('/', { replace: true });
    } 
  } catch (err) {
    console.error('Erro no login:', err);
  } finally {
    setIsLoading(false);
  }
};
  
const handleRegister = async (formData) => {
  try {
    setIsLoading(true);
    const res = await register(formData);
    console.log('Resposta do registro:', res);
    navigate('/signin');
  } catch (err) {
    console.error('Erro no registro:', err);
  } finally {
    setIsLoading(false);
  }
};

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
  }
  const handlCheckToken =  useCallback(async() => {
    const token = localStorage.getItem('jwt');
      if (!token) { 
        setLoggedIn(false);
        return;
      }
      try {
        const res = await checkToken(token);
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error('Erro ao verificar token:', err);
        setLoggedIn(false);
      }
  },[]);

  useEffect(() => {
    handlCheckToken();
  }, [handlCheckToken]);



  useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
        setCurrentUser(userData);
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  
  useEffect(() => {
    api.getInitialCards()
    .then((data) => {
        setCards(data);
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

function handleOpenPopup(popup) {
  setPopup(popup);
}

function handleClosePopup() {
  setPopup(null);
}

const handleUpdateUser = async (data) => {
  try {
    const newData = await api.setUserInfo(data);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
};

const handleUpdateAvatar = async (url) => {
  try {
    const newData = await api.setUserAvatar(url);
    setCurrentUser(newData);
    handleClosePopup();
  } catch (error) {
    console.error('Erro ao atualizar avatar:', error);
  }
};

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      let newCard;
      if (isLiked) {
        newCard =await api.unlikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
      }
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    } catch (err) {
      console.log(err);
    }
}

async function handleCardDelete(card) {
  if (card.owner !== currentUser._id) {
    console.log('Você só pode deletar seus próprios cards.');
    return;
  }

  try {
    await api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
  } catch (err) {
    console.error(err);
  }
}
async function handleAddPlaceSubmit(cardData) {
  try {
    const newCard = await api.addNewCard(cardData);
    setCards([newCard, ...cards]); 
  }
   catch (err) {
    console.log(err);
  }
}
          
    return (
      <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
        <div className='page'>
          <Routes>
            <Route path="/signin" element={<Login  onLogin={handleLogin}/>} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="*" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header userEmail={userEmail}
                  onSignOut= {handleLogout}/>
                  <Main 
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                  />
                  <Footer/>
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    );

}

export default App
