import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {
  
  state =  {
    isFiltered: false,
    pendingGuest: "",
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

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });
  
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
  
  toggleFilter = () => 
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    });
  }
  

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
    <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>An App to keep you organized for your event!</p>
        <form onSubmit={this.newGuestSubmitHandler}>
            <input 
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest} 
              placeholder="Invite Someone" 
            />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input 
              type="checkbox"
              onChange={this.toggleFilter}
              checked={this.state.isFiltered}
            /> 
            Hide those who haven't responded
          </label>
        </div>

      <Counter 
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
      />

      <GuestList 
        guests={this.state.guests}
        toggleConfirmationAt={this.toggleConfirmationAt} 
        toggleEditingAt={this.toggleEditingAt}
        setNameAt={this.setNameAt}
        isFiltered={this.state.isFiltered}
        removeGuestAt={this.removeGuestAt}
        pendingGuest={this.state.pendingGuest}
      />

      </div>
    </div>
    );
  }
}

export default App;
