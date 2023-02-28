import './Home.css'
import Card from '../../components/card/Card'
import EachTransaction from '../../components/eachTransaction/EachTransaction'
import Table from '../../components/table/Table'
import Nav from '../../components/nav/Nav'

const Home = () => {
  return (
    <div className="main-content">
      <Nav />
      <main>
        <div className="cards">
          <Card number="54" title="Customers" icon="las la-users"/>
          <Card number="79" title="Projects" icon="las la-clipboard-list"/>
          <Card number="124" title="Orders" icon="las la-shopping-bag"/>
          <Card number="$79K" title="Income" icon="lab la-google-wallet"/>
        </div>

        <div className="recent-grid">
          <div className="projects">
            <div className="card">
              <div className="card-header">
                <h3>Recent Projects</h3>
                <button>
                  See all
                  <span className="las la-arrow-right"></span>
                </button>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <Table />
                </div>
              </div>
            </div>
          </div>

          <div className="cusomters">
            <div className="card">
              <div className="card-header">
                <h3>New customer</h3>
                <button>
                  See all
                  <span className="las la-arrow-right"></span>
                </button>
              </div>

              <div className="card-body">
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
                <EachTransaction name="Sinan Abdulatif" date="01/01/2022"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home