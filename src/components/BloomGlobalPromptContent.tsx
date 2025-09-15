"use client";

import { useState, useEffect } from "react";
import {
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  CodeBracketIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, DEFAULT_BLOOM_GLOBAL_PROMPT } from "@/types";
import CollapsibleSection from "./BloomGlobalPrompt/CollapsibleSection";
import ProgressionLayersSection from "./BloomGlobalPrompt/ProgressionLayersSection";
import ProfilePersonalizationSection from "./BloomGlobalPrompt/ProfilePersonalizationSection";
import AreasOfLifeSection from "./BloomGlobalPrompt/AreasOfLifeSection";
import BrevityDeliverySection from "./BloomGlobalPrompt/BrevityDeliverySection";
import SafetySection from "./BloomGlobalPrompt/SafetySection";
import QuickToolsSection from "./BloomGlobalPrompt/QuickToolsSection";
import LanguageStyleSection from "./BloomGlobalPrompt/LanguageStyleSection";
import MetadataSection from "./BloomGlobalPrompt/MetadataSection";
import ConversationRulesSection from "./BloomGlobalPrompt/ConversationRulesSection";
import ResponseStructureSection from "./BloomGlobalPrompt/ResponseStructureSection";
import ContentLongPolicySection from "./BloomGlobalPrompt/ContentLongPolicySection";
import PoliciesSection from "./BloomGlobalPrompt/PoliciesSection";
import FeedbackSection from "./BloomGlobalPrompt/FeedbackSection";
import ControlSection from "./BloomGlobalPrompt/ControlSection";
import FixedMessagesSection from "./BloomGlobalPrompt/FixedMessagesSection";
import OperationalNotesSection from "./BloomGlobalPrompt/OperationalNotesSection";

export default function BloomGlobalPromptContent() {
  const [prompt, setPrompt] = useState<BloomGlobalPrompt>(
    DEFAULT_BLOOM_GLOBAL_PROMPT
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "metadata",
  ]);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [ageGroup, setAgeGroup] =
    useState<BloomGlobalPrompt["ageGroup"]>("adult");

  useEffect(() => {
    loadPrompt();
  }, [ageGroup]);

  const loadPrompt = async () => {
    try {
      const response = await fetch(
        `/api/bloom-global-prompt?ageGroup=${ageGroup}`
      );
      const data = await response.json();
      setPrompt(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading prompt:", error);
      setIsLoading(false);
    }
  };

  const savePrompt = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/bloom-global-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompt),
      });

      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error("Failed to save prompt");
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const isObject = (val: unknown): val is Record<string, unknown> =>
    !!val && typeof val === "object" && !Array.isArray(val);

  const deepMerge = <T extends Record<string, any>>(
    base: T,
    patch: Partial<T>
  ): T => {
    const result: any = { ...base };
    for (const key in patch) {
      const nextVal = (patch as any)[key];
      const prevVal = (base as any)[key];
      if (isObject(prevVal) && isObject(nextVal)) {
        result[key] = deepMerge(prevVal, nextVal);
      } else {
        result[key] = nextVal;
      }
    }
    return result;
  };

  const updatePrompt = (updates: Partial<BloomGlobalPrompt>) => {
    setPrompt((prev) => {
      const merged = deepMerge(prev, updates);
      return {
        ...merged,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const generateSystemPrompt = async () => {
    setIsGeneratingPrompt(true);
    try {
      const response = await fetch(
        `/api/bloom-global-prompt/generate?ageGroup=${ageGroup}`
      );
      const data = await response.json();

      if (data.success) {
        setSystemPrompt(data.data.systemPrompt);
        setShowSystemPrompt(true);
      } else {
        console.error("Error generating system prompt:", data.error);
      }
    } catch (error) {
      console.error("Error generating system prompt:", error);
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <DocumentTextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bloom Global Prompt
              </h1>
              <p className="text-gray-600">
                Configure the comprehensive therapeutic conversation prompt
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Version {prompt.version} • {prompt.status}
            </div>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="adolescence">Adolescence (13–17)</option>
              <option value="young_adult">Young adults (18–24)</option>
              <option value="adult">Adults (25–39)</option>
              <option value="middle_age">Middle age (40–59)</option>
            </select>
            <button
              onClick={generateSystemPrompt}
              disabled={isGeneratingPrompt}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isGeneratingPrompt
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <CodeBracketIcon className="h-4 w-4 mr-2 inline" />
              {isGeneratingPrompt ? "Generating..." : "Generate System Prompt"}
            </button>
            <button
              onClick={savePrompt}
              disabled={isSaving}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isSaving
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            {saveStatus === "success" && (
              <div className="flex items-center text-green-600">
                <CheckIcon className="h-5 w-5 mr-1" />
                Saved
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center text-red-600">
                <XMarkIcon className="h-5 w-5 mr-1" />
                Error
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="space-y-6">
        <CollapsibleSection
          id="metadata"
          title="1. Metadata"
          description="Basic prompt information and identification"
          isExpanded={expandedSections.includes("metadata")}
          onToggle={() => toggleSection("metadata")}
        >
          <MetadataSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="conversation-rules"
          title="2. Conversation Rules"
          description="Core conversation parameters and constraints"
          isExpanded={expandedSections.includes("conversation-rules")}
          onToggle={() => toggleSection("conversation-rules")}
        >
          <ConversationRulesSection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>

        <CollapsibleSection
          id="response-structure"
          title="3. Response Structure"
          description="Templates and practices for therapeutic responses"
          isExpanded={expandedSections.includes("response-structure")}
          onToggle={() => toggleSection("response-structure")}
        >
          <ResponseStructureSection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>

        <CollapsibleSection
          id="progression-layers"
          title="4. Progression Layers"
          description="Therapeutic conversation flow and progression"
          isExpanded={expandedSections.includes("progression-layers")}
          onToggle={() => toggleSection("progression-layers")}
        >
          <ProgressionLayersSection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>

        <CollapsibleSection
          id="profile-personalization"
          title="5. Profile Personalization"
          description="User profile-based customization settings"
          isExpanded={expandedSections.includes("profile-personalization")}
          onToggle={() => toggleSection("profile-personalization")}
        >
          <ProfilePersonalizationSection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>

        <CollapsibleSection
          id="areas-of-life"
          title="6. Areas of Life & Diary"
          description="Life area integration and mood tracking"
          isExpanded={expandedSections.includes("areas-of-life")}
          onToggle={() => toggleSection("areas-of-life")}
        >
          <AreasOfLifeSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="brevity-delivery"
          title="7. Brevity & Delivery"
          description="Response length and delivery management"
          isExpanded={expandedSections.includes("brevity-delivery")}
          onToggle={() => toggleSection("brevity-delivery")}
        >
          <BrevityDeliverySection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="safety"
          title="8. Safety"
          description="Safety protocols and crisis management"
          isExpanded={expandedSections.includes("safety")}
          onToggle={() => toggleSection("safety")}
        >
          <SafetySection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="quick-tools"
          title="9. Quick Tools"
          description="Catalog of therapeutic practices and tools"
          isExpanded={expandedSections.includes("quick-tools")}
          onToggle={() => toggleSection("quick-tools")}
        >
          <QuickToolsSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="language-style"
          title="10. Language Style"
          description="Communication guidelines and style rules"
          isExpanded={expandedSections.includes("language-style")}
          onToggle={() => toggleSection("language-style")}
        >
          <LanguageStyleSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="content-long-policy"
          title="11. Content Long Policy"
          description="Handling of lengthy content and summaries"
          isExpanded={expandedSections.includes("content-long-policy")}
          onToggle={() => toggleSection("content-long-policy")}
        >
          <ContentLongPolicySection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>

        <CollapsibleSection
          id="policies"
          title="12. Policies"
          description="Always and never rules for the AI"
          isExpanded={expandedSections.includes("policies")}
          onToggle={() => toggleSection("policies")}
        >
          <PoliciesSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="feedback"
          title="13. Feedback"
          description="User feedback collection and management"
          isExpanded={expandedSections.includes("feedback")}
          onToggle={() => toggleSection("feedback")}
        >
          <FeedbackSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="control"
          title="14. Control"
          description="System control parameters and rate limits"
          isExpanded={expandedSections.includes("control")}
          onToggle={() => toggleSection("control")}
        >
          <ControlSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="fixed-messages"
          title="15. Fixed Messages"
          description="Standard welcome and closing messages"
          isExpanded={expandedSections.includes("fixed-messages")}
          onToggle={() => toggleSection("fixed-messages")}
        >
          <FixedMessagesSection prompt={prompt} updatePrompt={updatePrompt} />
        </CollapsibleSection>

        <CollapsibleSection
          id="operational-notes"
          title="16. Operational Notes"
          description="Special handling for common user requests"
          isExpanded={expandedSections.includes("operational-notes")}
          onToggle={() => toggleSection("operational-notes")}
        >
          <OperationalNotesSection
            prompt={prompt}
            updatePrompt={updatePrompt}
          />
        </CollapsibleSection>
      </div>

      {/* System Prompt Modal */}
      {showSystemPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated System Prompt
              </h2>
              <button
                onClick={() => setShowSystemPrompt(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-auto">
                {systemPrompt}
              </pre>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(systemPrompt);
                  // You could add a toast notification here
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowSystemPrompt(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
