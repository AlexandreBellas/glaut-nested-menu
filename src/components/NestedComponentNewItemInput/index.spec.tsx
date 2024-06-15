import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import NestedComponentNewItemInput from './'

describe('NestedComponentNewItemInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders the component', async () => {
    render(<NestedComponentNewItemInput />)
  })

  it('Clears input after sending', async () => {
    const result = render(<NestedComponentNewItemInput />)
    const inputElement = await screen.findByPlaceholderText<HTMLInputElement>(
      'New item name (shortcut: press Enter to add)'
    )
    const addButtonElement = result.container.querySelector<HTMLButtonElement>(
      '#button--add-new-item'
    )

    if (!addButtonElement) {
      throw new Error('Button not found.')
    }

    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.click(addButtonElement)

    expect(inputElement.value).toBe('')
  })
})
