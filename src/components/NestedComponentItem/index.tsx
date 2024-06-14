import { useCallback, useState } from 'react'
import { useNestedComponentDispatch } from '../../hooks/useNestedComponent'
import './index.module.css'

interface INestedComponentItemProps {
  innerKey: string
  name: string
}

export default function NestedComponentItem(
  props: Readonly<INestedComponentItemProps>
) {
  // #region Props
  const { innerKey, name } = props
  // #endregion

  // #region Contexts
  const nestedComponentDispatch = useNestedComponentDispatch()
  // #endregion

  // #region States
  const [currName, setCurrName] = useState(name)
  const [newChildName, setNewChildName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)
  // #endregion

  // #region Callbacks
  const onClickToEdit = useCallback(() => {
    setIsAddingChild(false)
    setIsEditing(true)
  }, [])

  const onClickToAddChild = useCallback(() => {
    setIsAddingChild(true)
    setIsEditing(false)
  }, [])

  const renderEditingMode = useCallback(
    () => (
      <>
        <input
          style={{ marginTop: 15, marginBottom: 15 }}
          value={currName}
          onChange={(event) => {
            setCurrName(event.target.value)
          }}
        />
        <button
          onClick={() => {
            if (currName === '') return

            nestedComponentDispatch({
              type: 'edit',
              key: innerKey,
              newName: currName,
            })
            setIsEditing(false)
          }}
        >
          apply
        </button>
        <button
          onClick={() => {
            setIsEditing(false)
          }}
        >
          cancel
        </button>
      </>
    ),
    [currName, nestedComponentDispatch, innerKey]
  )

  const renderIsAddingChildMode = useCallback(
    () => (
      <>
        <p
          className="teste"
          style={{ width: 'fit-content' }}
          onClick={() => {
            onClickToEdit()
          }}
        >
          {name}
        </p>
        <input
          value={newChildName}
          onChange={(event) => {
            setNewChildName(event.target.value)
          }}
        />
        <button
          onClick={() => {
            if (newChildName === '') return

            nestedComponentDispatch({
              type: 'add-child',
              parentKey: innerKey,
              name: newChildName,
            })
            setIsAddingChild(false)
            setNewChildName('')
          }}
        >
          add
        </button>
        <button
          onClick={() => {
            setIsAddingChild(false)
          }}
        >
          cancel
        </button>
      </>
    ),
    [newChildName, nestedComponentDispatch, innerKey, name, onClickToEdit]
  )
  // #endregion

  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {isEditing && renderEditingMode()}
        {isAddingChild && renderIsAddingChildMode()}
        {!isEditing && !isAddingChild && (
          <>
            <p
              style={{ width: 'fit-content' }}
              onClick={() => {
                onClickToEdit()
              }}
            >
              {name}
            </p>
            <button
              onClick={() => {
                onClickToAddChild()
              }}
            >
              add child
            </button>
          </>
        )}
      </div>
    </li>
  )
}
