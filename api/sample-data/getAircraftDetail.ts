import type { Aircraft } from '../../core/models/Aircraft.js';

export const aircraftDetail: Aircraft[] = [
  {
    id: '1',
    registration: 'N519ER',
    description: 'Cessna 172S Skyhawk',
    views: [
      {
        isDefault: true,
        src: 'c172s.jpg',
        description: "Forward view",
        controls: [
          {
            title: "Annunciator lights",
            xPos: 32,
            yPos: 16,
            actions: ["Test"]
          },
          {
            title: "Avionics",
            xPos: 18,
            yPos: 54,
            actions: ["On", "Off"]
          },
          {
            title: "Control lock",
            xPos: 25,
            yPos: 47,
            actions: ["Remove", "Replace"]
          },
          {
            title: "Circuit breakers",
            xPos: 14,
            yPos: 50,
            actions: ["All in"]
          },
          {
            title: "Flaps",
            xPos: 62,
            yPos: 59,
            actions: ["Up", "10°", "20°", "30°"]
          },
          {
            title: "Fuel guages",
            xPos: 12,
            yPos: 31,
            actions: ["Check"]
          },
          {
            title: "Fuel selector",
            xPos: 45.5,
            yPos: 94,
            actions: ["Left", "Right", "Both"]
          },
          {
            title: "Fuel shut-off valve",
            xPos: 49,
            yPos: 89,
            actions: ["On", "Off"]
          },
          {
            title: "Doors",
            xPos: 0,
            yPos: 65,
            actions: ["Latch", "Unlatch"]
          },
          {
            title: "Lights",
            xPos: 22,
            yPos: 64,
            markerRotation: 180,
            actions: ["On", "Off", "As required"],
          },
          {
            title: "Magnetos",
            xPos: 10.5,
            yPos: 56,
            actions: ["Off", "Left", "Right", "Both", "Start"]
          },
          {
            title: "Master switch",
            xPos: 14.5,
            yPos: 62,
            markerRotation: 180,
            actions: ["On", "Off", "Alt on", "Alt off", "Battery on", "Battery off"]
          },
          {
            title: "Parking brake",
            xPos: 24,
            yPos: 71,
            markerRotation: 180,
            actions: ["Set", "Off"]
          },
        ]
      },
      {
        src: 'c172s-pedestal.jpg',
        description: "Pedestal",
        controls: []
      },
    ],
    checklists: [
      // Emergency
      {
        id: '1',
        name: 'Engine failure immediately after takeoff / no restart',
        slug: 'efato-no-restart',
        type: 'emergency',
        steps: [
          { item: 'Maintain aircraft control' },
          { item: 'Airspeed', action: '70 KIAS' },
          { item: 'Fuel shutoff valve', action: 'Off' },
          { item: 'Mixture', action: 'Full lean / idle cutoff' },
          { item: 'Flaps', action: 'Down', condition: '64 KIAS' },
          { item: 'Master & mags', action: 'Off' },
          { item: 'Doors', action: 'Unlatch' }
        ]
      },
      {
        id: '2',
        name: 'Power loss in flight / no restart',
        slug: 'power-loss-in-flight-no-restart',
        type: 'emergency',
        steps: []
      },
      {
        id: '3',
        name: 'Electrical fire in flight',
        slug: 'electrical-fire-in-flight',
        type: 'emergency',
        steps: []
      },
      {
        id: '4',
        name: 'Engine fire in flight',
        slug: 'engine-fire-in-flight',
        type: 'emergency',
        steps: []
      },
      {
        id: '5',
        name: 'Engine fire during start',
        slug: 'engine-fire-during-start',
        type: 'emergency',
        steps: []
      },
      {
        id: '6',
        name: 'Icing',
        slug: 'icing',
        type: 'emergency',
        steps: []
      },
      {
        id: '7',
        name: 'Excessive rate of charge',
        slug: 'excessive-rate-of-charge',
        type: 'emergency',
        steps: []
      },
      {
        id: '8',
        name: 'Insufficient rate of charge',
        slug: 'insufficient-rate-of-charge',
        type: 'emergency',
        steps: []
      },
      // Normal
      {
        id: '9',
        name: 'Interior',
        slug: 'interior',
        type: 'normal',
        steps: []
      },
      {
        id: '10',
        name: 'Start',
        slug: 'start',
        type: 'normal',
        steps: []
      },
      {
        id: '11',
        name: 'Pre-taxi / taxi',
        slug: 'pre-taxi-taxi',
        type: 'normal',
        steps: []
      },
      {
        id: '12',
        name: 'Run-up',
        slug: 'run-up',
        type: 'normal',
        steps: []
      },
      {
        id: '13',
        name: 'Pre-takeoff',
        slug: 'pre-takeoff',
        type: 'normal',
        steps: []
      },
      {
        id: '14',
        name: 'Takeoff',
        slug: 'takeoff',
        type: 'normal',
        steps: []
      },
      {
        id: '15',
        name: 'Climb',
        slug: 'climb',
        type: 'normal',
        steps: []
      },
      {
        id: '16',
        name: 'Cruis',
        slug: 'cruise',
        type: 'normal',
        steps: []
      },
      {
        id: '17',
        name: 'Descent',
        slug: 'descent',
        type: 'normal',
        steps: []
      },
      {
        id: '18',
        name: 'Pre-landing',
        slug: 'pre-landing',
        type: 'normal',
        steps: []
      },
      {
        id: '19',
        name: 'Landing',
        slug: 'landing',
        type: 'normal',
        steps: []
      },
      {
        id: '20',
        name: 'After landing',
        slug: 'after-landing',
        type: 'normal',
        steps: []
      },
      {
        id: '21',
        name: 'Securing',
        slug: 'securing',
        type: 'normal',
        steps: []
      },
    ]
  },
  {
    id: '2',
    registration: 'N2481T',
    description: 'Piper Warrior II',
    views: [
      { src: 'pa28-161.jpg', isDefault: true, description: "Forward view", items: [] }
    ],
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
