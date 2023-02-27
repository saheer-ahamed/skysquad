import './EachTransaction.css'
import Admin from '../../assets/images/admin.jpeg'

const eachTransaction = ({name, date}) => {
    return (
        <div className="customer">
            <div className="info">
                <img src={Admin} alt="" width="40px" height="40px" />
                <div>
                    <h4>{name}</h4>
                    <small>{date}</small>
                </div>
            </div>
            <div className="contact">
                <span className="las la-user-circle"></span>
                <span className="las la-comment"></span>
                <span className="las la-phone"></span>
            </div>
        </div>
    )
}

export default eachTransaction