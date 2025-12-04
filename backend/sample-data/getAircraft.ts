import type { AircraftSummary } from '../../core/src/models/AircraftSummary.js'

export const aircraft: AircraftSummary[] = [
  {
    id: '1',
    registration: 'N519ER',
    description: 'Cessna 172S Skyhawk',
    normalChecklistCount: 15,
    emergencyChecklistCount: 8,
    img: 'c172s.jpg',
  },
  {
    id: '2',
    registration: 'N2481T',
    description: 'Piper Warrior II',
    normalChecklistCount: 15,
    emergencyChecklistCount: 9,
    img: 'pa28-161.jpg'
  }
];
