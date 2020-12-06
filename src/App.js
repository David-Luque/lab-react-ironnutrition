import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'; //=> bulma, bootstrap o cualquier libreria es recomendado importar en App porque es dode es accesible a todos los componentes; ya que todos se juntan en "App"
import foods from './foods.json';
import FoodBox from './components/FoodBox'; 
import FormField from './components/FormField';
import Search from './components/Search';

class App extends React.Component {
  
  state = {
    allFoods: [...foods],//=>IMPORTANTE: no modificar el campo principal con todas las referecias("allFoods" en este caso); mejor mantenerlo estatico e inalterado para comparar los filtrados, busquedas etc... con él sin que l uego se pierda o altere la lista original
    searchWord: ''
  }

  updateSearchWord = (_value) => {
    this.setState({searchWord: _value})
  }

  chechForFood = () => {
    const filteredFoods = this.state.allFoods.filter(food => {
      return food.name.toLowerCase().includes(this.state.searchWord.toLowerCase())//=> los "toLowerCase()" son para asegurarnos que en la busqueda compare todos los valores escritos en minusculas, tanto los recibidos del formulario como los nombres de cada alimento del "allFoods"
    })
    return filteredFoods//=> aqui tambien podriamos haber hecho, en lugar de esta linea, declarar un nuvevo campo con un array vacío en el state e igualar su contenido a "filteredFoods"; luego pasar por el ".map" del "renderFoods()" ese campo del state: this.setState( {filteredFoods: [...filteredFoods]} ) 
  }

  renderFood = () => { 
    const finalListOfFoods = this.chechForFood()//=> se define "finalListOfFoods" para que se almacene en ella el resultado retornado en la funcion "chechForFood()", que es la lista de alimentos filtrados que queremos renderizar
    return finalListOfFoods.map((food, index)=>{
      return (
      <FoodBox 
        key = {index} 
        name={food.name}  
        calories={food.calories} 
        image={food.image} 
      />
      )
    })
    
    
  }

  renderForm = () => { 
    return(
      <div>
        <form onSubmit={()=>this.addFood()}>
          <FormField />
          <button type="submit"></button>
        </form>
      </div>
    ) 
  }

  // addFood = ()=>{
      
  // }
  
  render() {
    return (
      <div className="App">
        {/* <button onClick={()=>this.renderForm()}>Add new food</button> */}
        <Search updateSearchWord={this.updateSearchWord}/>
        <br />
        {this.renderFood()}
      </div>
    );
  }
  
}

export default App;
