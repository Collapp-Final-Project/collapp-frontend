import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '../authService'

vi.mock('../../api/axiosClient', () => ({
  default: {
    post: vi.fn(),
  },
}))

import axiosClient from '../../api/axiosClient'

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('debe llamar a POST /auth/register con los datos de registro y retornar response.data', async () => {
      const registerData = { name: 'Andrea', email: 'andrea@test.com', password: 'secret123' }
      const mockResponse = { data: { token: 'jwt-token', id: 1, name: 'Andrea' } }
      axiosClient.post.mockResolvedValue(mockResponse)

      const result = await authService.register(registerData)

      expect(axiosClient.post).toHaveBeenCalledWith('/auth/register', registerData)
      expect(axiosClient.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe propagar el error si el servidor falla', async () => {
      const error = new Error('Network error')
      axiosClient.post.mockRejectedValue(error)

      await expect(authService.register({})).rejects.toThrow('Network error')
    })
  })

  describe('login', () => {
    it('debe llamar a POST /auth/login con las credenciales y retornar response.data', async () => {
      const credentials = { email: 'andrea@test.com', password: 'secret123' }
      const mockResponse = { data: { token: 'jwt-token', id: 1, name: 'Andrea' } }
      axiosClient.post.mockResolvedValue(mockResponse)

      const result = await authService.login(credentials)

      expect(axiosClient.post).toHaveBeenCalledWith('/auth/login', credentials)
      expect(axiosClient.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe propagar el error si las credenciales son inválidas', async () => {
      const error = { response: { status: 401, data: { message: 'Invalid credentials' } } }
      axiosClient.post.mockRejectedValue(error)

      await expect(authService.login({ email: 'bad', password: 'bad' })).rejects.toEqual(error)
    })
  })
})
