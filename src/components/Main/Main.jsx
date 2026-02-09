import { useEffect, useState } from 'react';
import Popup from './components/Popup/Popup.jsx';   
import Card from './components/Popup/components/Card/Card.jsx';
import NewCard from './components/Popup/components/NewCard/NewCard.jsx';
import EditProfile from './components/Popup/components/EditProfile/EditProfile.jsx';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar.jsx';
import ImagePopup from './components/Popup/components/ImagePopup/ImagePopup.jsx';
import { api }from '../../utils/api.js';
import {useContext} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function Main({
  cards,
  onCardLike,
  onCardDelete, 
  onAddPlaceSubmit,
  popup,
  onOpenPopup,
  onClosePopup,
}) {
  const {currentUser} = useContext(CurrentUserContext); 

const [selectedCard, setSelectedCard] = useState(null)

const newCardPopup={ title: 'New card', children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} onClose={onClosePopup} /> };
const editProfilepopup={ title: 'Edit profile', children: <EditProfile onClose={onClosePopup} /> };
const editAvatarpopup={ title: 'Edit profile picture', children: <EditAvatar /> };

function handleOpenImagePopup(card) {
  setSelectedCard(card);
  const imagePopupObject = {
    title: '',
    children: <ImagePopup card={card} />,
  };
  onOpenPopup(imagePopupObject);
}

  return (
    <main className='content'>
        <section className='content__profile'>
          <div className='content__avatar-container'>
            <img
              src={currentUser.avatar}
              alt='Foto de perfil'
              className='content__avatar'
            />
            <button
              className='profile__avatar-edit'
              aria-label='Alterar foto do perfil'
              type='button'
                onClick={() => onOpenPopup(editAvatarpopup)}
            ></button>
          </div>
          <div className='profile'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit'
              aria-label='Editar perfil'
              type='button'
                onClick={() => onOpenPopup(editProfilepopup)}
            ></button>
            <h2 className='profile__role'>{currentUser.about}</h2>
          </div>
          <button
            className='profile__add'
            aria-label='Adicionar cards'
            type='button'
            onClick={() => onOpenPopup(newCardPopup)}

          ></button>
        </section>
        <section className='cards'>
                {cards.map((card) => (
                    <Card
                    key={card._id} 
                    card={card} onImageClick={handleOpenImagePopup}
                    onCardDelete= {onCardDelete}
                    onCardLike={onCardLike}/>
                ))}
        </section>
        {popup && (
          <Popup onClose={onClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}  
      </main>
    );
}