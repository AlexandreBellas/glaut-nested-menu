import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders the main page', async () => {
    render(<App />)
    const titleElement = await screen.findByText('Add a new item')
    expect(titleElement).toBeInTheDocument()
  })
})
