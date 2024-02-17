import {useState,useEffect} from 'react';
import {getDocs, getFirestore, query, where, collection} from 'firebase/firestore'
import {useParams, Link} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';

import '../../assets/styles/pages/pageProduct.scss';
import '../../assets/styles/btn.scss';
import '../../assets/styles/fonts/riode.scss';
import ItemsCount from '../../components/ItemsCount';
import { useCart } from '../../hooks/useCart';





const PageDetailProduct = () => {
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const { addProduct, updateProduct, cartItems } = useCart();
  const {slugProduct} = useParams();

  const isInCart = product => {
      return !!cartItems.find(item => item.id === product.id);
  }

  useEffect(()=>{

    const db = getFirestore();

    //Quiero que me traiga el producto que tiene como slug producto-1
    const filtro = query(
      collection(db, 'items'),
      where('slug', '==', slugProduct)
    );

    //Obtener la data en base a filtro
    getDocs(filtro)
      .then(snapshot => {
        const dataExtraida = snapshot.docs.map(datos => datos.data())

        setProduct(dataExtraida[0])

        setImages([
          {
            original: dataExtraida[0].image,
            thumbnail: dataExtraida[0].image
          }
        ]);
      })



   

   
  },[]);

    function handlerQuantity(newQuantity) {
 
        if (newQuantity <= product.stock && newQuantity > 0) {
           
            product.quantity = newQuantity;
            setError(false);
            setQuantity(newQuantity);
        }else{
            setError(true);
        }
    }

  return (
    <main id="PageDetailProduct">
        <section className="product-single">
          <div className="container">
              <div className="media">
                <ImageGallery 
                  items={images} 
                  thumbnailPosition="left"
                  showPlayButton={false}
                  disableThumbnailScroll={true}
                  lazyLoad={true}
                />
              </div>
              <div className="data">

                <div className="breadcrumb">
                  <Link to={`/`}>
                    <i className='d-icon-home'></i>
                  </Link>
                  <Link to={`/productos`}>
                    Productos
                  </Link>
                  <span className='active'>
                    {product.title}
                  </span>
                </div>

                <h1 className='title__primary'>{product.title}</h1>
                <div className="meta">
                  {product.sku && <span className="sku">SKU: {product.sku}</span>}
                  {product.category && <span className="category">Categoría: {product.category}</span>}
                </div>
                <div className="price">
                  ${product.price}
                </div>
                <div 
                  className="description" 
                  dangerouslySetInnerHTML={{ __html: product.description }}></div>

                  <div className="add-to-cart">

                    <ItemsCount product={product} handlerQuantity={handlerQuantity}/>

                    {
                        isInCart(product) && 
                        <button 
                        onClick={() => updateProduct(
                          {
                            ...product,
                            itemCount: quantity
                          }
                        )}
                        className="btn btn-primary">
                          <i className='d-icon-bag'></i>Añadir más
                        </button>
                    }

                    {
                        !isInCart(product) && 
                        <button 
                        onClick={() => addProduct(
                          {
                            ...product,
                            itemCount: quantity
                          }
                        )}
                        className="btn btn-primary">
                          <i className='d-icon-bag'></i>Agregar al carrito
                        </button>
                    }
              
                  </div>

                  {error && <span className='error'>Solo tenemos {product.stock} productos en stock</span>}
              </div>
          </div>
        </section>
    </main>
  )
}

export default PageDetailProduct