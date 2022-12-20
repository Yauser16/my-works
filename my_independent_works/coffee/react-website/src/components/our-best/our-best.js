
import './our-best.css';
/* import circ1 from '../images/circ1.png'; */

const OurBest = (props) => {
    const {newArr} = props;
    const best = newArr.map(item => {
        /* const require = "require(" + item.img + ")"; */
              return ( 
            <div className="stock" key={item.id}>
                <img src={item.img} alt="our coffee" className="coffeeshop" />
                <p className="cofee">{item.name} {item.weight + "kg"}</p>               
                <p className="cofeeprice">{item.price + "$"}</p>
            </div>
            
                )})
      
    return (
        <div className="our-best">            
            <h3 className="about-us">
                Our best
            </h3>
            <div className="o__b__wrap">
           {best} 
           </div>           
        </div>
    );
}   

export default OurBest;
