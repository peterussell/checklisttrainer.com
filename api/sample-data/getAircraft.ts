// TODO: share with web
export type Aircraft = {
  id: string,
  registration: string,
  description: string,
  normalChecklistCount: number,
  emergencyChecklistCount: number,
  img: string
};

export const aircraft: Record<string, Aircraft> = {
  'C172S': {
    id: '1',
    registration: 'N519ER',
    description: 'Cessna 172S Skyhawk',
    normalChecklistCount: 15,
    emergencyChecklistCount: 8,
    img: 'c172s.jpg',
  },
  'PA28-161': {
    id: '2',
    registration: 'N2481T',
    description: 'Piper Warrior II',
    normalChecklistCount: 15,
    emergencyChecklistCount: 9,
    img: 'pa28-161.jpg'
  }
}