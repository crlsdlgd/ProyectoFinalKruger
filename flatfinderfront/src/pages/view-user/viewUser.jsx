import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../pages.css';

const ViewUser = () => {
  return (
    <div className="page-wrapper">
      <div>
        <Header />
      </div>
      <div>
        <p>Aqui va el contenido de view user</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ViewUser;