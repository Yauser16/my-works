
import '../components/coffee/coffee.css';
import Footer from '../components/footer/footer';
import BeansLogoBlack from '../components/beanslogoblack/beanslogoblack';
import Navbar from '../components/Navbar/index';
import cof from '../components/images/cof.png';
import {useState} from 'react';

const Coffee = (props) => {
    const {coffeeItem, data} = props; 
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {        
        setIsActive(current => !current);
    };
    const wrapper = data.map(item => {           
        return ( 
            <div className="goods__stock" onClick={() => coffeeItem(item.id)} key={item.id}>
                <img src={item.img} alt="our coffee" className="goods__coffeeshop" />
                <p className="goods__cofee" key="">{item.name} {item.weight + "kg"}</p>
                <p className="goods__cofeeshop">{item.country}</p>
                <p className="goods__cofeeprice">{item.price + "$"}</p>
            </div>            
                )})
            return (  
        <>
            <section className="f__y__pleasure">
                <Navbar/>
                <h3>For your pleasure</h3>
            </section>
            <section className="f__y__about__our__goods">           
                <section className="f__y__about__coffee">
                    <div className="f__y__wrapper">
                        <div className="f__y__about__img" >
                            {<img src={cof} alt="about our goods" />}
                        </div>
                        <div className="f__y__text__wrapper">
                            <div className="f__y__text">
                                <h4>About our goods</h4>
                                <BeansLogoBlack/>
                                <p>
                                Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. <br/><br/>
                                Afraid at highly months do things on at. Situation recommend objection do intention<br/>
                                so questions.<br/> As greatly removed calling pleased improve an. Last ask him cold feel<br/>
                                met spot shy want. Children me laughing we prospect answered followed. At it went<br/>
                                is song that held help face.
                                </p>
                            </div>
                        </div> 
                    </div>
                </section>
                
                <div className="f__y__line"></div>
            </section>
            <div className="block" style={{
                height: isActive ? '250%' : '670px',
            }
            }onClick={() => handleClick()}></div>
            <div className="f__y__goods__wr" style={{
                overflow: isActive ? '' :' hidden',
                height: isActive ? '' :  '620px',
                }}>
                <div className="f__y__goods__our-best">                      
                {wrapper}            
                </div>
            </div>            
            <Footer/> 
            <BeansLogoBlack/>
        </>       
        
        )
    } 

export default Coffee;