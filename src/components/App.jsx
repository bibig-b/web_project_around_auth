import {Routes,Route,Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg'
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import{ api }from '../utils/api.js';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup,setPopup] = useState(null);

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
      <Header />
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
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App
