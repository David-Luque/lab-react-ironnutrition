import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'; //=> bulma, bootstrap o cualquier libreria es recomendado importar en App porque es dode es accesible a todos los componentes; ya que todos se juntan en "App"
import foods from './foods.json';
import FoodBox from './components/FoodBox'; 
import Search from './components/Search';

class App extends React.Component {
  
  state = {
    allFoods: [...foods],//=>IMPORTANTE: no modificar el campo principal con todas las referecias("allFoods" en este caso); mejor mantenerlo estatico e inalterado para comparar los filtrados, busquedas etc... con él sin que l uego se pierda o altere la lista original
    searchWord: '',
    temporalNewFood: {
      name: '',
      calories: '',
      image: '',
      quantity: 0
    },
    showFoodForm: false
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

  submitForm = (event)=>{
    event.preventDefault()
    const copyOfFoods = [...this.state.allFoods]
    copyOfFoods.unshift(this.state.temporalNewFood)
    this.setState({allFoods: copyOfFoods, showFoodForm: false})
  }

  renderForm = ()=>{
    return (
      <form id="food-form" onSubmit={this.submitForm}> {/*=> en el "onSubmit" se deba escribir asi la funcion asociada para poder hacer el "prevent.default"*/}
        <input
          type="text" 
          name="name" 
          placeholder="name" 
          onChange={(event)=>{this.setState({temporalNewFood: {...this.state.temporalNewFood, name: event.target.value} })}} //=>los 2 argumentos que hay tras las llaves de "temporalNewFood:" significa que primero cogemos todo lo que ya tenia y luego le cambiamos el name
        />
        <input
          type="text" 
          name="calories" 
          placeholder="calories" 
          onChange={(event)=>{this.setState({temporalNewFood: {...this.state.temporalNewFood, calories: event.target.value} })}} 
        />
        <input
          type="text" 
          name="image" 
          placeholder="image" 
          onChange={(event)=>{this.setState({temporalNewFood: {...this.state.temporalNewFood, image: event.target.value} })}} 
        />
        <button type="submit">create</button>
      </form>
    )
  }

  
  render() {
    return (
      <div className="App">
        
        <button onClick={()=>this.setState({showFoodForm: true})}>Add new food</button>
        
        {this.state.showFoodForm && this.renderForm()}

        <Search updateSearchWord={this.updateSearchWord}/>
        <br />
        {this.renderFood()}
      </div>
    );
  }
  
}

export default App;
