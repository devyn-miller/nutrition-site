import React from 'react';
import axios from 'axios';

class FoodLogging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodSearch: '',
      foodItems: [],
      selectedFood: null,
      quantity: 1,
      mealType: 'Breakfast',
      date: new Date().toISOString().split('T')[0],
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  searchFood = async () => {
    try {
      const response = await axios.get(`/api/food/search/${this.state.foodSearch}`);
      this.setState({ foodItems: response.data });
    } catch (error) {
      console.error('Error occurred while searching food.', error);
    }
  }

  logFood = async () => {
    try {
      const { date, mealType, selectedFood, quantity } = this.state;
      await axios.post('/api/food/log', { date, meal_type: mealType, food_id: selectedFood.id, quantity });
      alert('Food logged successfully.');
    } catch (error) {
      console.error('Error occurred while logging food.', error);
    }
  }

  render() {
    return (
      <div className="food-logging">
        <h2>Food Logging</h2>
        <input type="text" name="foodSearch" value={this.state.foodSearch} onChange={this.handleInputChange} placeholder="Search food" />
        <button onClick={this.searchFood}>Search</button>
        <select name="selectedFood" value={this.state.selectedFood} onChange={this.handleInputChange}>
          {this.state.foodItems.map(food => (
            <option key={food.id} value={food}>{food.name}</option>
          ))}
        </select>
        <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleInputChange} min="1" />
        <select name="mealType" value={this.state.mealType} onChange={this.handleInputChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <input type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />
        <button onClick={this.logFood}>Log Food</button>
      </div>
    );
  }
}

export default FoodLogging;
</option>