import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import NestedComponent from './'

describe('NestedComponent', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders the component', async () => {
    render(<NestedComponent />)
  })

  it('Adds an item successfully', async () => {
    const result = render(<NestedComponent />)
    const inputElement = await screen.findByPlaceholderText<HTMLInputElement>(
      'New item name (shortcut: press Enter to add)'
    )
    const addButtonElement = result.container.querySelector<HTMLButtonElement>(
      '#button--add-new-item'
    )

    inputElement.value = 'test'
    addButtonElement?.click()

    const pElement = await screen.findByText('test')
    expect(pElement).toBeInTheDocument()
  })
})
