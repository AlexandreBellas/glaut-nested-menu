import { useContext } from 'react'
import {
  NestedComponentContext,
  NestedComponentContextDispatch,
} from '../contexts/NestedComponentProvider'

export function useNestedComponent() {
  return useContext(NestedComponentContext)
}

export function useNestedComponentDispatch() {
  return useContext(NestedComponentContextDispatch)
}
