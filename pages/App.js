import './App.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BsQuestionSquare, BsDice1, BsDice2, BsDice3, BsDice4, BsDice5, BsDice6 } from 'react-icons/bs'
import { MdReplay } from 'react-icons/md'
import { HiShare } from 'react-icons/hi' 
import { FiHelpCircle } from 'react-icons/fi' 
import { AiFillCloseCircle } from 'react-icons/ai' 
import Confetti from './Confetti';

function App() {
  // Dice Variables
  const [dice1Value, setDice1Value] = useState('?');
  const [dice2Value, setDice2Value] = useState('?');
  // Number Variables
  const [numberArr, setNumberArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12])
  // Share Text Content
  const [text, setText] = useState('');
  // Game State
  const [gameInProgress, setGameInProgress] = useState(true)
  const [pickingNumber, setPickingNumber] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [clipBoardMessage, setClipBoardMessage] = useState(false)
  // Modal State
  const [modal, setModal] = useState(false)

  const resetDice = () => {
    setDice1Value('?')
    setDice2Value('?')
  }

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  }

  const rollDice = () => {
    setPickingNumber(true)
    let randomNumber1 = getRandomNumber();
    let randomNumber2 = getRandomNumber();
    setDice1Value(randomNumber1)
    setDice2Value(randomNumber2)
    if(
      numberArr.includes(randomNumber1) ||
      numberArr.includes(randomNumber2) ||
      numberArr.includes(randomNumber1 + randomNumber2)
    ) {
      return
    } else {
      loseGame(randomNumber1, randomNumber2)
    }
  }

  const renderDice =(diceNumber) => {
    if(diceNumber === 1) {
      return <BsDice1 />
    }
    if(diceNumber === 2) {
      return <BsDice2 />
    }
    if(diceNumber === 3) {
      return <BsDice3 />
    }
    if(diceNumber === 4) {
      return <BsDice4 />
    }
    if(diceNumber === 5) {
      return <BsDice5 />
    }
    if(diceNumber === 6) {
      return <BsDice6 />
    } else {
      return <BsQuestionSquare />
    }
  }

  const disableOrShowNumber = (number) => {
    if (!numberArr.includes(number)) {return false}
    if (dice1Value === number || dice2Value === number || dice1Value + dice2Value === number) {
      return true
    } else {
      return false
    }
  }

  const knockDownNumber = (number) => {
    setPickingNumber(false)
    let oldArr = [...numberArr];
    let newArr = oldArr.filter(num => num !== number)
    setNumberArr(newArr)
    resetDice()
  }

  const startGame = () => {
    console.log('Game Stared')
    setGameWon(false)
    setGameLost(false)
    setPickingNumber(false)
    setText('');
    setGameInProgress(true)
    setNumberArr([1,2,3,4,5,6,7,8,9,10,11,12])
    resetDice()
  }

  const generateTextOutput = () => {
    if(!gameWon){
      let allNumbers = [1,2,3,4,5,6,7,8,9,10,11,12]
      let booleanArr = allNumbers.map(num => numberArr.includes(num))
      let count = booleanArr.filter(value => value === false).length;
      setText(
        `MegaJackpot ${count}/12
        ${!booleanArr[0] ? '🟩': '🟥'} ${!booleanArr[1] ? '🟩': '🟥'} ${!booleanArr[2] ? '🟩': '🟥'} 
        ${!booleanArr[3] ? '🟩': '🟥'} ${!booleanArr[4] ? '🟩': '🟥'} ${!booleanArr[5] ? '🟩': '🟥'} 
        ${!booleanArr[6] ? '🟩': '🟥'} ${!booleanArr[7] ? '🟩': '🟥'} ${!booleanArr[8] ? '🟩': '🟥'} 
        ${!booleanArr[9] ? '🟩': '🟥'} ${!booleanArr[10] ? '🟩': '🟥'} ${!booleanArr[11] ? '🟩': '🟥'}`
      )
    } else {
      setText(
        `MegaJackpot
        🟩 🟩 🟩
        🟩 🟩 🟩
        🟩 🟩 🟩
        🟩 🟩 🟩
        🎉🏆🎉🏆🎉🏆
        🏆WINNER!!🎉`
      )
    }
  }

  const loseGame = () => {
    setTimeout(() => {
      setGameLost(true)
      setGameInProgress(false)
      generateTextOutput();
    }, 1500)
  }
  
  const winGame = () => {
    setGameWon(true)
    setGameInProgress(false)
    generateTextOutput()
  }

  const handleClipBoardMessage = () => {
    setClipBoardMessage(true);
    setTimeout(() => {
      setClipBoardMessage(false)
    }, 1500)
  }

  const handleShareBtn = () => {
    if (navigator.share) {
      navigator.share({
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      handleClipBoardMessage()
    }
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    if(!numberArr.length){
      winGame()
    }
  }, [numberArr])

  return (
    <div className={`appContainer ${gameWon ? 'winBG' : ''} ${gameLost ? 'loseBG' : ''}`}>
      <div className={'subContainer'}>
        {gameWon ? <Confetti className={'confetti'}/> : ''}
        <h1>Jackpot <FiHelpCircle className={'helpIcon'} onClick={toggleModal}/></h1>
        <div className={'diceContainer'}>
          {renderDice(dice1Value)}
          {renderDice(dice2Value)}
        </div>
        <button
          disabled={disableOrShowNumber(1) ? '' : 'disabled'}
          className={numberArr.includes(1) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >1</button>
        <button
          disabled={disableOrShowNumber(2) ? '' : 'disabled'}
          className={numberArr.includes(2) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >2</button>
        <button
          disabled={disableOrShowNumber(3) ? '' : 'disabled'}
          className={numberArr.includes(3) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >3</button>
        <button
          disabled={disableOrShowNumber(4) ? '' : 'disabled'}
          className={numberArr.includes(4) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >4</button>
        <button
          disabled={disableOrShowNumber(5) ? '' : 'disabled'}
          className={numberArr.includes(5) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >5</button>
        <button
          disabled={disableOrShowNumber(6) ? '' : 'disabled'}
          className={numberArr.includes(6) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >6</button>
        <button
          disabled={disableOrShowNumber(7) ? '' : 'disabled'}
          className={numberArr.includes(7) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >7</button>
        <button
          disabled={disableOrShowNumber(8) ? '' : 'disabled'}
          className={numberArr.includes(8) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >8</button>
        <button
          disabled={disableOrShowNumber(9) ? '' : 'disabled'}
          className={numberArr.includes(9) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >9</button>
        <button
          disabled={disableOrShowNumber(10) ? '' : 'disabled'}
          className={numberArr.includes(10) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >10</button>
        <button
          disabled={disableOrShowNumber(11) ? '' : 'disabled'}
          className={numberArr.includes(11) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >11</button>
        <button
          disabled={disableOrShowNumber(12) ? '' : 'disabled'}
          className={numberArr.includes(12) ? 'unselected number' : 'selected number'}
          onClick={(e) => {knockDownNumber(parseInt(e.target.innerHTML))}}
          >12</button>
        <br></br>
        <div className='btnContainer'>
          {!gameInProgress ?
          (<>
            <button className={'wideBtn'} onClick={startGame}><MdReplay className={'buttonIcons'} />Play Again<></></button>
            <button onClick={handleShareBtn} className={'wideBtn'}><HiShare className={'buttonIcons'}/>Share Result</button>
          </>) : 
          (
            <button className={'wideBtn '} onClick={rollDice} disabled={pickingNumber ? 'disabled' : ''}><BsDice6 className={'buttonIcons'}/> Roll Dice <BsDice3 className={'buttonIcons'} /></button>
          )}
        </div>
        <p className={clipBoardMessage ? 'clipBoardMessage' : 'clipBoardMessage none'}>Copied to clipboard!</p>
        {modal &&
        (<div className={'rulesModalContainer'}>
            <div className={'overlay'} onClick={toggleModal}></div>
            <div className={'rulesModal'}>
                <AiFillCloseCircle
                className={'exitModal'}
                onClick={toggleModal}
                />
                <p></p>
                <h3>How To Play</h3>
                <p>
                    Begin the game by rolling the dice.
                    Once the dice have been rolled you have a choice of what number you wish to 'knock down'.
                    You can choose any number on either dice or the number the two dice add up to.
                    For example, if I roll a 4 and a 5. I can knock down 4, 5 or 9.
                </p>
                <h3>How You Lose</h3>
                <p>
                    You lose the game when you roll the dice and you are unable to knock down any numbers.
                </p>
                <h3>How You Win</h3>
                <p>
                    The game is won when you knock down all of the numbers successfully.
                    And I can say from personal experience... It is truly glorious!
                </p>
            </div>
        </div>)}
      </div>
    </div>
  );
}

export default App;