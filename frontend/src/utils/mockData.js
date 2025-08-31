// Mock data for FolkloreGPT frontend

export const mockStories = [
  {
    id: 1,
    title: "The Moon's Daughter",
    culture: "Khasi",
    region: "Northeast India",
    language: "Khasi",
    duration: "8 min",
    listeners: "2.3k",
    rating: 4.9,
    description: "A beautiful tale about a young woman who was born from the moon's tears, blessed with the power to bring rain to drought-stricken lands.",
    moral: "Kindness and sacrifice for others brings the greatest rewards.",
    narrator: "Elder Aiom Syiem",
    audioUrl: "/audio/moons-daughter.mp3",
    transcript: "Long ago, when the moon was young and the earth was thirsty...",
    tags: ["Moon", "Rain", "Sacrifice", "Magic"],
    difficulty: "Easy",
    ageGroup: "All Ages",
    submittedBy: "Khasi Cultural Center",
    submittedDate: "2024-12-15",
    category: "Creation Myth"
  },
  {
    id: 2,
    title: "The Talking Tree",
    culture: "Maori",
    region: "New Zealand",
    language: "Te Reo Maori",
    duration: "12 min",
    listeners: "1.8k",
    rating: 4.7,
    description: "An ancient kauri tree gains the ability to speak and shares wisdom with the local iwi (tribe) about living in harmony with nature.",
    moral: "Nature has wisdom to offer if we learn to listen.",
    narrator: "Koro Tane Williams",
    audioUrl: "/audio/talking-tree.mp3",
    transcript: "In the time of our ancestors, there stood a mighty kauri...",
    tags: ["Nature", "Wisdom", "Trees", "Harmony"],
    difficulty: "Medium",
    ageGroup: "Children & Adults",
    submittedBy: "Te Arawa iwi",
    submittedDate: "2024-12-10",
    category: "Nature Story"
  },
  {
    id: 3,
    title: "River Spirit's Gift",
    culture: "Cherokee",
    region: "North America",
    language: "Cherokee",
    duration: "15 min",
    listeners: "3.1k",
    rating: 4.8,
    description: "A young Cherokee boy helps a river spirit and receives a gift that will help his people through a harsh winter.",
    moral: "Helping others without expecting reward brings unexpected blessings.",
    narrator: "Elder Mary Ross",
    audioUrl: "/audio/river-spirit.mp3",
    transcript: "When the leaves turned gold and the wind grew cold...",
    tags: ["River", "Spirits", "Generosity", "Winter"],
    difficulty: "Medium",
    ageGroup: "All Ages",
    submittedBy: "Cherokee Nation",
    submittedDate: "2024-12-08",
    category: "Spirit Story"
  },
  {
    id: 4,
    title: "The Dancing Stars",
    culture: "Inuit",
    region: "Arctic Canada",
    language: "Inuktitut",
    duration: "10 min",
    listeners: "1.5k",
    rating: 4.6,
    description: "A story about how the Northern Lights came to be, told through the eyes of a young Inuit girl who befriends the aurora spirits.",
    moral: "Beauty comes from joy and celebration, even in the darkest times.",
    narrator: "Aput Kanguq",
    audioUrl: "/audio/dancing-stars.mp3",
    transcript: "In the long darkness of winter, when the sun forgot to rise...",
    tags: ["Aurora", "Stars", "Dancing", "Light"],
    difficulty: "Easy",
    ageGroup: "Children",
    submittedBy: "Inuit Cultural Association",
    submittedDate: "2024-12-05",
    category: "Creation Myth"
  },
  {
    id: 5,
    title: "The Wise Elephant",
    culture: "Zulu",
    region: "South Africa",
    language: "isiZulu",
    duration: "13 min",
    listeners: "2.7k",
    rating: 4.9,
    description: "An old elephant leads her herd to safety during a drought, using ancient knowledge passed down through generations.",
    moral: "Wisdom comes with age and experience, and should be respected.",
    narrator: "Gogo Nomsa Mthembu",
    audioUrl: "/audio/wise-elephant.mp3",
    transcript: "When the rains failed and the rivers ran dry...",
    tags: ["Elephant", "Wisdom", "Drought", "Leadership"],
    difficulty: "Medium",
    ageGroup: "All Ages",
    submittedBy: "Zulu Cultural Society",
    submittedDate: "2024-12-03",
    category: "Animal Story"
  },
  {
    id: 6,
    title: "The Singing Stones",
    culture: "Aboriginal Australian",
    region: "Central Australia",
    language: "Pitjantjatjara",
    duration: "18 min",
    listeners: "1.9k",
    rating: 4.5,
    description: "A dreamtime story about how certain rocks in the desert learned to sing, guiding lost travelers to safety.",
    moral: "The land itself can be a teacher and protector.",
    narrator: "Uncle Billy Nakamarra",
    audioUrl: "/audio/singing-stones.mp3",
    transcript: "In the Dreamtime, when the world was still being sung into existence...",
    tags: ["Dreamtime", "Rocks", "Singing", "Desert"],
    difficulty: "Hard",
    ageGroup: "Adults",
    submittedBy: "Anangu Tours",
    submittedDate: "2024-12-01",
    category: "Dreamtime Story"
  }
];

export const mockCultures = [
  {
    id: 1,
    name: "Khasi",
    region: "Northeast India",
    language: "Khasi",
    storyCount: 45,
    description: "Indigenous tribe from the hills of Meghalaya, known for their matrilineal society and rich oral traditions.",
    flag: "🇮🇳",
    color: "bg-green-500"
  },
  {
    id: 2,
    name: "Maori",
    region: "New Zealand",
    language: "Te Reo Maori",
    storyCount: 78,
    description: "The indigenous Polynesian people of New Zealand, known for their powerful storytelling and connection to nature.",
    flag: "🇳🇿",
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "Cherokee",
    region: "North America",
    language: "Cherokee",
    storyCount: 62,
    description: "One of the indigenous peoples of the Southeastern United States, with a rich tradition of storytelling and wisdom.",
    flag: "🇺🇸",
    color: "bg-red-500"
  },
  {
    id: 4,
    name: "Inuit",
    region: "Arctic Canada",
    language: "Inuktitut",
    storyCount: 34,
    description: "Indigenous peoples of the Arctic, known for their stories of survival and the spirits of the northern lights.",
    flag: "🇨🇦",
    color: "bg-cyan-500"
  },
  {
    id: 5,
    name: "Zulu",
    region: "South Africa",
    language: "isiZulu",
    storyCount: 56,
    description: "Bantu ethnic group of Southern Africa, known for their warrior culture and animal wisdom stories.",
    flag: "🇿🇦",
    color: "bg-yellow-500"
  },
  {
    id: 6,
    name: "Aboriginal Australian",
    region: "Australia",
    language: "Various Aboriginal languages",
    storyCount: 89,
    description: "The indigenous peoples of Australia, with the world's oldest continuous culture and dreamtime stories.",
    flag: "🇦🇺",
    color: "bg-orange-500"
  }
];

export const mockLanguages = [
  "Khasi", "Te Reo Maori", "Cherokee", "Inuktitut", "isiZulu", "Pitjantjatjara",
  "Navajo", "Quechua", "Guarani", "Sami", "Tibetan", "Ainu", "Hmong","others"
];

export const mockCategories = [
  "Creation Myth", "Nature Story", "Spirit Story", "Animal Story", "Dreamtime Story",
  "Trickster Tale", "Love Story", "Wisdom Story", "Hero's Journey", "Cautionary Tale","others"
];

export const mockVoiceSettings = {
  speed: 1.0,
  pitch: 1.0,
  volume: 0.8,
  preferredLanguage: "English",
  autoTranslate: false,
  showTranscript: true
};

export const mockUserSubmissions = [
  {
    id: 1,
    title: "The Golden Fish",
    culture: "Vietnamese",
    status: "pending",
    submittedDate: "2024-12-20",
    description: "A story about a magical fish that grants wishes to those pure of heart."
  },
  {
    id: 2,
    title: "Mountain Spirit's Warning",
    culture: "Tibetan",
    status: "approved",
    submittedDate: "2024-12-18",
    description: "A tale of respecting the mountain spirits and the consequences of ignoring their warnings."
  }
];

export const mockStats = {
  totalStories: 1247,
  totalLanguages: 52,
  totalCultures: 34,
  totalListeners: 25678,
  storiesThisMonth: 89,
  newLanguagesAdded: 3
};