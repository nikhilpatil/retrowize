jest.dontMock('../js/card.jsx');
jest.dontMock('../js/lane.jsx');
jest.dontMock('material-ui/lib/raised-button');
jest.dontMock('react-tap-event-plugin');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Card = require('../js/card.jsx');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');

var boardService = {
  lanes: jest.genMockFunction(),
  addLane: jest.genMockFunction(),
  addCard: jest.genMockFunction()
};

const Lane = require('../js/lane.jsx');

describe('Lane', () => {
	
	it('should show lane title', () => {
		
			var cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane title="My Lane" id={1} cards={cards}/>
			);
			
			let title = TestUtils.findRenderedDOMComponentWithClass(lane,'title')
			
			expect(title.textContent).toBe('My Lane');
	})
	
	it('should initially have no cards', () => {
		
			let cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane id={1} cards={cards}/>
			);
			
			let cardsComponents = TestUtils.scryRenderedComponentsWithType(lane, Card)
			
			expect(cardsComponents.length).toBe(0);
	})
	
	it('should add new card', () => {
			
			let onLaneUpdated = jest.genMockFunction();
			let cards = [];
			let lane = TestUtils.renderIntoDocument(
				<Lane id={1} cards={cards} onLaneUpdated={onLaneUpdated}/>
			);
			
			let cardsComponents = TestUtils.scryRenderedComponentsWithType(lane, Card)
			
			expect(cardsComponents.length).toBe(0);
			
			let newCardContent = TestUtils.findRenderedComponentWithType(lane, TextField);
			
			newCardContent.value = 'New Card';
			
			let createCard = TestUtils.findRenderedDOMComponentWithClass(lane, 'add-btn');
			TestUtils.Simulate.touchTap(createCard);
			
			expect(boardService.addCard).toBeCalled();
			expect(onLaneUpdated).toBeCalled();
	})
	
})