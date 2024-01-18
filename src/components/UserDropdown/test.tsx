import { render, screen, act } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import UserDropdown from '.'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {}
  })
}))

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Willian" />)
    expect(screen.getByText(/willian/i)).toBeInTheDocument()
  })

  it('should render the menu', async () => {
    render(<UserDropdown username="Willian" />)

    // Abrir o menu
    userEvent.click(screen.getByText(/willian/i))

    await act(async () => {
      // Use 'findByRole' para esperar que os itens do menu apareçam
      const profileLink = await screen.findByRole('link', {
        name: /my profile/i
      })
      const wishlistLink = await screen.findByRole('link', {
        name: /wishlist/i
      })

      // Assert que os itens do menu estão presentes
      expect(profileLink).toBeInTheDocument()
      expect(wishlistLink).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /sign out/i })
      ).toBeInTheDocument()
    })
  })
})
