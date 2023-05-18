
import './our-coffee.css';

const OurCoffee = (props) => {
    const {data, coffeeItem} = props;
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
        <div className="goods__wr">
            <div className="goods__our-best">                      
            {wrapper}            
            </div>
        </div>
    );
}   

export default OurCoffee;