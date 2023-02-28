import './Card.css'

const Card = ({number, title, icon}) => {
    return (
        <div className="card-single">
            <div>
                <h1>{number}</h1>
                <span>{title}</span>
            </div>
            <div>
                <span className={icon}></span>
            </div>
        </div>
    )
}

export default Card