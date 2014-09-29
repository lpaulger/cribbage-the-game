define(['modules/BoardSingleton'], function(Board){
  'use strict';
  var _board, _card, _player, _player2;

  describe('BoardSingleton', function () {
    beforeEach(function () {
      _board = Board.getInstance();
      _board.resetBoard();
      _board.totalPlayedCardsForRound = [];
      _player = {points: 0};
    });

    describe('place 8 card', function () {
      beforeEach(function () {
        _card = {value: 8};
      });

      it('should set currentBoardValue to 8', function () {
        _board.placeCard(_card, _player);
        expect(_board.currentBoardValue).toBe(8);
      });

      it('should insert card to playedCards', function () {
        _board.placeCard(_card, _player);
        expect(_board.playedCards.length).toBe(1);
      });
    });

    describe('place card totaling 31', function () {
      beforeEach(function () {
        spyOn(_board, 'resetBoard');
        _board.placeCard({value: 10}, _player);
        _board.placeCard({value: 10}, _player);
        _board.placeCard({value: 10}, _player);
      });

      it('should reset the board', function () {
        _board.placeCard({value: 1}, _player);
        expect(_board.resetBoard.calls.count()).toBe(1);
      });
    });

    describe('resetting the board', function () {
      beforeEach(function () {
        _board.placeCard({value: 10}, _player);
        _board.placeCard({value: 10}, _player);
        _board.placeCard({value: 10}, _player);
      });

      it('should set the currentBoardValue to 0', function () {
        expect(_board.currentBoardValue).toBe(30);
        _board.resetBoard();
        expect(_board.currentBoardValue).toBe(0);
      });
    });

    describe('player announces go', function () {
      beforeEach(function () {
        _player = {name: 'test'};
        spyOn(_board, 'resetBoard');
      });
      it('should record player stating Go', function () {
        _board.announceGo(_player);
        expect(_board.playersWhoSaidGo.length).toBe(1);
        expect(_board.playersWhoSaidGo[0]).toBe(_player);
        expect(_board.resetBoard).not.toHaveBeenCalled();
      });

      describe('after opponent announced go', function () {
        beforeEach(function () {
          _player = {name: 'test'};
          _player2 = {name: 'player2'};
        });
        it('should reset the game', function () {
          _board.announceGo(_player);
          _board.announceGo(_player2);
          expect(_board.resetBoard).toHaveBeenCalled();
        });
      });
    });

    describe('player plays last card for round', function(){
      beforeEach(function () {
        _board.totalPlayedCardsForRound = [
          {value: 10},{value: 10},{value: 10},{value: 10},
          {value: 10},{value: 10},{value: 10}
        ];
      });

      it('should reset totalPlayedCardsForRound', function () {
        expect(_board.totalPlayedCardsForRound.length).toEqual(7);
        _board.placeCard({value: 10}, _player);
        expect(_board.totalPlayedCardsForRound.length).toEqual(0);
      });
    });
  });
});
