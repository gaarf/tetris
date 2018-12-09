import * as React from 'react';
import Game from '../models/Game';
import GameComponent from '../components/Game';

export type Props = {};
export type State = {
  game: Game;
  tick: number;
};

class GameContainer extends React.Component<Props, State> {
  frame = (cb?:() => void) => {
    this.setState({
      tick: window.performance.now(),
    }, cb); 
  };

  state = {
    mounted: false,
    game: new Game(this.frame),
    tick: 0,
  };

  handleKeydown = (event:KeyboardEvent) => {
    const { game } = this.state;
    game.start();
    game.handleKeydown(event);
    this.frame();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  public render() {
    const { game, tick } = this.state;
    return (
      <>
        <GameComponent game={game} tick={tick} />
        <audio src="tetris-gameboy-02.mp3" autoPlay loop />
      </>
    );;
  }
}

export default GameContainer;
