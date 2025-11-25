import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import type { LanguageModelV2 } from "@ai-sdk/provider";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { getProviderConfig, type LLMProviderType } from "./provider-config";

/**
 * Create a language model instance based on the configured provider
 */
function createLanguageModel(
  provider: LLMProviderType,
  modelId: string
): LanguageModelV2 {
  switch (provider) {
    case "anthropic":
      return anthropic(modelId);
    case "google":
      return google(modelId);
    case "openai":
    default:
      return openai(modelId);
  }
}

/**
 * Create the provider with dynamic model configuration
 */
function createDynamicProvider() {
  const config = getProviderConfig();

  return customProvider({
    languageModels: {
      "chat-model": createLanguageModel(config.provider, config.chatModel),
      "chat-model-reasoning": createLanguageModel(
        config.provider,
        config.reasoningModel
      ),
      "title-model": createLanguageModel(config.provider, config.titleModel),
      "artifact-model": createLanguageModel(
        config.provider,
        config.artifactModel
      ),
    },
  });
}

export const myProvider = isTestEnvironment
  ? (() => {
      const { artifactModel, chatModel, reasoningModel, titleModel } =
        require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : createDynamicProvider();
