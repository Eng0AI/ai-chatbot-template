/**
 * LLM Provider Configuration
 *
 * All LLM configuration is read from environment variables - NO hardcoded defaults.
 * This allows each template deployment to configure its own provider and models.
 *
 * Required environment variables:
 * - LLM_PROVIDER: "openai" | "anthropic" | "google"
 * - LLM_CHAT_MODEL: Model ID for chat (e.g., "gpt-4o", "claude-sonnet-4-5-20250514")
 * - LLM_REASONING_MODEL: Model ID for reasoning (e.g., "o1", "claude-sonnet-4-5-20250514")
 *
 * Optional environment variables:
 * - LLM_TITLE_MODEL: Model for generating titles (defaults to LLM_CHAT_MODEL)
 * - LLM_ARTIFACT_MODEL: Model for artifacts (defaults to LLM_CHAT_MODEL)
 * - LLM_CHAT_MODEL_NAME: Display name for chat model (defaults to model ID)
 * - LLM_REASONING_MODEL_NAME: Display name for reasoning model (defaults to model ID)
 *
 * API key environment variables per provider:
 * - OpenAI: OPENAI_API_KEY
 * - Anthropic: ANTHROPIC_API_KEY
 * - Google: GOOGLE_API_KEY
 */

export type LLMProviderType = "openai" | "anthropic" | "google";

export interface LLMProviderConfig {
  provider: LLMProviderType;
  chatModel: string;
  chatModelName: string;
  reasoningModel: string;
  reasoningModelName: string;
  titleModel: string;
  artifactModel: string;
}

/**
 * Get the configured LLM provider from environment variables
 * Checks both server-side (LLM_PROVIDER) and client-side (NEXT_PUBLIC_LLM_PROVIDER) vars
 */
export function getLLMProvider(): LLMProviderType {
  const provider = (
    process.env.LLM_PROVIDER || process.env.NEXT_PUBLIC_LLM_PROVIDER
  )?.toLowerCase();

  if (
    provider === "anthropic" ||
    provider === "google" ||
    provider === "openai"
  ) {
    return provider;
  }

  throw new Error(
    "LLM_PROVIDER environment variable is required. Set to 'openai', 'anthropic', or 'google'."
  );
}

/**
 * Get the full provider configuration based on environment variables
 * Checks both server-side and client-side (NEXT_PUBLIC_) versions of each variable
 */
export function getProviderConfig(): LLMProviderConfig {
  const provider = getLLMProvider();

  const chatModel =
    process.env.LLM_CHAT_MODEL || process.env.NEXT_PUBLIC_LLM_CHAT_MODEL;
  const reasoningModel =
    process.env.LLM_REASONING_MODEL ||
    process.env.NEXT_PUBLIC_LLM_REASONING_MODEL;

  if (!chatModel) {
    throw new Error(
      "LLM_CHAT_MODEL environment variable is required. Example: 'gpt-4o', 'claude-sonnet-4-5-20250514', 'gemini-2.5-flash'"
    );
  }

  if (!reasoningModel) {
    throw new Error(
      "LLM_REASONING_MODEL environment variable is required. Example: 'o1', 'claude-sonnet-4-5-20250514', 'gemini-2.5-pro'"
    );
  }

  // Optional models - default to chat model
  const titleModel =
    process.env.LLM_TITLE_MODEL ||
    process.env.NEXT_PUBLIC_LLM_TITLE_MODEL ||
    chatModel;
  const artifactModel =
    process.env.LLM_ARTIFACT_MODEL ||
    process.env.NEXT_PUBLIC_LLM_ARTIFACT_MODEL ||
    chatModel;

  // Display names - default to model ID
  const chatModelName =
    process.env.LLM_CHAT_MODEL_NAME ||
    process.env.NEXT_PUBLIC_LLM_CHAT_MODEL_NAME ||
    chatModel;
  const reasoningModelName =
    process.env.LLM_REASONING_MODEL_NAME ||
    process.env.NEXT_PUBLIC_LLM_REASONING_MODEL_NAME ||
    reasoningModel;

  return {
    provider,
    chatModel,
    chatModelName,
    reasoningModel,
    reasoningModelName,
    titleModel,
    artifactModel,
  };
}

/**
 * Check if the required API key is configured for the current provider
 */
export function hasRequiredApiKey(): boolean {
  const provider = getLLMProvider();

  switch (provider) {
    case "openai":
      return Boolean(process.env.OPENAI_API_KEY);
    case "anthropic":
      return Boolean(process.env.ANTHROPIC_API_KEY);
    case "google":
      return Boolean(process.env.GOOGLE_API_KEY);
    default:
      return false;
  }
}
