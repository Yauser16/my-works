
import '../components/app-cp/app-cp.css';
import Footer from '../components/footer/footer';
import BeansLogoBlack from '../components/beanslogoblack/beanslogoblack';
import HeaderCp from '../components/header-cp/header-cp';
import MainCp from '../components/main-cp/main-cp';
import CpFilter from '../components/cp-filter/cp-filter';



const AppCp = (props) => {
    const {countryCoffee, number,coffeeItem} = props;
    const select = countryCoffee.filter(item => item.id === number);
    if (number === '') { 
        return (            
        <div className="App-cp">
            <HeaderCp/> 
            <MainCp/> 
            <CpFilter data={countryCoffee} filter={props.filter} coffeeItem={props.coffeeItem}
            onFilterSelect={props.onFilterSelect} number={number}/>                
            <Footer/> 
            <BeansLogoBlack/>  
        </div>
        )
    } else {        
        return (
        <div className="App-cp">
            <HeaderCp/> 
            <div className="item__page__wrapper">
                <div className="item__page">
                    <img src={select[0].img} alt="товар"/>                    
                </div>
                <div className="item__page__tex">
                    <p className="about">About it</p>
                    <BeansLogoBlack/> 
                    <div className="item__page__count">
                        <p className="item__page__h__text">Country: <span className="item__page__country__name">{select[0].country}</span></p>                        
                    </div>   
                    <div className="item__page__desc">
                        <p className="item__page__h__text">Description: <span className="item__page__desc__name">{select[0].desc}</span></p>                        
                    </div> 
                    <div className="item__page__price">
                        <p className="item__page__price__text">Price: <span className="item__page__price__name">{select[0].price+'$'}</span></p>
                    </div>                    
                </div>
                <span className="close__page"onClick={() => coffeeItem('')}>+</span>
            </div>                    
            <Footer/> 
            <BeansLogoBlack/>  
        </div> 
    )}
    }

export default AppCp;