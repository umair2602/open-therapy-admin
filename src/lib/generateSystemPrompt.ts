import { BloomGlobalPrompt } from "@/types";

export function generateSystemPrompt(prompt: BloomGlobalPrompt): string {
  const {
    ageGroup,
    id,
    slug,
    type,
    scope,
    description,
    version,
    status,
    conversationRules,
    responseStructure,
    progressionLayers,
    profilePersonalization,
    areasOfLifeAndDiary,
    brevityAndDelivery,
    safety,
    quickTools,
    languageStyle,
    contentLongPolicy,
    policies,
    feedback,
    control,
    fixedMessages,
    operationalNotes,
  } = prompt;

  const emotionalProfilesSection =
    profilePersonalization.enabled && profilePersonalization.profiles?.length
      ? `
---

## Emotional Profiles (for internal tone calibration)

Bloom uses these **internal emotional blueprints** to adapt tone and style dynamically.
*(Never mention these profiles by name to the user.)*

Directory Path: \`${profilePersonalization.directoryPath}\`
Quick Guidelines Fallback: "${profilePersonalization.quickGuidelinesFallback}"

${profilePersonalization.profiles
  .filter((profile) => profile.enabled)
  .map(
    (profile) => `
### Profile: ${profile.name}
- **ID:** ${profile.id}
- **Description:** ${profile.description}
- **Tone:** ${profile.bloomTone}
- **Opening Cue:** "${profile.opening}"
- **Positive Aspects:** ${profile.positiveAspects}
- **Challenging Aspects:** ${profile.challengingAspects}
- **Main Challenges:** ${profile.mainChallenges}
- **Goals:** ${profile.goals}
- **Brief Description:** ${profile.briefDescription}

**Keywords**
- Positive: ${profile.keywords.positive.join(", ")}
- Challenging: ${profile.keywords.challenging.join(", ")}

**Way of Feeling:** ${profile.wayOfFeeling}
**Self-care Paths:** ${profile.selfCarePaths}
**Daily Practices:** ${profile.dailyPractices.join(", ")}
**Interventions:** ${profile.interventions}
`
  )
  .join("\n")}
`
      : "";

  return `BLOOM_SYSTEM_PROMPT = """
---
---
id: ${id}
slug: ${slug}
type: ${type}
scope: ${scope}
description: "${description}"
version: ${version}
status: ${status}
age_group: ${ageGroup}
---

## Bloom's Objective
${description}

---

## Default Conversation Mode (SHORT + DIALOGIC)

**Length and Rhythm**
- Max per message: **${conversationRules.maxSentences} sentences** (or ~${
    conversationRules.maxChars
  } characters).
- **${
    conversationRules.oneQuestionPerReply
      ? "1 main question"
      : "Multiple questions"
  }** per message (placed at the end).
- Practical suggestions are **${
    conversationRules.offerMicroActionOptional ? "optional" : "always included"
  }** and should only appear if the user shows openness.
- Avoid lists, long paragraphs, or multiple questions in sequence.

**Response Structure**
1) **Acknowledge + reflect** what the user said (1 simple sentence showing active listening).
2) **Clarify or deepen** with **1 open-ended question** to encourage dialogue.
3) **If openness is detected**, offer **1 optional short practice** (e.g., breathing, scale, pause).

---

## Response Templates

**Active Listening Template:**
"${responseStructure.activeListeningTemplate}"

**Open Question Templates:**
${responseStructure.openQuestionTemplates
  .filter((template) => template.enabled)
  .map((template) => `- ${template.text}`)
  .join("\n")}

**Validation Templates:**
${responseStructure.validationTemplates
  .filter((template) => template.enabled)
  .map((template) => `- ${template.text}`)
  .join("\n")}

**Optional Practices:**
${responseStructure.optionalPractices
  .filter((practice) => practice.enabled)
  .map((practice) => `- ${practice.text}`)
  .join("\n")}

**No Active Listening Behaviors:**
${responseStructure.noActiveListeningBehaviors
  ?.filter((behavior) => !!behavior)
  .map((behavior) => `- ${behavior}`)
  .join("\n")}

---

## Progression Layers

**Layer Order:** ${progressionLayers.order.join(" → ")}
**Minimum layers before step:** ${progressionLayers.minLayersBeforeStep}
**Questions per layer:** ${progressionLayers.questionsPerLayer}
**Confirmation text:** "${progressionLayers.confirmationText}"

---

## Personalization by Emotional Profile

${
  profilePersonalization.enabled
    ? `
- Bloom should adjust tone and conversational style according to the identified emotional profile.
- **Directory path:** \`${profilePersonalization.directoryPath}\`
- **Quick guidelines fallback:** "${profilePersonalization.quickGuidelinesFallback}"
`
    : "- Profile personalization is disabled."
}

${emotionalProfilesSection}

---

## Life Areas and Emotion Journal Integration
${areasOfLifeAndDiary ? `
**Directory:** \`${areasOfLifeAndDiary.directoryPath}\`
**File naming pattern:** \`${areasOfLifeAndDiary.fileNamingPattern}\`
**Supported Life Areas:**
${areasOfLifeAndDiary.supportedAreas.map((a) => `- ${a}`).join("\n")}
**Supported Moods:**
${areasOfLifeAndDiary.supportedMoods.map((m) => `- ${m}`).join("\n")}
**Emotion Opening Mappings:**
${areasOfLifeAndDiary.emotionToOpeningMapping
  .filter((m) => m.enabled)
  .map((m) => `- **${m.emotion}**: "${m.opening}"`)
  .join("\n")}
**Integration Rule:** ${areasOfLifeAndDiary.integrationRule}
` : ""}

---

## Brevity and Delivery Rules

**Standard Reply for Everything:**
"${brevityAndDelivery.standardReplyForEverything}"

**Max Items Per Block:** ${brevityAndDelivery.maxItemsPerBlock}

**Stop Triggers:**
${brevityAndDelivery.stopTriggers
  .filter((trigger) => trigger.enabled)
  .map((trigger) => `- **${trigger.type}**: ${trigger.description}`)
  .join("\n")}

---

## Safety and Crisis Management

${safety ? `
**High Risk Directory:** \`${safety.highRiskDirectory}\`
**Trigger File:** \`${safety.triggerFile}\`
**Crisis Protocol File:** \`${safety.crisisProtocolFile}\`
**Interruption Message:** "${safety.interruptionMessage}"
**Block Diagnosis/Prescription:** ${safety.blockDiagnosisPrescription ? "Yes" : "No"}
` : ""}

---

## Quick Tools

${quickTools.practices
  .filter((p) => p.enabled)
  .map((p) => `- **${p.id}**: "${p.text}"`)
  .join("\n")}

---

## Language Style Guidelines

**Do:**
${languageStyle.doList.map((rule) => `- ${rule}`).join("\n")}
**Don't:**
${languageStyle.dontList.map((rule) => `- ${rule}`).join("\n")}

---

## Content Long Policy

**Short Summary Template:** "${contentLongPolicy.shortSummaryTemplate}"
**Detail Question:** "${contentLongPolicy.detailQuestion}"
**Batch Size:** ${contentLongPolicy.batchSize}

---

## Response Policies

**Always do:**
${policies.alwaysRules.map((rule) => `- ${rule}`).join("\n")}
**Never do:**
${policies.neverRules.map((rule) => `- ${rule}`).join("\n")}

---

## Feedback Collection

${
  feedback.enabled
    ? `
**Enabled:** Yes
**Moments:** ${feedback.moments.join(", ")}
**Sample Questions:**
${feedback.sampleQuestions.map((q) => `- "${q}"`).join("\n")}
`
    : "**Enabled:** No"
}

---

## Control Parameters

**Crisis Protocol:** ${control.crisisProtocol}
**Profile Tone:** ${control.profileTone}

${
  control.optionalRateLimits?.length
    ? `
**Rate Limits:**
${control.optionalRateLimits
  .filter((l) => l.enabled)
  .map((l) => `- **${l.type}**: ${l.limit} per ${l.window}`)
  .join("\n")}
`
    : ""
}

---

## Fixed Messages

**Welcome Message:** "${fixedMessages.welcome}"
**Closing Message:** "${fixedMessages.closing}"

---

## Operational Notes

**When asked for more:** "${operationalNotes.replyWhenAskedMore}"
**When asked for summary:** "${operationalNotes.replyWhenAskedSummary}"
**When user doesn't want to go deeper:** "${operationalNotes.replyWhenUserDoesntWantToGoDeeper}"

---
"""`;
}
