
import React from 'react';
import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Main from './pages';
import Goods from './pages/goods';
import Coffee from './pages/coffee';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'JSolimo Coffee Beans', price: 10.73, weight: 2, ourbest: true, country: 'Brazil', img: require('./components/images/circ1.png'), id: 1, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'Presto Coffee Beans', price: 15.99, weight: 1, ourbest: true, country: 'Brazil', img: require('./components/images/circ2.png'), id: 2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 16.99, weight: 1, ourbest: true, country: 'Kenya', img: require('./components/images/item.png'), id: 3, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: true, country: 'Kenya', img: require('./components/images/circ3.png'), id: 4, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: true, country: 'Columbia', img: require('./components/images/circ3.png'), id: 5, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'JAROMISTICO Coffee', price: 6.99, weight: 1, ourbest: true, country: 'Brazil', img: require('./components/images/circ3.png'), id: 6, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: true, country: 'Columbia', img: require('./components/images/circ3.png'), id: 7, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ3.png'), id: 8, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'JSolimo Coffee Beans', price: 10.73, weight: 2, ourbest: false, country: 'Brazil', img: require('./components/images/circ1.png'), id: 9, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'Presto Coffee Beans', price: 15.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ2.png'), id: 10, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 16.99, weight: 1, ourbest: false, country: 'Kenya', img: require('./components/images/item.png'), id: 11, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Kenya', img: require('./components/images/circ3.png'), id: 12, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Columbia', img: require('./components/images/circ3.png'), id: 13, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'JAROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ3.png'), id: 14, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Columbia', img: require('./components/images/circ3.png'), id: 15, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ3.png'), id: 16, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'JSolimo Coffee Beans', price: 10.73, weight: 2, ourbest: false, country: 'Brazil', img: require('./components/images/circ1.png'), id: 17, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'Presto Coffee Beans', price: 15.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ2.png'), id: 18, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 16.99, weight: 1, ourbest: false, country: 'Kenya', img: require('./components/images/item.png'), id: 19, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Kenya', img: require('./components/images/circ3.png'), id: 20, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Columbia', img: require('./components/images/circ3.png'), id: 21, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'JAROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ3.png'), id: 22, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Columbia', img: require('./components/images/circ3.png'), id: 23, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {name: 'AROMISTICO Coffee', price: 6.99, weight: 1, ourbest: false, country: 'Brazil', img: require('./components/images/circ3.png'), id: 24, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
      ],
      filter: 'all',
      number: ''

    };
  }
  filterCoffee = (items, filter) => {
    switch (filter) {
        case 'Brazil':
            return items.filter(item => item.country === 'Brazil');
        case 'Kenya':
            return items.filter(item => item.country === 'Kenya');
        case 'Columbia':
            return items.filter(item => item.country === 'Columbia');
        default:
            return items
    }    
  }
  onFilterSelect = (filter) => {
    this.setState({filter});
  }
  onFilterItem = (number) => {
    this.setState({number: number});
  }
  render() {
    const {data, img, filter, number} = this.state;
    const newArr = data.filter(item => item.ourbest); 
    const countryCoffee = this.filterCoffee(data, filter); 
     
return (
    <Router>
    <Routes>
        <Route exact path='/' element={<Main newArr={newArr} img={img}/>} />
        <Route path='/goods' element={<Goods filter={filter} onFilterSelect={this.onFilterSelect} 
        countryCoffee={countryCoffee} coffeeItem={this.onFilterItem} number={number}/>} />
        <Route path='/coffee' element={<Coffee coffeeItem={this.onFilterItem} data={countryCoffee}/>} />       
    </Routes>
    </Router>
);
}
}
  
export default App;
