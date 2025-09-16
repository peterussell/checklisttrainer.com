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
    views: [
      { src: 'pa28-161.jpg', isDefault: true, description: "Forward view", controls: [] }
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
