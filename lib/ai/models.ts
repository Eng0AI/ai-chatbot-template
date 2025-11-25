import { getProviderConfig, getLLMProvider } from "./provider-config";

export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

/**
 * Get the chat models based on environment configuration
 * Model IDs are "chat-model" and "chat-model-reasoning"
 * Display names come from LLM_CHAT_MODEL_NAME and LLM_REASONING_MODEL_NAME env vars
 */
export function getChatModels(): ChatModel[] {
  const config = getProviderConfig();
  const provider = getLLMProvider();

  const providerDescriptions: Record<
    string,
    { chat: string; reasoning: string }
  > = {
    openai: {
      chat: "Advanced multimodal model with vision and text capabilities",
      reasoning:
        "Uses advanced chain-of-thought reasoning for complex problems",
    },
    anthropic: {
      chat: "Advanced AI assistant with strong reasoning and coding abilities",
      reasoning:
        "Extended thinking mode for complex analysis and problem solving",
    },
    google: {
      chat: "Fast and efficient multimodal model with large context window",
      reasoning: "Advanced reasoning model for complex analytical tasks",
    },
  };

  const descriptions =
    providerDescriptions[provider] || providerDescriptions.openai;

  return [
    {
      id: "chat-model",
      name: config.chatModelName,
      description: descriptions.chat,
    },
    {
      id: "chat-model-reasoning",
      name: config.reasoningModelName,
      description: descriptions.reasoning,
    },
  ];
}

// Export for backwards compatibility
export const chatModels: ChatModel[] = getChatModels();
