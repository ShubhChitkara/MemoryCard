import "./card-style.css";

function Card({ image, title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
    </div>
  );
}
export default Card;