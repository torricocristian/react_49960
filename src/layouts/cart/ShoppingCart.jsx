import { useCart } from '../../hooks/useCart';
import ItemsCount from '../../components/ItemsCount';
import { useParams, Link } from 'react-router-dom';
import '../../assets/styles/fonts/riode.scss';
import '../../assets/styles/pages/PageCart.scss';
import '../../assets/styles/alert.scss';
import placeholder from '../../assets/images/placeholder.jpg';
import '../../assets/styles/btn.scss';
import { useState,useEffect } from 'react';


import {addDoc, getFirestore, query, where, collection} from 'firebase/firestore'


const ShoppingCart = () => {

  const { increase, decrease, removeProduct, cartItems, itemCount, total } = useCart();
  const [whatsapp, setWhatsapp ] = useState('')

  useEffect(()=>{
    
  },[]);

  function handlerQuantity(newQuantity, product) {
    if( newQuantity > product.quantity && newQuantity <= product.stock ){
      increase(product);
    }
    else if( newQuantity < product.quantity && newQuantity > 0 ){
      decrease(product);
    }
  }

  function removeItem(product) {
    removeProduct(product);
  }

  function sendOrder(){

    console.log(cartItems, 'cartItems');

    //Queremos pasarle solamente: id, price, title

    const itemsElegidos = cartItems.map( item => ( {title: item.title, price: item.price, id: item.id}  ));

    const order = {
      buyer: {
          name: "Maria",
          phone: "123123",
          email: "maria@maria.com"
      },
      items: itemsElegidos,
      total: total
    }

    const db = getFirestore(); //instanciar

    const orderCollection = collection(db, 'ordenes')

    addDoc(orderCollection, order)
        .then( ({id}) => console.log(id, 'dar el id') )
  }

  return (
    <main id="ShoppingCart">
      <section className="shop-table">
        <div className="container">
          {
            cartItems.length > 0 &&
            <div className="row header">
              <div className="column product">
                Producto
              </div>
              <div className="column price">
                price
              </div>
              <div className="column quantity">
                Cantidad
              </div>
              <div className="column subtotal">
                Subtotal
              </div>
            </div>
          }
          {
            cartItems.length > 0 && cartItems.map(item => 
              <div className="row" key={item.id}>
                <span className='deleteItem' onClick={() => removeItem(item)}>
                  <i className="d-icon-times-circle"></i>
                </span>
                <Link to={'/productos/' + item.slug} className="column product">
                  <figure>
                    {
                      item.image ? <img src={item.image} alt={item.title} /> : <img src={placeholder} alt={item.title} />
                    }
                  </figure>
                  <span className="name">
                    {item.title}
                  </span>
                </Link>
                <div className="column price">
                  ${item.price}
                </div>
                <div className="column quantity">
                  <ItemsCount product={item} handlerQuantity={handlerQuantity}/>
                </div>
                <div className="column subtotal">
                  ${item.price * item.quantity}
                </div>
              </div>
            ) 
          }


          {
            cartItems.length === 0 && <div className="alert alert__warning">No hay productos en el carrito. <Link to={`/productos`}>Añadir productos</Link></div>
          }


            {
              cartItems.length > 0 &&
                <button 
                onClick={sendOrder}
                className="btn btn-primary">
                  <i className='d-icon-truck'></i>Realizar pedido
                </button>
            }
    
        </div>
      </section> 
    </main>
  )
}
export default ShoppingCart