import type { Aircraft } from '../../core/models/Aircraft.js';

export const aircraftDetail: Aircraft[] = [
  {
    id: '1',
    registration: 'N519ER',
    description: 'Cessna 172S Skyhawk',
    img: 'c172s.jpg',
    checklists: [
      // Emergency
      { name: 'Engine failure during takeoff roll', slug: 'engine-failure-during-takeoff-roll', type: 'emergency' },
      { name: 'Engine failure immediately after takeoff', slug: 'engine-failure-immediately after takeoff', type: 'emergency' },
      { name: 'Engine failure during flight', slug: 'engine-failure-during-flight', type: 'emergency' },
      { name: 'Emergency landing without engine power', slug: 'emergency-landing-without-engine-power', type: 'emergency' },
      { name: 'Precautionary landing with engine power', slug: 'precautionary-landing-with-engine-power', type: 'emergency' },
      { name: 'Ditching', slug: 'ditching', type: 'emergency' },

      // Normal
      { name: 'Pre-start', slug: 'pre-start', type: 'normal' },
      { name: 'Starting engine', slug: 'starting-engine', type: 'normal' },
      { name: 'Pre-taxi', slug: 'pre-taxi', type: 'normal' },
      { name: 'Taxi', slug: 'taxi', type: 'normal' },
      { name: 'Run-up', slug: 'run-up', type: 'normal' },
      { name: 'Pre-takeoff', slug: 'pre-takeoff', type: 'normal' },
      { name: 'Normal takeoff', slug: 'normal-takeoff', type: 'normal' },
      { name: 'Short field takeoff', slug: 'short-field-takeoff', type: 'normal' },
    ]
  },
  {
    id: '2',
    registration: 'N2481T',
    description: 'Piper Warrior II',
    img: 'pa28-161.jpg',
    checklists: [
      // Emergency
      { name: 'Engine failure during takeoff roll', slug: 'engine-failure-during-takeoff-roll', type: 'emergency' },
      { name: 'Engine failure immediately after takeoff', slug: 'engine-failure-immediately after takeoff', type: 'emergency' },
      { name: 'Engine failure during flight', slug: 'engine-failure-during-flight', type: 'emergency' },
      { name: 'Emergency landing without engine power', slug: 'emergency-landing-without-engine-power', type: 'emergency' },
      { name: 'Precautionary landing with engine power', slug: 'precautionary-landing-with-engine-power', type: 'emergency' },
      { name: 'Ditching', slug: 'ditching', type: 'emergency' },

      // Normal
      { name: 'Pre-start', slug: 'pre-start', type: 'normal' },
      { name: 'Starting engine', slug: 'starting-engine', type: 'normal' },
      { name: 'Pre-taxi', slug: 'pre-taxi', type: 'normal' },
      { name: 'Taxi', slug: 'taxi', type: 'normal' },
      { name: 'Run-up', slug: 'run-up', type: 'normal' },
      { name: 'Pre-takeoff', slug: 'pre-takeoff', type: 'normal' },
      { name: 'Normal takeoff', slug: 'normal-takeoff', type: 'normal' },
      { name: 'Short field takeoff', slug: 'short-field-takeoff', type: 'normal' },
    ]
  }
];
