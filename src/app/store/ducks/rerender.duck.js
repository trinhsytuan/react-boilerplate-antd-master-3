export const actionTypes = {
  SetRerenderKetQua: 'Rerender/SetRerenderKetQua',
};

const initialAuthState = {
  stateRerenderKetQua: 0,
};
export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SetRerenderKetQua: {
      const { stateRerenderKetQua } = state;
      return Object.assign({}, state, { stateRerenderKetQua: stateRerenderKetQua + 1 });
    }

    default:
      return state;
  }
};

export const actions = {
  rerenderKetQua: () => ({ type: actionTypes.SetRerenderKetQua }),
};

export function* saga() {
}
