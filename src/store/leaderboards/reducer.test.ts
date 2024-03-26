/**
* test scenario for leaderboardsReducer
*
* - leaderboards functions
*  - should return the initial state when given by unknown action
*  - should return the leaderboards when given by GET_LEADERBOARD action
*  - should return the removed leaderboards when given by CLEAR_LEADERBOARD action
*
*/
import { type LeaderboardData } from '../../../types';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState: LeaderboardData[] = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by GET_LEADERBOARD action', () => {
    // arrange
    const initialState: LeaderboardData[] = [];
    const action = {
      type: 'GET_LEADERBOARD',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg'
            },
            score: 10
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg'
            },
            score: 5
          }
        ]
      }
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });

  it('should return the removed leaderboard when given by CLEAR_LEADERBOARD action', () => {
    // arrange
    const initialState: LeaderboardData[] = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        score: 10
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        score: 5
      }
    ];

    const action = {
      type: 'CLEAR_LEADERBOARD'
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toHaveLength(0);
  });
});