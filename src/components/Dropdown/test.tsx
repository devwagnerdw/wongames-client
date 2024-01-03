import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'utils/test-utils'
import Dropdown from '.'

describe('<Dropdown />', () => {
  beforeEach(() => {
    const title = <h1 aria-label="toogle dropdown">Click here</h1>

    render(
      <Dropdown title={title}>
        <span>content</span>
      </Dropdown>
    )
  })

  it('should render title', () => {
    expect(screen.getByLabelText(/toogle dropdown/)).toBeInTheDocument()
  })

  it('should handle open/close dropdown', async () => {
    const content = screen.getByText(/content/).parentElement!

    expect(content).toHaveStyle({ opacity: 0 })
    expect(content.getAttribute('aria-hidden')).toBe('true')

    userEvent.click(screen.getByLabelText(/toogle dropdown/))

    // Aguarde até que a transição seja concluída antes de verificar o estilo
    await waitFor(() => {
      expect(content).toHaveStyle({ opacity: 1 })
      expect(content.getAttribute('aria-hidden')).toBe('false')
    })
  })
})
