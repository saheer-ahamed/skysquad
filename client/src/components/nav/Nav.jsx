import './Nav.css'
import Admin from '../../assets/images/admin.jpeg'

const Nav = () => {
    return (
        <header>
            <h2>
                <label for="nav-toggle">
                    <span className="las la-bars"></span>
                </label>

                Dashboard
            </h2>
            <div className="search-wrapper">
                <span className="las la-search"></span>
                <input type="search" placeholder="Search here" />
            </div>

            <div className="user-wrapper">
                <img src={Admin} alt="" width="30px" height="30px" />
                <div>
                    <h4>Sinan Abdulatif</h4>
                    <small>Super admin</small>
                </div>
            </div>
        </header>
    )
}

export default Nav