import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import React from 'react'
import { AuthProvider } from '../AuthProvider'
import { authService } from '../../services/authService'
import { STORAGE_KEYS } from '../../utils/constants'

vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}))

import { AuthContext } from '../AuthContext'

const TestConsumer = ({ onRender }) => {
  const auth = React.useContext(AuthContext)
  if (onRender) onRender(auth)
  return React.createElement('div', { 'data-testid': 'consumer' },
    React.createElement('span', { 'data-testid': 'user' }, auth?.user?.name || 'no-user'),
    React.createElement('span', { 'data-testid': 'auth-status' }, String(auth?.isAuthenticated)),
  )
}

const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
}

describe('AuthProvider', () => {
  beforeEach(() => {
    clearStorage()
    vi.clearAllMocks()
  })

  describe('inicialización desde localStorage', () => {
    it('debe inicializar con user y token desde localStorage si existen', () => {
      const savedUser = { id: 1, name: 'Andrea', email: 'andrea@test.com' }
      localStorage.setItem(STORAGE_KEYS.TOKEN, 'existing-token')
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(savedUser))

      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, null)
        )
      )

      expect(screen.getByTestId('user').textContent).toBe('Andrea')
      expect(screen.getByTestId('auth-status').textContent).toBe('true')
    })

    it('debe inicializar sin user y token si localStorage está vacío', () => {
      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, null)
        )
      )

      expect(screen.getByTestId('user').textContent).toBe('no-user')
      expect(screen.getByTestId('auth-status').textContent).toBe('false')
    })

    it('debe limpiar localStorage si el JSON guardado es inválido', () => {
      localStorage.setItem(STORAGE_KEYS.TOKEN, 'token')
      localStorage.setItem(STORAGE_KEYS.USER, 'invalid-json{{{')

      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, null)
        )
      )

      expect(screen.getByTestId('user').textContent).toBe('no-user')
      expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.USER)).toBeNull()
    })
  })

  describe('login', () => {
    it('debe llamar a authService.login, persistir sesión y retornar data', async () => {
      const mockData = { token: 'new-token', id: 1, name: 'Andrea', email: 'andrea@test.com' }
      authService.login.mockResolvedValue(mockData)

      let authValue
      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, {
            onRender: (v) => { authValue = v }
          })
        )
      )

      const credentials = { email: 'andrea@test.com', password: 'secret' }
      let result
      await act(async () => {
        result = await authValue.login(credentials)
      })

      expect(authService.login).toHaveBeenCalledWith(credentials)
      expect(authService.login).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockData)
      expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBe('new-token')
      expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.USER))).toEqual({ id: 1, name: 'Andrea', email: 'andrea@test.com' })
    })
  })

  describe('register', () => {
    it('debe llamar a authService.register, persistir sesión y retornar data', async () => {
      const mockData = { token: 'reg-token', id: 2, name: 'Nuevo', email: 'nuevo@test.com' }
      authService.register.mockResolvedValue(mockData)

      let authValue
      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, {
            onRender: (v) => { authValue = v }
          })
        )
      )

      const registerData = { name: 'Nuevo', email: 'nuevo@test.com', password: 'pass' }
      let result
      await act(async () => {
        result = await authValue.register(registerData)
      })

      expect(authService.register).toHaveBeenCalledWith(registerData)
      expect(authService.register).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockData)
      expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBe('reg-token')
    })
  })

  describe('logout', () => {
    it('debe limpiar el estado y localStorage', async () => {
      localStorage.setItem(STORAGE_KEYS.TOKEN, 'token')
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ id: 1, name: 'Andrea' }))

      let authValue
      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, {
            onRender: (v) => { authValue = v }
          })
        )
      )

      act(() => {
        authValue.logout()
      })

      expect(localStorage.getItem(STORAGE_KEYS.TOKEN)).toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.USER)).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('debe ser false cuando no hay token', () => {
      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, null)
        )
      )

      expect(screen.getByTestId('auth-status').textContent).toBe('false')
    })

    it('debe ser true cuando hay token', () => {
      localStorage.setItem(STORAGE_KEYS.TOKEN, 'some-token')
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ id: 1, name: 'Andrea' }))

      render(
        React.createElement(AuthProvider, null,
          React.createElement(TestConsumer, null)
        )
      )

      expect(screen.getByTestId('auth-status').textContent).toBe('true')
    })
  })
})
