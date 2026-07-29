import { describe, it, expect, vi, beforeEach } from 'vitest'
import { offerService } from '../offerService'

vi.mock('../../api/axiosClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

import axiosClient from '../../api/axiosClient'

describe('offerService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('debe llamar a GET /offers sin params y retornar response.data', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Oferta 1' }] }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await offerService.list()

      expect(axiosClient.get).toHaveBeenCalledWith('/offers', { params: {} })
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe llamar a GET /offers con params opcionales', async () => {
      const params = { category: 'MAKEUP', status: 'OPEN' }
      axiosClient.get.mockResolvedValue({ data: [] })

      await offerService.list(params)

      expect(axiosClient.get).toHaveBeenCalledWith('/offers', { params })
    })
  })

  describe('getById', () => {
    it('debe llamar a GET /offers/:id y retornar response.data', async () => {
      const mockResponse = { data: { id: 42, title: 'Oferta específica' } }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await offerService.getById(42)

      expect(axiosClient.get).toHaveBeenCalledWith('/offers/42')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('create', () => {
    it('debe llamar a POST /offers con los datos y retornar response.data', async () => {
      const offerData = { title: 'Nueva oferta', category: 'MAKEUP' }
      const mockResponse = { data: { id: 1, ...offerData } }
      axiosClient.post.mockResolvedValue(mockResponse)

      const result = await offerService.create(offerData)

      expect(axiosClient.post).toHaveBeenCalledWith('/offers', offerData)
      expect(axiosClient.post).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('update', () => {
    it('debe llamar a PUT /offers/:id con los datos y retornar response.data', async () => {
      const offerData = { title: 'Oferta actualizada' }
      const mockResponse = { data: { id: 1, ...offerData } }
      axiosClient.put.mockResolvedValue(mockResponse)

      const result = await offerService.update(1, offerData)

      expect(axiosClient.put).toHaveBeenCalledWith('/offers/1', offerData)
      expect(axiosClient.put).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('updateStatus', () => {
    it('debe llamar a PATCH /offers/:id/status con el status y retornar response.data', async () => {
      const mockResponse = { data: { id: 1, status: 'COVERED' } }
      axiosClient.patch.mockResolvedValue(mockResponse)

      const result = await offerService.updateStatus(1, 'COVERED')

      expect(axiosClient.patch).toHaveBeenCalledWith('/offers/1/status', { status: 'COVERED' })
      expect(axiosClient.patch).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('remove', () => {
    it('debe llamar a DELETE /offers/:id', async () => {
      axiosClient.delete.mockResolvedValue({})

      await offerService.remove(1)

      expect(axiosClient.delete).toHaveBeenCalledWith('/offers/1')
      expect(axiosClient.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('listMine', () => {
    it('debe llamar a GET /offers/mine y retornar response.data', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Mi oferta' }] }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await offerService.listMine()

      expect(axiosClient.get).toHaveBeenCalledWith('/offers/mine')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('listAll', () => {
    it('debe llamar a GET /offers/all y retornar response.data', async () => {
      const mockResponse = { data: [{ id: 1 }, { id: 2 }] }
      axiosClient.get.mockResolvedValue(mockResponse)

      const result = await offerService.listAll()

      expect(axiosClient.get).toHaveBeenCalledWith('/offers/all')
      expect(axiosClient.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })
  })
})
