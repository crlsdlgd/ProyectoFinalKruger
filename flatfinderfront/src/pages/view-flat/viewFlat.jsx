import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../pages.css';
const ViewFlat = () => {
  return (
    <div className="page-wrapper">
      <div>
        <Header />
      </div>
      <div>
        <p>Aqui va el contenido de view flat</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ViewFlat;