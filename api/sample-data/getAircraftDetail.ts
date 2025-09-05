import type { Aircraft } from '../../core/models/Aircraft.js';

export const aircraftDetail: Aircraft[] = [
  {
    id: '1',
    registration: 'N519ER',
    description: 'Cessna 172S Skyhawk',
    img: 'c172s.jpg',
    checklists: [
      // Emergency
      { name: 'Engine failure during takeoff roll', category: 'Engine failures', slug: 'engine-failure-during-takeoff-roll', type: 'emergency' },
      { name: 'Engine failure immediately after takeoff', category: 'Engine failures', slug: 'engine-failure-immediately after takeoff', type: 'emergency' },
      { name: 'Engine failure during flight', category: 'Engine failures', slug: 'engine-failure-during-flight', type: 'emergency' },
      { name: 'Emergency landing without engine power', category: 'Forced landings', slug: 'emergency-landing-without-engine-power', type: 'emergency' },
      { name: 'Precautionary landing with engine power', category: 'Forced landings', slug: 'precautionary-landing-with-engine-power', type: 'emergency' },
      { name: 'Ditching', category: 'Forced landings', slug: 'ditching', type: 'emergency' },

      // Normal
      { name: 'Cabin', category: 'Preflight inspection', slug: 'cabin', type: 'normal' },
      { name: 'Empennage', category: 'Preflight inspection', slug: 'empennage', type: 'normal' },
      { name: 'Right wing, trailing edge', category: 'Preflight inspection', slug: 'right-wing-trailing-edge', type: 'normal' },
      { name: 'Right wing', category: 'Preflight inspection', slug: 'right-wing', type: 'normal' },
      { name: 'Nose', category: 'Preflight inspection', slug: 'nose', type: 'normal' },
      { name: 'Left wing', category: 'Preflight inspection', slug: 'left-wing', type: 'normal' },
      { name: 'Left wing, leading edge', category: 'Preflight inspection', slug: 'left-wing-leading-edge', type: 'normal' },
      { name: 'Left wing, trailing edge', category: 'Preflight inspection', slug: 'left-wing-trailing-edge', type: 'normal' },
    ]
  }
];
