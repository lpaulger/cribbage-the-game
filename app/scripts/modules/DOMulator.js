define([], function(){
  'use strict';

  function DOMulatorConstructor(selector){
    return new DOMulator(selector);
  }

  function DOMulator(selector){
    if(typeof selector === 'string') {
      this.selector = selector;
      this.element = document.querySelectorAll(selector)[0];
    }
    else if(typeof selector === 'object')
      this.element = selector;
  }

  DOMulator.prototype.html = function(htmlToSet){

    if(!this.element)
      return;

    if(htmlToSet)
      this.element.innerHTML = htmlToSet;

    return this.element.innerHTML;
  };

  DOMulator.prototype.addClass = function(classname){
    if(this.element)
      return this.element.classList.add(classname);
    else
      return;
  };

  DOMulator.prototype.on = function(eventName, handler){
    if(this.element)
      return this.element.addEventListener(eventName, handler);
    else
      return;
  };

  DOMulator.prototype.off = function(eventName, handler){
    if(this.element)
      return this.element.removeEventListener(eventName, handler);
    else
      return;
  };

  return DOMulatorConstructor;
});
