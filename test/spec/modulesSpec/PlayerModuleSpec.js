define(['modules/PlayerModule'], function(Player) {
    'use strict';

    describe('PlayerModule', function() {
      var _deck, card, _player, _cribOwner, _hands;
      beforeEach(function(){
        card = {
          faceValue: 10,
          value: 10,
          suit: 'hearts',
          name: '10'
        };
        _deck = jasmine.createSpyObj('Deck', ['shuffle', 'cut', 'deal', 'selectOne']);
        _deck.deal.and.returnValue({
          topHand: [card, card, card, card, card, card],
          bottomHand: [card, card, card, card, card, card]
        });
        _player = new Player('test', 'tests');
        spyOn(_player.scoreKeeper, 'TwoForHisHeels');
      });

      describe('Constructor', function(){
        it('set the name', function() {
          expect(_player.name).toBe('test');
        });

        it('set the possessive', function() {
          expect(_player.possessive).toBe('tests');
        });
      });

      describe('placeCardsInCrib', function(){
        beforeEach(function(){
          _cribOwner = new Player('cOwner', 'cOwner\'s');
          _hands = _deck.deal();

          _player.hand = _hands.bottomHand;
        });

        describe('if 0 cards selected', function(){
          it('should not put cards in crib owners crib', function() {
            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe('if 1 card selected', function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
          });

          it('should not put cards in crib owners crib', function() {

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(1);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe('if 2 cards selected', function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
            _player.cardsForCrib.push(_player.hand[1]);
          });

          it('should put cards in crib owners crib', function() {
            expect(_player.cardsForCrib.length).toBe(2);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(2);
            expect(_cribOwner.crib[0]).toBe(card);
          });

          it('should unselect the two cards', function () {
            _player.placeCardsInCrib(_cribOwner);
            expect(_cribOwner.crib[0].selected).toEqual('');
            expect(_cribOwner.crib[1].selected).toEqual('');
          });
        });
      });

      describe('selectOneFromDeck', function(){
        beforeEach(function(){
          //spyOn(_player.scoreKeeper, 'evaluateHand').and.returnValue(undefined);
          _deck.selectOne.and.returnValue(card);
        });

        it('should return the card for selected index', function(){
          expect(_player.selectOneFromDeck(_deck, 2)).toEqual({card: card, isTwoForHisHeels: undefined});
        });

        it('should check if TwoForHisHeels', function(){
          var result = _player.selectOneFromDeck(_deck, 2);
          expect(_player.scoreKeeper.TwoForHisHeels).toHaveBeenCalledWith(result.card, _player);
        });
      });

      describe('playCard', function(){
        var points;
        beforeEach(function(){
          _player.hand = [card, card, card, card, card, card];
          spyOn(_player.board, 'placeCard');
          spyOn(_player.board, 'resetBoard');
          spyOn(_player.scoreKeeper, 'evaluatePlay').and.returnValue(0);
        });

        describe('plays any card', function(){
          beforeEach(function(){
            spyOn(_player.playRules, 'isCardPlayable').and.returnValue(true);
            points =_player.playCard(0);
          });

          it('should find the card in the hand', function(){
            expect(_player.board.placeCard).toHaveBeenCalledWith(_player.hand[0], _player);
          });

          it('should evaluate hand for points', function(){
            expect(_player.scoreKeeper.evaluatePlay).toHaveBeenCalled();
          });

          it('should return the points', function(){
            expect(points).toEqual(0);
          });
        });
        
        describe('and player plays last card for round', function(){
          beforeEach(function(){
            spyOn(_player.playRules, 'isCardPlayable').and.returnValue(true);
            spyOn(_player.board, 'isEndOfRound').and.returnValue(true);
            _player.board.totalPlayedCardsForRound = [card, card, card, card, card, card, card];
            points =_player.playCard(0);
          });

          it('should reset totalPlayedCardsForRound', function(){
            expect(_player.board.totalPlayedCardsForRound).toEqual([]);
          });

          it('should reset the board', function(){
            expect(_player.board.resetBoard).toHaveBeenCalled();
          });
        });

        describe('and player plays card totalling 31 count', function(){
          beforeEach(function(){
            spyOn(_player.playRules, 'isCardPlayable').and.returnValue(true);
            _player.board.currentBoardValue = 31;
            points =_player.playCard(0);
          });

          it('should reset the board', function(){
            expect(_player.board.resetBoard).toHaveBeenCalled();
          });
        });

        describe('and card isn\'t playable', function(){
          beforeEach(function(){
            spyOn(_player.playRules, 'isCardPlayable').and.returnValue(false);
          });

          it('should throw No Playable Cards Error', function(){
            expect(function(){
              _player.playCard(0);
            }).toThrowError('No Playable Cards');
          });
        });

        describe('and card isn\'t playable, but another one is', function(){
          beforeEach(function(){
            spyOn(_player.playRules, 'isCardPlayable').and.returnValue(false);
            spyOn(_player.playRules, 'hasPlayableCards').and.returnValue(true);
          });

          it('should throw Invalid Playable Card', function(){
            expect(function(){
              _player.playCard(0);
            }).toThrowError('Invalid Playable Card');
          });
        });
      });

      describe('restoreHand', function(){
        it('should set the hand as the hand from memory', function(){
          expect(_player.hand).toEqual([]);
          _player.restoreHand();
          expect(_player.hand).toBe(_player.handInMemory);
        });
      });

      describe('announceGo', function(){
        describe('says go first', function(){
          describe('and has no playable cards', function(){
            beforeEach(function(){
              spyOn(_player.playRules, 'hasPlayableCards').and.returnValue(false);
              spyOn(_player.board, 'announceGo').and.returnValue(undefined);
            });

            it('should return a message', function(){
              expect(_player.announceGo()).toEqual('test said GO');
            });
          });

          describe('and has playable cards', function(){
            beforeEach(function(){
              spyOn(_player.playRules, 'hasPlayableCards').and.returnValue(true);
            });

            it('should throw a has playable cards error', function(){
              expect(function(){
                _player.announceGo();
              }).toThrowError('Playable Cards');
            });
          });
        });

        describe('says go second', function(){
          describe('and has no playable cards', function(){
            beforeEach(function(){
              spyOn(_player.playRules, 'hasPlayableCards').and.returnValue(false);
              spyOn(_player.board, 'announceGo').and.returnValue(1);
            });

            it('should return a message', function(){
              expect(_player.announceGo()).toEqual('test scored 1 point for GO');
            });
          });

          describe('and has playable cards', function(){
            beforeEach(function(){
              spyOn(_player.playRules, 'hasPlayableCards').and.returnValue(true);
            });

            it('should throw a has playable cards error', function(){
              expect(function(){
                _player.announceGo();
              }).toThrowError('Playable Cards');
            });
          });
        });
      });
    });
  });
