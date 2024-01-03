import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'utils/test-utils'

import ExploreSidebar from '.'

import items from './mock'

describe('<ExploreSidebar />', () => {
  it('should render headings', () => {
    render(<ExploreSidebar items={items} onFilter={jest.fn} />)

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /sort by/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /platforms/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument()
  })

  it('should render inputs', () => {
    render(<ExploreSidebar items={items} onFilter={jest.fn} />)

    expect(
      screen.getByRole('checkbox', { name: /under \$50/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('radio', { name: /low to high/i })
    ).toBeInTheDocument()
  })

  it('should render the filter button', () => {
    render(<ExploreSidebar items={items} onFilter={jest.fn} />)

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
  })

  it('should check initial values that are passed', () => {
    render(
      <ExploreSidebar
        items={items}
        onFilter={jest.fn}
        initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
      />
    )

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked()

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked()
  })

  it('should filter with initial values', async () => {
    const onFilter = jest.fn()

    render(
      <ExploreSidebar
        items={items}
        initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
        onFilter={onFilter}
      />
    )

    // Aguarda que a função onFilter seja chamada com os argumentos esperados
    await waitFor(() => {
      expect(onFilter).toBeCalledWith({
        platforms: ['windows'],
        sort_by: 'low-to-high'
      })
    })
  })
  it('should filter with checked values', async () => {
    const onFilter = jest.fn()
    render(<ExploreSidebar items={items} onFilter={onFilter} />)

    await userEvent.click(screen.getByLabelText(/windows/i))
    await userEvent.click(screen.getByLabelText(/linux/i))
    await userEvent.click(screen.getByLabelText(/low to high/i))

    // Aguarda um momento para permitir que as atualizações do estado sejam processadas
    await new Promise((resolve) => setTimeout(resolve, 0))

    // Verifica se a função onFilter foi chamada com os argumentos esperados
    expect(onFilter).toHaveBeenCalledTimes(4)

    expect(onFilter).toBeCalledWith({
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high'
    })
  })
  it('should altern between radio options', async () => {
    const onFilter = jest.fn()

    render(<ExploreSidebar items={items} onFilter={onFilter} />)

    // Simula a interação do usuário selecionando a opção "low to high"
    userEvent.click(screen.getByLabelText(/low to high/i))

    // Simula a interação do usuário selecionando a opção "high to low"
    userEvent.click(screen.getByLabelText(/high to low/i))

    // Aguarda que a função onFilter seja chamada com os argumentos esperados
    await waitFor(() => {
      expect(onFilter).toBeCalledWith({
        sort_by: 'high-to-low'
      })
    })
  })
})
