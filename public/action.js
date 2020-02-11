class Action {

  constructor(graphContext) {
    this.canvas = window.interactiveCanvas;
	const that = this;
	this.graphContext = graphContext;
    this.commands = {
	  PLAY: function(data) {
        that.play();
      },
      DEFAULT: function() {
        // do nothing, when no command is found
      },
    };
  }

  /**
   * Register all callbacks used by Google Assistant Action
   * executed during creation time.
   */
  setCallbacks() {

    const that = this;
    // declare assistant canvas action callbacks
    const callbacks = {
      onUpdate(data) {
        that.commands[data.command ? data.command.toUpperCase() :
          'DEFAULT'](data);
      },
    };
    // called by the Interactive Canvas web app once web app has loaded to
    // register callbacks

    this.canvas.ready(callbacks);
  }
  
  play() {		
	this.canvas.sendTextQuery(`Begin play`);
  }
  
}