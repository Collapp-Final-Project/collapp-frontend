import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useAuth } from '../useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('debe lanzar error si se usa fuera de AuthProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth debe ser utilizado dentro de un AuthProvider'
    )

    consoleError.mockRestore()
  })

  it('debe retornar el contexto cuando se usa dentro de un AuthProvider', () => {
    const mockContextValue = {
      user: { id: 1, name: 'Andrea' },
      token: 'jwt-token',
      isAuthenticated: true,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    }

    const wrapper = ({ children }) =>
      React.createElement(AuthContext.Provider, { value: mockContextValue }, children)

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toEqual(mockContextValue)
    expect(result.current.user).toEqual({ id: 1, name: 'Andrea' })
    expect(result.current.token).toBe('jwt-token')
    expect(result.current.isAuthenticated).toBe(true)
  })
})
