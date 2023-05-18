

import './cp-filter.css';
import OurCoffee from '../our-coffee/our-coffee';

const CpFilter = (props) => {
    const buttonsData = [
        {name: 'Brazil', label: 'Brazil'},
        {name: 'Kenya', label: 'Kenya'},
        {name: 'Columbia', label: 'Columbia'}
    ];
    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' :'btn-outline-light';
        return (
            <button type="button"
                    className={`sort ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)}>
                    <p>{label}</p>
            </button>
        )
    })
    return (
    <>
        <section className="filter__menu">
            <div className="sortir">
                <p className="look">Looking for</p>
                <button key="all" 
                onClick={() =>props.onFilterSelect("all")}> 
                <p className="here">start typing here..</p>    
                </button>
            </div>        
            <div className="filter">
                <p className="look">Or filter</p>
                {buttons}                
            </div>
        </section> 
        <OurCoffee data={props.data} coffeeItem={props.coffeeItem} />
    </>  
    )
};

export default CpFilter;