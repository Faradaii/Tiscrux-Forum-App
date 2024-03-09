import { ActionType } from './action';

interface SetIsPreloadAction {
  type: ActionType.SET_IS_PRELOAD
  payload: {
    isPreload: boolean
  }
}

type IsPreloadAction = SetIsPreloadAction;

function isPreloadReducer (isPreload: boolean = true, action: IsPreloadAction): boolean {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
}

export default isPreloadReducer;
