/**
 * useState
 * Hook useState ability to encapsulate it local state in functional component
 * useState give back an array of 2 values. first: value that I want to store, second: set a function, setValue. Can have only single value, each Hook only hook into one value
 * const arr = [2,4]
 * const [a,b] == arr then a=2, b=4
 *
 * useEffect
 * side effect is some behavior that trigger from our function that affect something that exist outside of the scope of function, rely on value outside 
 * take 2 argument. first: callback function, second: array of dependency (state value, props). useEffect(() => {},[]);
 */


import { useState, useEffect } from 'react';  
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  // react run entire function every single time it need to re-render functional component
  // if value is the same then not re-render
  console.log('render'); 
  const [searchField, setSearchField] = useState(''); // initial value empty string
  //console.log({searchField}) // {}: to convert to object, remove it then just a string
  const [monsters, setMonsters] = useState([]); // initial empty array
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  // any fetch called is the side effect
  // only run this callback function if the value in dependency array have change
  useEffect(() => {
    //console.log('effect fired'); // check fetch not fire again
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // empty array because want to fetch at the very first time when the function mount

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);

    console.log('effect is firing');
    // want filter thought the monster, whenever either the monster array changes or the search field change
  }, [monsters, searchField]); 

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
