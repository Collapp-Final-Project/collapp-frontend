import { describe, it, expect, vi, beforeEach } from 'vitest'
import { userService } from '../userService'

vi.mock('../../api/axiosClient', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}))

import axiosClient from '../../api/axiosClient'

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMe', () => {
    it('debe llamar a GET /users/me y retornar response.data', async () => {
      const mockResponse = { data: { id: 1, name: 'Andrea', email: 'andrea@test.com' } }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await userService.getMe()

      expect(axiosClient.get).toHaveBeenCalledWith('/users/me')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('updateMe', () => {
    it('debe llamar a PUT /users/me con los datos y retornar response.data', async () => {
      const userData = { name: 'Andrea Updated', bio: 'Nueva bio' }
      const mockResponse = { data: { id: 1, ...userData } }
      axiosClient.put.mockResolvedValue(mockResponse)

      const result = await userService.updateMe(userData)

      expect(axiosClient.put).toHaveBeenCalledWith('/users/me', userData)
      expect(axiosClient.put).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })
})
