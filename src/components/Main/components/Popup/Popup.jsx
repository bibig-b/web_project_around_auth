export default function Popup(props) {
    const {title, children, onClose} = props;

    return (
      <div className="pop-up">
      <div className={`pop-up__container ${!title ? " pop-up__container_image" : ""}` } >
        <button
          aria-label="Fechar"
          className="pop-up__close"
          type="button"
          onClick={onClose}
        />
        {title && <h2 className="pop-up__title">{title}</h2>}
        {children}
      </div>
    </div>
    )
  }