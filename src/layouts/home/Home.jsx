import {useState,useEffect} from 'react'
import { Product } from '../../components/Product';
import Title from '../../components/Title';
import '../../assets/styles/slider.scss'
import '../../assets/styles/pages/home.scss'
import {useParams} from 'react-router-dom';
// import Login from '../../components/Login';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
// import 'swiper/swiper.scss';

SwiperCore.use([Pagination]);

const Home = () => {
    const [products, setProducts] = useState([]);
    const [imagesHero, setImagesHero] = useState([]);

    useEffect(()=>{

        //Get products featured from API
        setImagesHero([
            {
                id: 1,
                title: 'banner',
                image: 'https://nikeclprod.vtexassets.com/assets/vtex.file-manager-graphql/images/100f8ab2-6a48-44b2-8bfb-d7b4a90a5b74___72e30d180d3ab3e7a1d29ab57eb88316.jpg'
            }
        ])

     
        //Get banner from API
        
    },[]);


    return (
        <main>
            {
                <section id="hero">
                    <div className="container">
                    <Swiper
                        id="main"
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        className="slider slider__primary"
                    >
                        {imagesHero.map((image) => (
                            <SwiperSlide key={image.id}>
                                <img
                                    src={image.image}
                                    alt={image.title}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    </div>
                </section>
            }

            {
                products.length > 0 &&
                <section className='featured-products'>
                    <div className="container">
                        <h2>
                            <Title title="Productos Destacados" type="primary"/>         
                        </h2>
                        <div className="row">
                            {
                                products && products.map(product => <Product key={product.id} product={product}></Product>)
                            }
                        </div>
                    </div>
                </section>
            }
        </main>
    )
}

export default Home