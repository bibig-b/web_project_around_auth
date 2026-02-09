export default function ImagePopup(props) {
    const {card} = props;
    return (
    <div>
         <img className="img__pop-up" src= {card.link} alt={card.name} />
        <p className="img__pop-up__caption"> {card.name}</p>
    </div>
    );
}
