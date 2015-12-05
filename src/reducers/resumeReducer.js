import { createReducer } from '../utils';
import Immutable from 'immutable';
import _ from 'underscore';

import { ADD_BLOCK,
         HIDE_BLOCK,
         HIDE_BULLET,
         MOVE_BLOCK,
         MOVE_BULLET,
         UPDATE_LOCAL_STATE,
         UPDATE_LOCAL_STATE_BLOCKS,
         UPDATE_LOCAL_STATE_BULLETS,
         UPDATE_LOCAL_STATE_FOOTER,
         UPDATE_LOCAL_STATE_HEADER,
         UPDATE_LOCAL_STATE_SAVEPRINT,
         UPDATE_RESUME_WITH_SERVER_RESPONSE } from 'constants/resumeConstants';


// resumeState.resumeTitle is what the front end sees; req.body.resumeTitle is what the server sees.
const initialState = {
  resumeId: 1,
  resumeTitle: 'Resume Version Name',
  resumeTheme: 'Default',
  resumeHeader: {
    name: 'Full Name',
    profession: 'Profession',
    city: 'City',
    state: 'State',
    displayEmail: 'email@email.com',
    phone: '(124) 125-4737',
    webLinkedin: 'linkedin.com/myname',
    webOther: 'github.com/number23'
  },
  blockChildren: [{
    blockId: 1,
    archived: false,
    companyName: 'Company Name',
    jobTitle: 'Bossman',
    years: '2015',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      text: 'My first bullet',
      parentBlockId: 1,
      archived: false
    }, {
      bulletId: 2,
      text: 'Then I productionalized everything, like the Bossman that I am.',
      parentBlockId: 1,
      archived: false
    }]
  }, {
    blockId: 2,
    archived: false,
    companyName: 'Second Corp.',
    jobTitle: 'Lackey',
    years: '2014, 2013',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 3,
      text: 'I believe in sentences that end with punctuation',
      parentBlockId: 2,
      archived: false
    }, {
      bulletId: 4,
      text: 'This is an inflexible belief.',
      parentBlockId: 2,
      archived: false
    }]
  }, {
    blockId: 3,
    archived: false,
    companyName: 'Third Chance',
    jobTitle: 'Intern',
    years: '2012-2011',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 5,
      text: 'Not a great life here, alas.',
      parentBlockId: 3,
      archived: false
    }, {
      bulletId: 6,
      text: 'But I played with a lot of paperclips!',
      parentBlockId: 3,
      archived: false
    }]
  }],
  resumeFooter: {
    school1: {
      name: 'School Name',
      degree: 'Degree',
      schoolEndYear: 'Year',
      location: 'City'
    },
    school2: {
      name: 'School Name',
      degree: 'Degree',
      schoolEndYear: 'Year',
      location: 'City'
    },
    personalStatement: 'Personal Statement / Hobbies'
  }
};


export default createReducer(initialState, {

  [ADD_BLOCK]: (state) => {
    const newState = { ...state };
    const newBlock = {
      blockId: Date.now(),
      archived: false,
      companyName: 'YO SHIT WORKED',
      jobTitle: '',
      years: '',
      location: '',
      bulletChildren: []
    };
    newState.blockChildren.push(newBlock);
    return newState;
  },

  [HIDE_BLOCK]: (state, payload) => {
    const newState = { ...state };
    const prop = _.filter(newState.blockChildren, child => child.blockId === payload);
    prop[0].archived = true;
    return newState;
  },

  [HIDE_BULLET]: (state, payload) => {
    const newState = { ...state };
    const prop = _.chain(newState.blockChildren)
                  .map(block => block.bulletChildren)
                  .flatten()
                  .filter(bullet => bullet.bulletId === payload)
                  .value();
    prop[0].archived = true;
    return newState;
  },

  [MOVE_BLOCK]: (state, payload) => {
    const immutableBlockChildren = Immutable.List(state.blockChildren);

    return Object.assign({}, state, {
      blockChildren: immutableBlockChildren.splice(payload.blockIndex, 1).splice(payload.atIndex, 0, payload.block).toJS()
    });
  },

  [MOVE_BULLET]: (state, payload) => {
    const parentBlock = payload.blockChildren[payload.parentBlockIndex];
    const immutableBulletChildren = Immutable.List(parentBlock.bulletChildren);
    const parentBlockIndex = payload.parentBlockIndex;

    const newState = Object.assign({}, state);
    newState.blockChildren[payload.parentBlockIndex].bulletChildren = immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS();
    return newState;
  },

  [UPDATE_LOCAL_STATE]: (state, payload) => {
    const newProperty = {};
    newProperty[payload.textFieldName] = payload.userInput;
    return Object.assign({}, state,
      newProperty);
  },

  [UPDATE_LOCAL_STATE_BLOCKS]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.blockChildren[payload.blockIndex][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_BULLETS]: (state, payload) => {
    // FIXME
    const newState = Object.assign({}, state);
    newState.blockChildren[0][payload.textFieldName] = payload.bulletInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_FOOTER]: (state, payload) => {
    const newState = Object.assign({}, state);
    if (payload.textFieldName.slice(0, 6) === 'school') {
      newState.resumeFooter[payload.textFieldName.slice(0, 7)][payload.textFieldName.slice(8)] = payload.userInput;
    } else {
      newState.resumeFooter[payload.textFieldName] = payload.userInput;
    }
    return newState;
  },

  [UPDATE_LOCAL_STATE_HEADER]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.resumeHeader[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_SAVEPRINT]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState[payload.textFieldName] = payload.userInput;
  },

  [UPDATE_RESUME_WITH_SERVER_RESPONSE]: (state, payload) => {
    console.log(payload);
    return {
      ...state,
      ...payload
    };
  }

});
