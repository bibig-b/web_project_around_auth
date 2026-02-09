export default function Card(props) {
    const {name, link, isLiked,_id} = props.card;
    const {onImageClick, onCardDelete,onCardLike } = props;

   function handleLikeClick() {
        onCardLike(props.card);
   }
    function handleDeleteClick() {
       onCardDelete(props.card);
   }

    return (
      <div className="card">
        <img className="card__image" src={link} alt={name} onClick={() => onImageClick(props.card)} />
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
            onClick={handleDeleteClick}
        />
        <div className="card__description">
          <h2 className="card__title">{name}</h2>
          <button
            aria-label="Like card"
            type="button"
            className={`card__like-button ${ isLiked ? 'card__like-button_isliked ' : ''}`}
            onClick={handleLikeClick}
          />
        </div>
      </div>
    );
}