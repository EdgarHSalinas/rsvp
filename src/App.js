import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

class App extends Component {
  
  state =  {
    guests: [
      {
        name: 'Edgar Salinas',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'React RSVP',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Create App',
        isConfirmed: false,
        isEditing: true
      }
    ]
  }

  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  // factored out toggleGuestPropertyAt to handle several events now we call below
  toggleConfirmationAt = index => 
    this.toggleGuestPropertyAt("isConfirmed", index);
  
  toggleEditingAt = index => 
    this.toggleGuestPropertyAt("isEditing", index);
  
  setNameAt = (name, indexToChange) => 
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          name
        };
      }
      return guest;
    })
  });
  

  getTotalInvited = () => this.state.guests.length;

  // To Do
  // getAttendingGuests = () =>
  // getUnconfirmedGuests = () =>
  render() {
    return (
    <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>An App to keep you organized for your event!</p>
        <form>
            <input type="text" value="Safia" placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input type="checkbox" /> Hide those who haven't responded
          </label>
        </div>
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>

      <GuestList 
        guests={this.state.guests}
        toggleConfirmationAt={this.toggleConfirmationAt} 
        toggleEditingAt={this.toggleEditingAt}
        setNameAt={this.setNameAt}
      />

      </div>
    </div>
    );
  }
}

export default App;
