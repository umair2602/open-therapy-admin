import mongoose, { Schema, Document } from "mongoose";

// Define interfaces for nested schemas
export interface IConversationRules {
  maxSentences: number;
  maxChars: number;
  oneQuestionPerReply: boolean;
  offerMicroActionOptional: boolean;
  chunkedDelivery: boolean;
  askFeedback: boolean;
}

export interface IQuestionTemplate {
  id: string;
  text: string;
  enabled: boolean;
}

export interface IValidationTemplate {
  id: string;
  text: string;
  enabled: boolean;
}

export interface IOptionalPractice {
  id: string;
  text: string;
  enabled: boolean;
}

export interface IResponseStructure {
  activeListeningTemplate: string;
  openQuestionTemplates: IQuestionTemplate[];
  validationTemplates: IValidationTemplate[];
  optionalPractices: IOptionalPractice[];
}

export interface IProgressionLayers {
  order: string[];
  minLayersBeforeStep: number;
  questionsPerLayer: number;
  confirmationText: string;
}

export interface IProfileMapping {
  profileId: string;
  filePath: string;
  enabled: boolean;
}

export interface IProfilePersonalization {
  enabled: boolean;
  directoryPath: string;
  fileMappingPerProfile: IProfileMapping[];
  quickGuidelinesFallback: string;
}

export interface IEmotionOpeningMapping {
  emotion: string;
  opening: string;
  enabled: boolean;
}

export interface IAreasOfLifeAndDiary {
  directoryPath: string;
  fileNamingPattern: string;
  supportedAreas: string[];
  supportedMoods: string[];
  emotionToOpeningMapping: IEmotionOpeningMapping[];
  integrationRule: string;
}

export interface IStopTrigger {
  id: string;
  type: "long_text" | "ambiguity" | "silence";
  description: string;
  enabled: boolean;
}

export interface IBrevityAndDelivery {
  standardReplyForEverything: string;
  maxItemsPerBlock: number;
  stopTriggers: IStopTrigger[];
}

export interface ISafety {
  highRiskDirectory: string;
  triggerFile: string;
  crisisProtocolFile: string;
  interruptionMessage: string;
  blockDiagnosisPrescription: boolean;
}

export interface IPractice {
  id: string;
  text: string;
  enabled: boolean;
}

export interface IQuickTools {
  practices: IPractice[];
}

export interface ILanguageStyle {
  doList: string[];
  dontList: string[];
}

export interface IContentLongPolicy {
  shortSummaryTemplate: string;
  detailQuestion: string;
  batchSize: number;
}

export interface IPolicies {
  alwaysRules: string[];
  neverRules: string[];
}

export interface IFeedback {
  enabled: boolean;
  moments: string[];
  sampleQuestions: string[];
  silenceRule: string;
}

export interface IRateLimit {
  id: string;
  type: string;
  limit: number;
  window: string;
  enabled: boolean;
}

export interface IControl {
  crisisProtocol: string;
  profileTone: string;
  optionalRateLimits?: IRateLimit[];
}

export interface IFixedMessages {
  welcome: string;
  closing: string;
}

export interface IOperationalNotes {
  replyWhenAskedMore: string;
  replyWhenAskedSummary: string;
  replyWhenUserDoesntWantToGoDeeper: string;
}

// Main interface
export interface IBloomGlobalPrompt extends Document {
  ageGroup: "adolescence" | "young_adult" | "adult" | "middle_age";
  id: string;
  slug: string;
  type: string;
  scope: string;
  description: string;
  version: string;
  status: "active" | "draft" | "archived";
  owner: string;
  conversationRules: IConversationRules;
  responseStructure: IResponseStructure;
  progressionLayers: IProgressionLayers;
  profilePersonalization: IProfilePersonalization;
  areasOfLifeAndDiary: IAreasOfLifeAndDiary;
  brevityAndDelivery: IBrevityAndDelivery;
  safety: ISafety;
  quickTools: IQuickTools;
  languageStyle: ILanguageStyle;
  contentLongPolicy: IContentLongPolicy;
  policies: IPolicies;
  feedback: IFeedback;
  control: IControl;
  fixedMessages: IFixedMessages;
  operationalNotes: IOperationalNotes;
  createdAt: string;
  updatedAt: string;
}

// Mongoose schemas for nested objects
const ConversationRulesSchema = new Schema<IConversationRules>(
  {
    maxSentences: { type: Number, required: true, min: 1, max: 10 },
    maxChars: { type: Number, required: true, min: 100, max: 2000 },
    oneQuestionPerReply: { type: Boolean, required: true },
    offerMicroActionOptional: { type: Boolean, required: true },
    chunkedDelivery: { type: Boolean, required: true },
    askFeedback: { type: Boolean, required: true },
  },
  { _id: false }
);

const QuestionTemplateSchema = new Schema<IQuestionTemplate>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const ValidationTemplateSchema = new Schema<IValidationTemplate>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const OptionalPracticeSchema = new Schema<IOptionalPractice>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const ResponseStructureSchema = new Schema<IResponseStructure>(
  {
    activeListeningTemplate: { type: String, required: true },
    openQuestionTemplates: [QuestionTemplateSchema],
    validationTemplates: [ValidationTemplateSchema],
    optionalPractices: [OptionalPracticeSchema],
  },
  { _id: false }
);

const ProgressionLayersSchema = new Schema<IProgressionLayers>(
  {
    order: { type: [String], required: true },
    minLayersBeforeStep: { type: Number, required: true },
    questionsPerLayer: { type: Number, required: true },
    confirmationText: { type: String, required: true },
  },
  { _id: false }
);

const ProfileMappingSchema = new Schema<IProfileMapping>(
  {
    profileId: { type: String, required: true },
    filePath: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const ProfilePersonalizationSchema = new Schema<IProfilePersonalization>(
  {
    enabled: { type: Boolean, required: true },
    directoryPath: { type: String, required: true },
    fileMappingPerProfile: [ProfileMappingSchema],
    quickGuidelinesFallback: { type: String, required: true },
  },
  { _id: false }
);

const EmotionOpeningMappingSchema = new Schema<IEmotionOpeningMapping>(
  {
    emotion: { type: String, required: true },
    opening: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const AreasOfLifeAndDiarySchema = new Schema<IAreasOfLifeAndDiary>(
  {
    directoryPath: { type: String, required: true },
    fileNamingPattern: { type: String, required: true },
    supportedAreas: { type: [String], required: true },
    supportedMoods: { type: [String], required: true },
    emotionToOpeningMapping: [EmotionOpeningMappingSchema],
    integrationRule: { type: String, required: true },
  },
  { _id: false }
);

const StopTriggerSchema = new Schema<IStopTrigger>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["long_text", "ambiguity", "silence"],
      required: true,
    },
    description: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const BrevityAndDeliverySchema = new Schema<IBrevityAndDelivery>(
  {
    standardReplyForEverything: { type: String, required: true },
    maxItemsPerBlock: { type: Number, required: true },
    stopTriggers: [StopTriggerSchema],
  },
  { _id: false }
);

const SafetySchema = new Schema<ISafety>(
  {
    highRiskDirectory: { type: String, required: true },
    triggerFile: { type: String, required: true },
    crisisProtocolFile: { type: String, required: true },
    interruptionMessage: { type: String, required: true },
    blockDiagnosisPrescription: { type: Boolean, required: true },
  },
  { _id: false }
);

const PracticeSchema = new Schema<IPractice>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const QuickToolsSchema = new Schema<IQuickTools>(
  {
    practices: [PracticeSchema],
  },
  { _id: false }
);

const LanguageStyleSchema = new Schema<ILanguageStyle>(
  {
    doList: { type: [String], required: true },
    dontList: { type: [String], required: true },
  },
  { _id: false }
);

const ContentLongPolicySchema = new Schema<IContentLongPolicy>(
  {
    shortSummaryTemplate: { type: String, required: true },
    detailQuestion: { type: String, required: true },
    batchSize: { type: Number, required: true },
  },
  { _id: false }
);

const PoliciesSchema = new Schema<IPolicies>(
  {
    alwaysRules: { type: [String], required: true },
    neverRules: { type: [String], required: true },
  },
  { _id: false }
);

const FeedbackSchema = new Schema<IFeedback>(
  {
    enabled: { type: Boolean, required: true },
    moments: { type: [String], required: true },
    sampleQuestions: { type: [String], required: true },
    silenceRule: { type: String, required: true },
  },
  { _id: false }
);

const RateLimitSchema = new Schema<IRateLimit>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    limit: { type: Number, required: true },
    window: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { _id: false }
);

const ControlSchema = new Schema<IControl>(
  {
    crisisProtocol: { type: String, required: true },
    profileTone: { type: String, required: true },
    optionalRateLimits: [RateLimitSchema],
  },
  { _id: false }
);

const FixedMessagesSchema = new Schema<IFixedMessages>(
  {
    welcome: { type: String, required: true },
    closing: { type: String, required: true },
  },
  { _id: false }
);

const OperationalNotesSchema = new Schema<IOperationalNotes>(
  {
    replyWhenAskedMore: { type: String, required: true },
    replyWhenAskedSummary: { type: String, required: true },
    replyWhenUserDoesntWantToGoDeeper: { type: String, required: true },
  },
  { _id: false }
);

// Main schema
const BloomGlobalPromptSchema = new Schema<IBloomGlobalPrompt>(
  {
    ageGroup: {
      type: String,
      enum: ["adolescence", "young_adult", "adult", "middle_age"],
      required: true,
      index: true,
    },
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    scope: { type: String, required: true },
    description: { type: String, required: true },
    version: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      required: true,
    },
    owner: { type: String, required: true },
    conversationRules: { type: ConversationRulesSchema, required: true },
    responseStructure: { type: ResponseStructureSchema, required: true },
    progressionLayers: { type: ProgressionLayersSchema, required: true },
    profilePersonalization: {
      type: ProfilePersonalizationSchema,
      required: true,
    },
    areasOfLifeAndDiary: { type: AreasOfLifeAndDiarySchema, required: true },
    brevityAndDelivery: { type: BrevityAndDeliverySchema, required: true },
    safety: { type: SafetySchema, required: true },
    quickTools: { type: QuickToolsSchema, required: true },
    languageStyle: { type: LanguageStyleSchema, required: true },
    contentLongPolicy: { type: ContentLongPolicySchema, required: true },
    policies: { type: PoliciesSchema, required: true },
    feedback: { type: FeedbackSchema, required: true },
    control: { type: ControlSchema, required: true },
    fixedMessages: { type: FixedMessagesSchema, required: true },
    operationalNotes: { type: OperationalNotesSchema, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: false, // We're managing timestamps manually
    collection: "bloom_global_prompts",
  }
);

export default mongoose.models.BloomGlobalPrompt ||
  mongoose.model<IBloomGlobalPrompt>(
    "BloomGlobalPrompt",
    BloomGlobalPromptSchema
  );
