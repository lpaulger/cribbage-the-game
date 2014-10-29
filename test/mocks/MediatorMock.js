define([],function(){
    'use strict';
    function Mediator(){
      this.publish = jasmine.createSpy('publish');
    }

    return Mediator;
  });
