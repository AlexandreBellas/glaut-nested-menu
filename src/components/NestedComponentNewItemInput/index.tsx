import { useCallback, useEffect, useState } from 'react'
import { useNestedComponentDispatch } from '../../hooks/useNestedComponent'

export default function NestedComponentNewItemInput() {
  // #region Contexts
  const nestedItemsDispatch = useNestedComponentDispatch()
  // #endregion

  // #region States
  const [newName, setNewName] = useState('')
  // #endregion

  // #region Callbacks
  const onAddNewItem = useCallback(
    (name: string) => {
      if (newName === '') return

      nestedItemsDispatch({ type: 'add', name })
      setNewName('')
    },
    [newName, nestedItemsDispatch]
  )
  // #endregion

  // #region Effects
  useEffect(() => {
    function onEnterKeyHandle(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        onAddNewItem(newName)
      }
    }

    window.addEventListener('keydown', onEnterKeyHandle)

    return () => {
      window.removeEventListener('keydown', onEnterKeyHandle)
    }
  }, [onAddNewItem, newName])
  // #endregion

  return (
    <div>
      <h1>Add a new item</h1>
      <div>
        <input
          id="input--new-item-name"
          type="text"
          placeholder="New item name (shortcut: press Enter to add)"
          value={newName}
          onChange={(ev) => {
            setNewName(ev.target.value)
          }}
          style={{
            marginRight: '2px',
            width: '20%',
          }}
        />
        <button
          onClick={() => {
            onAddNewItem(newName)
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}
