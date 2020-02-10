class Action {

  constructor(graphContext) {
    this.canvas = window.interactiveCanvas;
	const that = this;
	this.graphContext = graphContext;
    this.commands = {
	  ADDOBJECT: function(data) {
        that.addNode(data.label);
      },
	  ADDEDGE: function(data) {
        that.addEdge(data.from, data.to, data.label);
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
  
  addNode(label) {
		this.graphContext.cy.add({
			group: 'nodes',
			data: { id:label, label: label, weight: 10}
		});
	this.graphContext.cy.fit();
	this.canvas.sendTextQuery(`Node added`);
  }
  
   addEdge(from, to, label) {
		this.graphContext.cy.add({
			group: 'edges', data: { id: from+"_"+to, source: from, target: to, label: label }
		});
	this.canvas.sendTextQuery(`Edge added`);
  }
}