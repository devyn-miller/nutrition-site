import React from 'react';

class Personalization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: '',
      diet_type: '',
      metabolism_rate: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Call the API to update the user's profile
    // This function is not implemented in this file
    this.updateUserProfile();
  }

  render() {
    return (
      <div className="personalization">
        <h2>Personalization and Flexibility</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Goal:
            <input type="text" name="goal" value={this.state.goal} onChange={this.handleInputChange} />
          </label>
          <label>
            Diet Type:
            <input type="text" name="diet_type" value={this.state.diet_type} onChange={this.handleInputChange} />
          </label>
          <label>
            Metabolism Rate:
            <input type="text" name="metabolism_rate" value={this.state.metabolism_rate} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Update Profile" />
        </form>
      </div>
    );
  }
}

export default Personalization;
