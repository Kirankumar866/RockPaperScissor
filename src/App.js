import './App.css'
import {Component} from 'react'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {score: 0, isStarted: false, rondom: null, guessed: null}

  onClickIcon = event => {
    const rondom = Math.floor(Math.random() * choicesList.length)
    const guessed = event.target.id
    this.setState({isStarted: true, guessed, rondom})
    console.log(guessed)
  }

  onClickPlayAgain = () =>
    this.setState({isStarted: false, guessed: null, rondom: null})

  determineResult = () => {
    const {guessed, rondom} = this.state
    console.log('guessed', guessed)
    console.log('rondom', rondom)
    let result
    if (choicesList[guessed].id === choicesList[rondom].id) {
      console.log('drawpassed')
      result = "IT'S DRAW"
    } else if (
      (choicesList[guessed].id === 'ROCK' &&
        choicesList[rondom].id === 'SCISSORS') ||
      (choicesList[guessed].id === 'SCISSORS' &&
        choicesList[rondom].id === 'PAPER') ||
      (choicesList[guessed].id === 'PAPER' && choicesList[rondom].id === 'ROCK')
    ) {
      result = 'YOU WON'
      this.setState(prev => ({score: prev.score + 1}))
    } else {
      result = 'YOU LOSS'
      this.setState(prev => ({score: prev.score - 1}))
      console.log('losspassed')
    }
    console.log('resultpassed')
    return result
  }

  renderingResult = () => {
    const {guessed, rondom} = this.state

    return (
      <div className="resultContainer">
        <div className="resulIcontContainer">
          <div className="resultIcon">
            <p>You</p>
            <img
              src={choicesList[guessed].imageUrl}
              alt={choicesList[guessed].id}
              className="iconSize"
            />
          </div>
          <div className="resultIcon">
            <p>Opponent</p>
            <img
              src={choicesList[rondom].imageUrl}
              alt={choicesList[rondom].id}
              className="iconSize"
            />
          </div>
        </div>
        <div className="playAgainContainer">
          <h3>{this.determineResult()}</h3>
          <button type="button" onClick={this.onClickPlayAgain} className="btn">
            {' '}
            Play Again
          </button>
        </div>
      </div>
    )
  }

  renderingGame = () => (
    <div className="gameContainer">
      <div className="topContainer">
        <img
          src={choicesList[2].imageUrl}
          alt={choicesList[2].id}
          className="iconSize"
          id={2}
          onClick={this.onClickIcon}
        />
        <img
          src={choicesList[1].imageUrl}
          alt={choicesList[1].id}
          className="iconSize"
          id={1}
          onClick={this.onClickIcon}
        />
      </div>
      <div className="bottomContainer">
        <img
          src={choicesList[0].imageUrl}
          alt={choicesList[0].id}
          className="iconSize"
          id={0}
          onClick={this.onClickIcon}
        />
      </div>
    </div>
  )

  render() {
    const {isStarted} = this.state
    return (
      <div className="mainContainer">
        <div className="headerContainer">
          <div className="titlesContainer">
            <p className="title">ROCK</p>
            <p className="title">PAPER</p>
            <p className="title">SCISSORS</p>
          </div>
          <div className="scoreContainer">
            <p>Score</p>
            <p>0</p>
          </div>
        </div>
        {isStarted ? this.renderingResult() : this.renderingGame()}
      </div>
    )
  }
}

export default App
