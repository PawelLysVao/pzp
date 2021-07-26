import {
  LayoutAction,
  MANAGE_PAGE,
  REMOVE_TOAST,
  ADD_TOAST
} from 'modules/Layout/action';
import { initLayoutState, LayoutState } from 'modules/Layout/state';
import { Toast } from 'modules/Layout/type';
import _uniqueId from 'lodash/uniqueId';

const initialState = initLayoutState();

const reducer = (
  state: LayoutState = initialState,
  action: LayoutAction
): LayoutState => {
  switch (action.type) {
    case MANAGE_PAGE: {
      const {
        payload: {
          title = state.page.title,
          breadcrumb = state.page.breadcrumb,
          type = null
        }
      } = action;

      return { ...state, page: { title, breadcrumb, type } };
    }

    case ADD_TOAST: {
      const toast: Toast = {
        id: _uniqueId(),
        ...action.payload
      };

      return {
        ...state,
        toasts: [toast, ...state.toasts]
      };
    }

    case REMOVE_TOAST: {
      const id = action.payload;

      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== id)
      };
    }

    default:
      return state;
  }
};

export default reducer;
