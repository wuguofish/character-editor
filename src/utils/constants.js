export const GOOGLE_CONFIG = {
  CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  SCOPES: 'https://www.googleapis.com/auth/drive.file'
}

export const CHARACTER_TEMPLATE = {
  personalInfo: {
    name: "",
    age: "",
    profession: "",
    quote: "",
    description: "",
    tags: [],
  },
  basicSettings: {
    gender: "",
    basicInfo: "",
    personality: "",
    speakingStyle: "",
  },
  firstChat: {
    scenario: "",
    dialogue: "",
  },
  detailedSettings: {
    likes: "",
    dislikes: "",
    additional: [
      { title: "", content: "" }
    ],
  },
  events: [
    { title: "", timeAndPlace: "", content: "" }
  ],
  secretStories: {
    acquaintance: [
      {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: 0
      }
    ],
    friend: [
      {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: 20
      }
    ],
    crush: [
      {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: 50
      }
    ],
    lover: [
      {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: 400
      }
    ],
    married: [
      {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: 4000
      }
    ]
  },
};