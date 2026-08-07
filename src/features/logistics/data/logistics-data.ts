import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const logisticsKpis = [
  { label: 'Active Deliveries', value: 31, hint: '9 in final mile' },
  { label: 'Pending Deliveries', value: 14, hint: '5 waiting allocation' },
  { label: 'Vehicle Status', value: '42 Active / 6 Service', hint: 'Fleet utilization 88%' },
  { label: 'Driver Status', value: '53 On Duty / 7 Off', hint: 'Attendance synced today' },
  { label: 'Fuel Consumption', value: 18240, hint: 'Liters this month' },
  { label: 'Maintenance Schedule', value: 12, hint: 'Upcoming this week' },
]

export const deliveriesTrend = [
  { month: 'Jan', deliveries: 380, fuel: 14800 },
  { month: 'Feb', deliveries: 402, fuel: 15200 },
  { month: 'Mar', deliveries: 431, fuel: 15800 },
  { month: 'Apr', deliveries: 448, fuel: 16400 },
  { month: 'May', deliveries: 471, fuel: 17100 },
  { month: 'Jun', deliveries: 495, fuel: 17800 },
]

export const vehiclesRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `VEH-${String(index + 1).padStart(4, '0')}`,
  plateNo: `DXB-${String(1000 + index)}`,
  type: ['Truck', 'Van', 'Trailer', 'Pickup'][index % 4],
  driver: ['A. Rahim', 'N. Patel', 'M. Omar', 'S. Ilyas'][index % 4],
  status: ['Active', 'Maintenance', 'Active', 'Idle'][index % 4],
}))

export const driversRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `DRV-${String(index + 1).padStart(4, '0')}`,
  name: ['A. Rahim', 'N. Patel', 'M. Omar', 'S. Ilyas'][index % 4],
  license: `LIC-${String(7000 + index)}`,
  phone: `+971-50-12${String(index).padStart(2, '0')}-88${String(index).padStart(2, '0')}`,
  status: ['On Duty', 'Off Duty', 'On Leave', 'On Duty'][index % 4],
}))

export const routesRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `RTE-${String(index + 1).padStart(4, '0')}`,
  reference: `RTE-2026-${String(index + 1).padStart(4, '0')}`,
  origin: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'][index % 4],
  destination: ['Sharjah', 'Ajman', 'Dubai', 'Abu Dhabi'][index % 4],
  distance: 40 + index * 12,
  status: ['Planned', 'Active', 'Closed', 'Active'][index % 4],
}))

export const deliveriesRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `DLV-${String(index + 1).padStart(4, '0')}`,
  reference: `DLV-2026-${String(index + 1).padStart(4, '0')}`,
  route: routesRows[index % routesRows.length].reference,
  driver: driversRows[index % driversRows.length].name,
  eta: day(index - 2),
  status: ['Scheduled', 'In Transit', 'Delivered', 'Pending'][index % 4],
}))

export const maintenanceRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `MNT-${String(index + 1).padStart(4, '0')}`,
  reference: `MNT-2026-${String(index + 1).padStart(4, '0')}`,
  vehicle: vehiclesRows[index % vehiclesRows.length].plateNo,
  serviceType: ['Oil Change', 'Brake Inspection', 'Tire Rotation', 'Engine Diagnostics'][index % 4],
  date: day(index),
  status: ['Scheduled', 'Completed', 'In Progress', 'Scheduled'][index % 4],
}))

export const fuelRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `FUL-${String(index + 1).padStart(4, '0')}`,
  reference: `FUL-2026-${String(index + 1).padStart(4, '0')}`,
  vehicle: vehiclesRows[index % vehiclesRows.length].plateNo,
  liters: 120 + index * 8,
  amount: 480 + index * 42,
  date: day(index),
  status: ['Posted', 'Posted', 'Pending', 'Posted'][index % 4],
}))

export const tripRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `TRP-${String(index + 1).padStart(4, '0')}`,
  reference: `TRP-2026-${String(index + 1).padStart(4, '0')}`,
  route: routesRows[index % routesRows.length].reference,
  driver: driversRows[index % driversRows.length].name,
  date: day(index),
  status: ['Completed', 'Completed', 'Delayed', 'Completed'][index % 4],
}))

export function vehicleDetail(id: string) {
  const row = vehiclesRows.find((item) => item.id === id) ?? vehiclesRows[0]
  return {
    ...row,
    timeline: ['Vehicle assigned to delivery route', 'Fuel log validated', 'Preventive maintenance scheduled'],
  }
}

export function driverDetail(id: string) {
  const row = driversRows.find((item) => item.id === id) ?? driversRows[0]
  return {
    ...row,
    timeline: ['Driver attendance marked', 'Delivery assignment confirmed', 'Trip closed with POD upload'],
  }
}
