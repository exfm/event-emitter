(function(){

"use strict";

// constructor
function EventEmitter(){
    this.listeners = {};
}

// add a listener
EventEmitter.prototype.on = function(type, listener, useCapture){
    if(!this.listeners[type]){
        this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
}

// support for older ways of adding listeners
EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

// remove a listener
EventEmitter.prototype.removeListener = function(type, fn){
	if(typeof this.listeners[type] != 'undefined') {
        for(var i = 0, l; l = this.listeners[type][i]; i++){
            if(l == fn) break;
        }
    this.listeners[type].splice(i, 1);
    }
};

// support for older ways of removing listeners
EventEmitter.prototype.removeEventListener = EventEmitter.prototype.removeListener;

// trigger an event to all it's listeners
EventEmitter.prototype.emit = function(type, object){
    if (
        this.listeners 
        && typeof this.listeners[type] != 'undefined' 
        && this.listeners[type].length
    ) {
		var array = this.listeners[type].slice();
    	for (var i = 0, fn; fn = array[i]; i++) {
    		fn.apply(object, [object]);
   		 }
    	return true;          
	}
    return false;
};

// trigger an event, then remove all listeners
EventEmitter.prototype.emitOnce = function(type, object){
    if (
        this.listeners 
        && typeof this.listeners[type] != 'undefined' 
        && this.listeners[type].length
    ) {
		var array = this.listeners[type].slice();
    	for (var i = 0, fn; fn = array[i]; i++) {
    		fn.apply(object, [object]);
    		this.removeListener(type, fn);
   		 }
    	return true;          
	}
    return false;
};


// check if we've got require
if(typeof module !== "undefined"){
    module.exports = EventEmitter;
}
else{
    window.EventEmitter = EventEmitter;
}

}()); // end wrapper