import {Component} from 'react'
import './App.css'

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
  state = {
    score: 0,
    isStarted: false,
    random: null,
    guessed: null,
    result: null,
  }

  onClickIcon = event => {
    const random = Math.floor(Math.random() * choicesList.length)
    const guessed = parseInt(event.target.id, 10)
    this.setState({isStarted: true, guessed, random}, this.determineResult)
  }

  onClickPlayAgain = () => {
    this.setState({isStarted: false, guessed: null, random: null, result: null})
  }

  determineResult = () => {
    const {guessed, random} = this.state
    let result
    if (choicesList[guessed].id === choicesList[random].id) {
      result = "IT'S DRAW"
      this.setState({result})
    } else if (
      (choicesList[guessed].id === 'ROCK' &&
        choicesList[random].id === 'SCISSORS') ||
      (choicesList[guessed].id === 'SCISSORS' &&
        choicesList[random].id === 'PAPER') ||
      (choicesList[guessed].id === 'PAPER' && choicesList[random].id === 'ROCK')
    ) {
      result = 'YOU WON'
      this.setState(prevState => ({score: prevState.score + 1, result}))
    } else {
      result = 'YOU LOSS'
      this.setState(prevState => ({score: prevState.score - 1, result}))
    }
  }

  renderingResult = () => {
    const {guessed, random, result} = this.state

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
              src={choicesList[random].imageUrl}
              alt={choicesList[random].id}
              className="iconSize"
            />
          </div>
        </div>
        <div className="playAgainContainer">
          <h3>{result}</h3>
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
    const {isStarted, score} = this.state
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
            <p>{score}</p>
          </div>
        </div>
        {isStarted ? this.renderingResult() : this.renderingGame()}
      </div>
    )
  }
}

export default App
