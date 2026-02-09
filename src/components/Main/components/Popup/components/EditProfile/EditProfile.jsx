import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext.js';
export default function EditProfile({ onUpdateUser }) {
  const {currentUser, handleUpdateUser} = useContext(CurrentUserContext); 

  const [name, setName] = useState(currentUser.name || ''); 
  const [description, setDescription] = useState(currentUser.about || ''); 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };
    const handleSubmit = (event) => { 
      event.preventDefault();
      handleUpdateUser({
        name: name,
        about: description,
      });
    };

    return (
        <form className="pop-up__form" onSubmit={handleSubmit} >
        <input
          type="text"
          className="pop-up__input"
          name="name"
          id="profile-name-input"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          required
          minLength="2"
          maxLength="40"
        />
        <span className="pop-up__error" id="profile-name-input-error"></span>
        <input
          type="text"
          className="pop-up__input"
          name="role"
          id="profile-role-input"
          placeholder="Sobre mim"
          value={description}
          onChange={handleDescriptionChange}
          required
          minLength="2"
          maxLength="200"
        />
        <span className="pop-up__error" id="profile-role-input-error"></span>
        <button type="submit" className="pop-up__submit">Salvar</button>
      </form>
    );
    }
    