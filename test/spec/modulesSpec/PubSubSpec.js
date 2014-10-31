define(['scripts/modules/PubSub'], function(PubSub) {
  'use strict';
  describe('PubSub', function() {
    describe('Constructor', function(){
      it('should be an object', function(){
        expect(typeof PubSub).toEqual('object');
      });
    });

    describe('unsubscribe', function(){
      var test = {};
      beforeEach(function(){
        test.callback = function(){};
      });

      describe('and not a channel', function(){
        it('should return false', function(){
          expect(PubSub.unsubscribe('test', test.callback)).toEqual(false);
        });
      });

      describe('and channel exists with a callback', function(){
        beforeEach(function(){
          PubSub.subscribe('test', test.callback);
        });

        it('should return true', function(){
          expect(PubSub.unsubscribe('test', test.callback)).toEqual(true);
        });
      });

      describe('and channel exists but has no callbacks', function(){
        beforeEach(function(){
          PubSub.subscribe('test', test.callback);
          PubSub.unsubscribe('test', test.callback);
        });

        it('should return false', function(){
          expect(PubSub.unsubscribe('test', test.callback)).toEqual(false);
        });
      });
    });

    describe('subscribe', function(){
      describe('when I am subscribing to a new event', function(){
        var test = {};
        beforeEach(function(){
          test.callback = function(){};

          PubSub.subscribe('test', test.callback);
        });

        afterEach(function(){
          PubSub.unsubscribe('test', test.callback);
        });

        it('should create the channel', function(){
          expect(PubSub.channels.test).toBeDefined();
        });

        it('should bind my callback to that event', function(){
          expect(PubSub.channels.test.length).toEqual(1);
        });
      });
    });

    describe('publish', function(){
      describe('when nothing is subscribed to the event', function(){
        it('should return false', function(){
          expect(PubSub.publish('fake-event')).toEqual(false);
        });
      });

      describe('when one subscriber', function(){
        var test = {};
        beforeEach(function(){
          test.callback = function(){};

          spyOn(test, 'callback');

          PubSub.subscribe('test', test.callback);
          PubSub.publish('test');
        });

        afterEach(function(){
          PubSub.unsubscribe('test', test.callback);
        });

        it('should call function', function(){
          expect(test.callback.calls.count()).toEqual(1);
        });
      });

      describe('when one subscriber and then unsubscribes', function(){
        var test = {};
        beforeEach(function(){
          test.callback = function(){};

          spyOn(test, 'callback');

          PubSub.subscribe('test', test.callback);
          PubSub.unsubscribe('test', test.callback);
        });

        it('should return false', function(){
          expect(PubSub.publish('test')).toEqual(false);
        });

        it('the channels should be empty', function(){
          expect(PubSub.channels.test.length).toEqual(0);
        });
      });
    });

    describe('installTo', function(){
      describe('when I install to a new object', function(){
        var testObj = {};
        beforeEach(function(){
          PubSub.installTo(testObj);
        });

        it('should bind subscribe and publish functions', function(){
          expect(typeof testObj.publish).toEqual('function');
          expect(typeof testObj.subscribe).toEqual('function');
        });
      });
    });
  });
});
