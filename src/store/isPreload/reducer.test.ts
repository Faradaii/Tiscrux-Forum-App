/**
* test scenario for isPreloadReducer
*
* - isPreload functions
*  - should return the initial state when given by unknown action
*  - should return the isPreload when given by SET_AUTH_USER action
*
*/
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return isPreload when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState: boolean = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false
      }
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});