import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../pages.css';

const AllUsers = () => {
  return (
    <div className="page-wrapper">
      <div>
        <Header />
      </div>
      <main>
        <p>Aqui va el contenido de all users</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AllUsers;