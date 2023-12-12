import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import UserDropdown from '.'

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    renderWithTheme(<UserDropdown username="Willian" />)
    expect(screen.getByText(/willian/i)).toBeInTheDocument()
  })

  it('should render the menu', async () => {
    renderWithTheme(<UserDropdown username="Willian" />)

    // Open menu
    userEvent.click(screen.getByText(/willian/i))

    // Use 'findByRole' to wait for the menu items to appear
    const profileLink = await screen.findByRole('link', { name: /my profile/i })
    const wishlistLink = await screen.findByRole('link', { name: /wishlist/i })
    const signOutLink = await screen.findByRole('link', { name: /sign out/i })

    // Assert that the menu items are present
    expect(profileLink).toBeInTheDocument()
    expect(wishlistLink).toBeInTheDocument()
    expect(signOutLink).toBeInTheDocument()
  })
})
