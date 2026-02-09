import{ useRef, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext.js';
export default function EditAvatar() {
  const {handleUpdateAvatar} = useContext(CurrentUserContext);  
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar(
     avatarRef.current.value);
  } 

    return (
        <form className="pop-up__form" onSubmit={handleSubmit}>
        <input
          ref={avatarRef}
          type="url"
          className="pop-up__input"
          name="avatar"
          id="avatar-input"
          placeholder="Link da imagem"
          required
          minLength="1"
          maxLength="200"
        />
        <span className="pop-up__error" id="avatar-input-error"></span>
        <button type="submit" className="pop-up__submit">Salvar</button>
      </form>
    );
  }