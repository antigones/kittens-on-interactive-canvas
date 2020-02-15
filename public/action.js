class Action {

  constructor(context) {
    this.canvas = window.interactiveCanvas;
    const that = this;
    this.context = context;
    this.commands = {
      STAND: function () {
        that.stand();
      },
	  CHEER: function () {
        that.cheer();
      },
	  EAT: function () {
        that.eat();
      },
	  ROLL: function () {
        that.roll();
      },
      DEFAULT: function () {
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
  
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  fade(object, src) {
    var e = object;
    e.className = "fadeout";
	console.log(e);
    sleep(500).then(() => {
      e.src = src;
      e.className = "fadein";
    });
  }

  stand() {
	console.log('stand function');
    fade(this.context.imgContext, "img/cat_standing.png");
  }
  
  eat() {
	fade(this.context.imgContext, "img/cat_eating.png");
  }

  stand() {
    fade(this.context.imgContext, "img/cat_standing.png");
  }

  cheer() {
    fade(this.context.imgContext, "img/cat_cheer.png");
  }

  roll() {
    fade(this.context.imgContext, "img/cat_roll.png");
  }

}