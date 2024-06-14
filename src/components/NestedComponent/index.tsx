import NestedComponentProvider from '../../contexts/NestedComponentProvider'
import NestedComponentList from '../NestedComponentList'
import NestedComponentNewItemInput from '../NestedComponentNewItemInput'

export default function NestedComponent() {
  return (
    <NestedComponentProvider>
      <section style={{ width: '100%', padding: '1rem' }}>
        <NestedComponentNewItemInput />
        <hr />
        <NestedComponentList />
      </section>
    </NestedComponentProvider>
  )
}
