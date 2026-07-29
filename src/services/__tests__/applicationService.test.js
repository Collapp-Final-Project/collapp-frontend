import { describe, it, expect, vi, beforeEach } from 'vitest'
import { applicationService } from '../applicationService'

vi.mock('../../api/axiosClient', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
  },
}))

import axiosClient from '../../api/axiosClient'

describe('applicationService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('debe llamar a POST /applications con offerId y message, y retornar response.data', async () => {
      const mockResponse = { data: { id: 10, offerId: 5, message: 'Me interesa' } }
      axiosClient.post.mockResolvedValue(mockResponse)

      const result = await applicationService.create(5, 'Me interesa')

      expect(axiosClient.post).toHaveBeenCalledWith('/applications', { offerId: 5, message: 'Me interesa' })
      expect(axiosClient.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('listMine', () => {
    it('debe llamar a GET /applications/mine y retornar response.data', async () => {
      const mockResponse = { data: [{ id: 1, offerId: 5 }] }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await applicationService.listMine()

      expect(axiosClient.get).toHaveBeenCalledWith('/applications/mine')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('updateStatus', () => {
    it('debe llamar a PATCH /applications/:id/status con el status y retornar response.data', async () => {
      const mockResponse = { data: { id: 10, status: 'ACCEPTED' } }
      axiosClient.patch.mockResolvedValue(mockResponse)

      const result = await applicationService.updateStatus(10, 'ACCEPTED')

      expect(axiosClient.patch).toHaveBeenCalledWith('/applications/10/status', { status: 'ACCEPTED' })
      expect(axiosClient.patch).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('listByOffer', () => {
    it('debe llamar a GET /offers/:offerId/applications y retornar response.data', async () => {
      const mockResponse = { data: [{ id: 1, status: 'PENDING' }] }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await applicationService.listByOffer(5)

      expect(axiosClient.get).toHaveBeenCalledWith('/offers/5/applications')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })
})
