import { render, screen } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import UserDropdown from '.'

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Willian" />)
    expect(screen.getByText(/willian/i)).toBeInTheDocument()
  })

  it('should render the menu', async () => {
    render(<UserDropdown username="Willian" />)

    // Open menu
    userEvent.click(screen.getByText(/willian/i))

    // Use 'findByRole' to wait for the menu items to appear
    const profileLink = await screen.findByRole('link', { name: /my profile/i })
    const wishlistLink = await screen.findByRole('link', { name: /wishlist/i })

    // Assert that the menu items are present
    expect(profileLink).toBeInTheDocument()
    expect(wishlistLink).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument()
  })
})
