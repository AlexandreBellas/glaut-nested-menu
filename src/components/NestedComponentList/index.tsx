import { Fragment, useCallback } from 'react'
import { IItem } from '../../contexts/NestedComponentProvider'
import { useNestedComponent } from '../../hooks/useNestedComponent'
import NestedComponentItem from '../NestedComponentItem'

export default function NestedComponentList() {
  // #region Contexts
  const { items, notifyHasReachedMaximumNestedLevel } = useNestedComponent()
  // #endregion

  // #region Callbacks
  const renderNestedItemComponent = useCallback(
    (items: IItem[], depth: number): JSX.Element => (
      <ul>
        {items.map((item) => (
          <Fragment key={item.key}>
            <NestedComponentItem name={item.name} innerKey={item.key} />
            <ul>{renderNestedItemComponent(item.children, depth + 1)}</ul>
          </Fragment>
        ))}
      </ul>
    ),
    []
  )
  // #endregion

  return (
    <div>
      {notifyHasReachedMaximumNestedLevel && (
        <h3>You can nest only up to 3 levels.</h3>
      )}
      {renderNestedItemComponent(items, 0)}
    </div>
  )
}
