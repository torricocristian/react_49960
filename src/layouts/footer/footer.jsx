import '../../assets/styles/footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useState,useEffect } from 'react';


const Footer = () => {
    const [socials, setSocials ] = useState('')

    useEffect(()=>{
       
    },[]);

   

    return (
        <footer>
            <div className="container">
                <div className="copy">
                    Hecho con ♥️ por <a href="https://tiendita.com">Tiendita</a>
                </div>
                <div className="socials">
                    {
                        socials.facebook &&
                            <a href={socials.facebook} target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                    }
                    
                    {
                        socials.instagram &&
                            <a href={socials.instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer;