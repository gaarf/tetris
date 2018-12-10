import * as React from 'react';
import Game from './containers/Game';

class App extends React.Component {
  public render() {
    return (
      <>
        <div id="game">
          <Game />
        </div>
        <audio src="tetris-gameboy-02.mp3" controls autoPlay loop />
      </>
    );
  }
}
export default App;
