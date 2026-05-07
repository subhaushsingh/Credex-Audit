export const AI_CATEGORIES = {
  CODE_EDITOR: 'Code Editor',
  CODE_ASSISTANT: 'Coding Assistant',
  GENERAL_LLM: 'General Purpose LLM',
  UI_GEN: 'UI Generation'
};

export const AI_PRICING = {
  cursor: {
    name: 'Cursor',
    category: AI_CATEGORIES.CODE_EDITOR,
    tiers: { hobby: 0, pro: 20, business: 40 }
  },
  github_copilot: {
    name: 'GitHub Copilot',
    category: AI_CATEGORIES.CODE_ASSISTANT,
    tiers: { individual: 10, business: 19, enterprise: 39 }
  },
  claude: {
    name: 'Claude',
    category: AI_CATEGORIES.GENERAL_LLM,
    tiers: { free: 0, pro: 20, team: 30 }
  },
  chatgpt: {
    name: 'ChatGPT',
    category: AI_CATEGORIES.GENERAL_LLM,
    tiers: { plus: 20, team: 30, pro: 100 }
  },
  gemini: {
    name: 'Gemini',
    category: AI_CATEGORIES.GENERAL_LLM,
    tiers: { pro: 19.99, ultra: 41.67 }
  },
  windsurf: {
    name: 'Windsurf',
    category: AI_CATEGORIES.CODE_EDITOR,
    tiers: { pro: 15, team: 30 }
  },
  v0: {
    name: 'v0.dev',
    category: AI_CATEGORIES.UI_GEN,
    tiers: { pro: 20, team: 30 }
  }
};
