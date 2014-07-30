define(['dataStructures/Card'], function(Card) {
  'use strict';
  describe("Card", function () {
    var _card;
    describe("Constructor", function () {
      describe("set value", function () {
        describe("if value is greater than 10", function () {
          it("should set value to 10", function () {
            _card = new Card(11, 'hearts');
            expect(_card.value).toEqual(10);
          });
        });

        describe("if value is less than 10", function () {
          it("should return value", function () {
            _card = new Card(9, 'hearts');
            expect(_card.value).toEqual(9);
          });
        });
      });
      describe("set name", function () {
        describe("if value is 1", function () {
          it("should return 'A'", function () {
            _card = new Card(1, 'hearts');
            expect(_card.name).toEqual('A');
          });
        });

        describe("if value is 11", function () {
          it("should return 'J'", function () {
            _card = new Card(11, 'hearts');
            expect(_card.name).toEqual('J');
          });
        });

        describe("if value is 12", function () {
          it("should return 'Q'", function () {
            _card = new Card(12, 'hearts');
            expect(_card.name).toEqual('Q');
          });
        });

        describe("if value is 13", function () {
          it("should return 'K'", function () {
            _card = new Card(13, 'hearts');
            expect(_card.name).toEqual('K');
          });
        });
      });
    });
  });
});
