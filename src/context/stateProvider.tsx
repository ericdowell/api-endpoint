import React from 'react'
import { node } from 'prop-types'
// Internal
import { StateAction, StateActionCases, StateProviderHelpers, StateProviderProps } from './types'
import { applyReducerState } from './helpers'

export function createStateProvider<S, R extends React.Reducer<any, any>>(
  initialState: S,
  actions: Record<string, string>,
  options?: {
    actionCases?: StateActionCases<S>
    createProviderHelpers?: (dispatch: React.Dispatch<React.ReducerAction<R>>) => StateProviderHelpers
  },
): [React.Context<S>, (props: StateProviderProps) => React.ReactElement<React.ProviderProps<any>>] {
  const Context = React.createContext<S>(initialState)

  type ProviderProps = {
    state: React.ReducerState<R> | S
    dispatch: React.Dispatch<React.ReducerAction<R>>
  } & Record<string, any>

  function StateProvider(props: StateProviderProps): React.ReactElement<React.ProviderProps<ProviderProps>> {
    const [state, dispatch] = React.useReducer((prevState: S, action: StateAction): any => {
      if (!Object.values(actions).includes(action.type)) {
        throw new Error(`Unknown action: "${action.type}"`)
      }
      if (typeof options?.actionCases?.[action.type] !== 'function') {
        return applyReducerState(prevState, action)
      }
      return options.actionCases[action.type](prevState, action)
    }, initialState)

    const Provider = Context.Provider as React.Provider<ProviderProps>
    return (
      <Provider
        value={{
          ...((typeof options?.createProviderHelpers === 'function' &&
            options.createProviderHelpers(dispatch)) ||
            {}),
          state,
          dispatch,
        }}
      >
        {props.children}
      </Provider>
    )
  }
  StateProvider.propTypes = {
    children: node.isRequired,
  }
  return [Context, StateProvider]
}