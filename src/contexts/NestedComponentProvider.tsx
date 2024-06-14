import { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

// #region Types
export interface IItem {
  key: string
  name: string
  children: IItem[]
}

interface IFoundItem {
  item: IItem
  depth: number
}

interface INestedComponentProviderProps {
  children: JSX.Element
}

interface INestedComponentContextState {
  items: IItem[]
  notifyHasReachedMaximumNestedLevel: boolean
}

type INestedComponentContextAction =
  | {
      type: 'add'
      name: string
    }
  | {
      type: 'add-child'
      parentKey: string
      name: string
    }
  | {
      type: 'edit'
      key: string
      newName: string
    }
// #endregion

// #region Helper functions
function findItemByKey(
  items: IItem[],
  key: string,
  depth: number
): IFoundItem | null {
  for (const item of items) {
    if (item.key === key) {
      return { item, depth }
    }

    const childrenItem = findItemByKey(item.children, key, depth + 1)
    if (childrenItem !== null) return childrenItem
  }

  return null
}
// #endregion

// #region Context definitions
export const NestedComponentContext = createContext(
  {} as INestedComponentContextState
)
export const NestedComponentContextDispatch = createContext(
  {} as React.Dispatch<INestedComponentContextAction>
)
// #endregion

// #region Provider definitions
export default function NestedComponentProvider({
  children,
}: Readonly<INestedComponentProviderProps>) {
  const initialState: INestedComponentContextState = {
    items: [],
    notifyHasReachedMaximumNestedLevel: false,
  }

  const [state, dispatch] = useReducer(NestedComponentReducer, initialState)

  return (
    <NestedComponentContext.Provider value={state}>
      <NestedComponentContextDispatch.Provider value={dispatch}>
        {children}
      </NestedComponentContextDispatch.Provider>
    </NestedComponentContext.Provider>
  )
}
// #endregion

// #region Reducer definitions
function NestedComponentReducer(
  state: INestedComponentContextState,
  action: INestedComponentContextAction
): INestedComponentContextState {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        items: [
          {
            name: action.name,
            key: uuidv4(),
            children: [],
          },
          ...state.items,
        ],
        notifyHasReachedMaximumNestedLevel: false,
      }
    }
    case 'add-child': {
      const foundItem = findItemByKey(state.items, action.parentKey, 0)
      if (foundItem === null) return state
      if (foundItem.depth === 2) {
        return {
          ...state,
          notifyHasReachedMaximumNestedLevel: true,
        }
      }

      foundItem.item.children.push({
        key: uuidv4(),
        name: action.name,
        children: [],
      })

      return { ...state, notifyHasReachedMaximumNestedLevel: false }
    }
    case 'edit': {
      const foundItem = findItemByKey(state.items, action.key, 0)
      if (foundItem === null) return state

      // Changing with reference
      foundItem.item.name = action.newName

      return { ...state, notifyHasReachedMaximumNestedLevel: false }
    }
    default: {
      return state
    }
  }
}
// #endregion
