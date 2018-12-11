import React, { Component } from 'react';
import logo from './Sun_Image.png';
import './App.css';
import moment from 'moment'
import Monthly from './monthlyTasks/Monthly'
import JournalEntry from './journalEntry/JournalEntry'
import EffectiveTasks from './effectiveTasks/effectiveTasks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/* className="App-logo" alt="logo"  */}
          <img src = {logo} className="App-logo" alt = "logo"/>
          <h1 className="App-title">The Happiness Habit</h1>
        </header>
          <Monthly />
          <JournalEntry />
          <EffectiveTasks />
      </div>
    );
  }
}

export default App;
