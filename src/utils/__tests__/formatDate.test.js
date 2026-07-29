import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDateRange, formatRelativeDate } from '../formatDate'

describe('formatDateRange', () => {
  it('debe retornar una sola fecha cuando ambas fechas son iguales', () => {
    const date = '2026-03-15T10:00:00Z'
    const result = formatDateRange(date, date)
    expect(result).toContain('mar')
    expect(result).toContain('2026')
    expect(result).not.toContain('–')
  })

  it('debe retornar un rango con el formato "inicio – fin" cuando las fechas son diferentes', () => {
    const result = formatDateRange('2026-03-10T10:00:00Z', '2026-03-15T10:00:00Z')
    expect(result).toContain('–')
    const parts = result.split(' – ')
    expect(parts).toHaveLength(2)
  })
})

describe('formatRelativeDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-29T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debe retornar "Hace un momento" para menos de 60 segundos', () => {
    const result = formatRelativeDate(new Date('2026-07-29T11:59:30Z').toISOString())
    expect(result).toBe('Hace un momento')
  })

  it('debe retornar "Hace X min" para menos de 60 minutos', () => {
    const result = formatRelativeDate(new Date('2026-07-29T11:45:00Z').toISOString())
    expect(result).toBe('Hace 15 min')
  })

  it('debe retornar "Hace X h" para menos de 24 horas', () => {
    const result = formatRelativeDate(new Date('2026-07-29T08:00:00Z').toISOString())
    expect(result).toBe('Hace 4 h')
  })

  it('debe retornar "Hace 1 día" para exactamente un día', () => {
    const result = formatRelativeDate(new Date('2026-07-28T12:00:00Z').toISOString())
    expect(result).toBe('Hace 1 día')
  })

  it('debe retornar "Hace X días" para menos de 7 días', () => {
    const result = formatRelativeDate(new Date('2026-07-26T12:00:00Z').toISOString())
    expect(result).toBe('Hace 3 días')
  })

  it('debe retornar "Hace 1 semana" para exactamente una semana', () => {
    const result = formatRelativeDate(new Date('2026-07-22T12:00:00Z').toISOString())
    expect(result).toBe('Hace 1 semana')
  })

  it('debe retornar "Hace X semanas" para menos de 30 días', () => {
    const result = formatRelativeDate(new Date('2026-07-15T12:00:00Z').toISOString())
    expect(result).toBe('Hace 2 semanas')
  })

  it('debe retornar la fecha formateada para más de 30 días', () => {
    const result = formatRelativeDate(new Date('2026-03-15T10:00:00Z').toISOString())
    expect(result).toContain('mar')
    expect(result).toContain('2026')
  })
})
