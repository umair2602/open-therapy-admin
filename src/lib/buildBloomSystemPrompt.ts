import type { Dict } from '@/types';

/**
 * Build a Bloom system prompt string, optionally injecting a specific emotional profile.
 * Includes the new `noActiveListeningBehaviors` field in the generated prompt.
 */
export function build_bloom_system_prompt(
  doc: Dict,
  profile_slug?: string
): string {
  console.log('Building bloom system prompt with profile_slug:', profile_slug);

  // Core metadata
  const meta = [
    `id: ${doc.id ?? ''}`,
    `slug: ${doc.slug ?? ''}`,
    `type: ${doc.type ?? ''}`,
    `scope: ${doc.scope ?? ''}`,
    `version: ${doc.version ?? ''}`,
    `status: ${doc.status ?? ''}`,
    `owner: ${doc.owner ?? ''}`,
    `description: ${doc.description ?? ''}`,
  ];

  // Extract configuration sections
  const conversation_rules = doc.conversationRules ?? {};
  const response_structure = doc.responseStructure ?? {};
  const progression = doc.progressionLayers ?? {};
  const profile_personalization = doc.profilePersonalization ?? {};
  const areas_and_diary = doc.areasOfLifeAndDiary ?? {};
  const brevity = doc.brevityAndDelivery ?? {};
  const safety = doc.safety ?? {};
  const quick_tools = doc.quickTools ?? {};
  const language_style = doc.languageStyle ?? {};
  const content_long = doc.contentLongPolicy ?? {};
  const policies = doc.policies ?? {};
  const feedback = doc.feedback ?? {};
  const control = doc.control ?? {};
  const fixed = doc.fixedMessages ?? {};
  const ops = doc.operationalNotes ?? {};

  // Find selected emotional profile if provided
  let selected_profile: any = null;
  if (profile_slug && profile_personalization.profiles) {
    for (const profile of profile_personalization.profiles) {
      if (
        profile_slug.toLowerCase().includes((profile.id ?? '').toLowerCase()) ||
        profile_slug.toLowerCase().includes((profile.name ?? '').toLowerCase())
      ) {
        selected_profile = profile;
        break;
      }
    }
  }

  // Header
  const header = ['---', ...meta, '---'].join('\n');

  // Objective
  const objective =
    "You are Bloom, a warm, concise, and dialogic therapeutic assistant. " +
    "Your role is to listen, validate, and guide with short responses and an open question, " +
    "offering optional micro-practices only when there is openness. " +
    "All responses must be strictly in Portuguese Language.";

  // Profile section
  const profile_str = selected_profile
    ? `## Active Emotional Profile
- Name: ${selected_profile.name ?? ''}
- Description: ${selected_profile.briefDescription ?? ''}
- Bloom Tone: ${selected_profile.bloomTone ?? ''}
- Positive aspects: ${selected_profile.positiveAspects ?? ''}
- Challenging aspects: ${selected_profile.challengingAspects ?? ''}
- Main challenges: ${selected_profile.mainChallenges ?? ''}
- Goals: ${selected_profile.goals ?? ''}
- Way of feeling: ${selected_profile.wayOfFeeling ?? ''}
- Self-care paths: ${selected_profile.selfCarePaths ?? ''}
- Daily practices: ${(selected_profile.dailyPractices ?? []).join(', ')}
- Interventions: ${selected_profile.interventions ?? ''}
- Keywords (positive): ${(selected_profile.keywords?.positive ?? []).join(', ')}
- Keywords (challenging): ${(selected_profile.keywords?.challenging ?? []).join(', ')}

When responding:
- Embody this tone and emotional context.
- Use the opening as inspiration for the first response.
- Reinforce goals and self-care paths naturally.
- Always stay compassionate, slow-paced, and attuned to this profile's emotional rhythm.`
    : `## Personalization\nEnabled: ${profile_personalization.enabled ?? false}\nQuick guidelines (fallback): ${profile_personalization.quickGuidelinesFallback ?? ''}`;

  // Conversation rules section
  const rules = `## Conversation Rules
- All responses must be in English
- Max sentences per reply: ${conversation_rules.maxSentences ?? 3}
- Max characters per reply: ${conversation_rules.maxChars ?? 500}
- One question per reply: ${conversation_rules.oneQuestionPerReply ?? true}
- Offer micro-action optionally: ${conversation_rules.offerMicroActionOptional ?? true}
- Deliver in chunks (small steps): ${conversation_rules.chunkedDelivery ?? true}
- Ask for brief feedback at key moments: ${conversation_rules.askFeedback ?? true}`;

  // Response structure section (including new field)
  const open_questions = response_structure.openQuestionTemplates ?? [];
  const validation_templates = response_structure.validationTemplates ?? [];
  const optional_practices = response_structure.optionalPractices ?? [];
  const no_active_behaviors = response_structure.noActiveListeningBehaviors ?? [];

  const resp_struct_parts = [
    '## Response Structure',
    `Active listening template: ${response_structure.activeListeningTemplate ?? ''}`,
  ];

  if (open_questions.length) {
    resp_struct_parts.push('Open question templates:');
    open_questions.forEach((q: any) => {
      if (q.enabled !== false) {
        resp_struct_parts.push(`- [${q.id ?? ''}] ${q.text ?? ''}`);
      }
    });
  }

  if (validation_templates.length) {
    resp_struct_parts.push('Validation templates:');
    validation_templates.forEach((v: any) => {
      if (v.enabled !== false) {
        resp_struct_parts.push(`- [${v.id ?? ''}] ${v.text ?? ''}`);
      }
    });
  }

  if (optional_practices.length) {
    resp_struct_parts.push('Optional practices (only if user is open):');
    optional_practices.forEach((p: any) => {
      if (p.enabled !== false) {
        resp_struct_parts.push(`- [${p.id ?? ''}] ${p.text ?? ''}`);
      }
    });
  }

  if (no_active_behaviors.length) {
    resp_struct_parts.push('No Active Listening Behaviors (triggers to stop active listening):');
    no_active_behaviors.forEach((b: string) => {
      if (b && b.trim()) {
        resp_struct_parts.push(`- ${b.trim()}`);
      }
    });
  }

  const resp_struct_str = resp_struct_parts.join('\n');

  // Progression section
  const progression_str = `## Progressive Exploration\nOrder: ${(progression.order ?? []).join(', ')}\nMinimum layers before step: ${progression.minLayersBeforeStep ?? ''}\nQuestions per layer: ${progression.questionsPerLayer ?? ''}\nConfirmation text: ${progression.confirmationText ?? ''}`;

  // Areas of life & diary section
  const areas = [
    '## Integration of Life Areas and Diary',
    `Supported areas: ${(areas_and_diary.supportedAreas ?? []).join(', ')}`,
    `Supported moods: ${(areas_and_diary.supportedMoods ?? []).join(', ')}`,
    `Integration rule: ${areas_and_diary.integrationRule ?? ''}`,
  ];
  const emo_map = areas_and_diary.emotionToOpeningMapping ?? [];
  if (emo_map.length) {
    areas.push('Emotion → Opening mapping (examples):');
    emo_map.forEach((m: any) => {
      if (m.enabled !== false) {
        areas.push(`- ${m.emotion ?? ''}: ${m.opening ?? ''}`);
      }
    });
  }
  const areas_str = areas.join('\n');

  // Brevity & delivery
  const stop_triggers = brevity.stopTriggers ?? [];
  const brevity_parts = [
    '## Brevity and Delivery',
    `Standard reply for 'tell me more': ${brevity.standardReplyForEverything ?? ''}`,
    `Max items per block: ${brevity.maxItemsPerBlock ?? ''}`,
  ];
  if (stop_triggers.length) {
    brevity_parts.push('Pause triggers (ask before continuing):');
    stop_triggers.forEach((s: any) => {
      if (s.enabled !== false) {
        brevity_parts.push(`- ${s.id ?? ''} (${s.type ?? ''}): ${s.description ?? ''}`);
      }
    });
  }
  const brevity_str = brevity_parts.join('\n');

  // Safety
  const safety_str = `## Safety and Crisis\nInterruption message: ${safety.interruptionMessage ?? ''}\nIf crisis indicators are detected, pause carefully and trigger the crisis protocol.`;

  // Quick tools
  const tools = quick_tools.practices ?? [];
  const tools_parts = ['## Quick Tools (offer only if accepted)'];
  tools.forEach((t: any) => {
    if (t.enabled !== false) {
      tools_parts.push(`- [${t.id ?? ''}] ${t.text ?? ''}`);
    }
  });
  const tools_str = tools_parts.join('\n');

  // Language style
  const _join = (arr: any[]) => arr.join(', ');
  const style_str = `## Language Style\nDo: ${_join(language_style.doList ?? [])}\nDon't: ${_join(language_style.dontList ?? [])}`;

  // Long content handling
  const long_content_str = `## When the Person Asks for Long Content\nShort summary template: ${content_long.shortSummaryTemplate ?? ''}\nDetail question: ${content_long.detailQuestion ?? ''}\nMax items per batch: ${content_long.batchSize ?? ''}`;

  // Policies
  const policies_str = `## Policies\nAlways: ${_join(policies.alwaysRules ?? [])}\nNever: ${_join(policies.neverRules ?? [])}`;

  // Feedback
  const feedback_parts = ['## Feedback Collection', `Enabled: ${feedback.enabled ?? false}`];
  if (feedback.moments) feedback_parts.push(`Moments: ${_join(feedback.moments)}`);
  if (feedback.sampleQuestions) feedback_parts.push(`Sample questions: ${_join(feedback.sampleQuestions)}`);
  if (feedback.silenceRule) feedback_parts.push(`Silence rule: ${feedback.silenceRule}`);
  const feedback_str = feedback_parts.join('\n');

  // Control
  const control_parts = [
    '## Control',
    `Crisis protocol: ${control.crisisProtocol ?? ''}`,
    `Profile tone: ${control.profileTone ?? ''}`,
  ];
  const rate_limits = control.optionalRateLimits ?? [];
  if (rate_limits.length) {
    control_parts.push('Optional rate limits:');
    rate_limits.forEach((r: any) => {
      if (r.enabled !== false) {
        control_parts.push(`- ${r.id ?? ''}: ${r.type ?? ''} limit=${r.limit ?? ''} window=${r.window ?? ''}`);
      }
    });
  }
  const control_str = control_parts.join('\n');

  // Fixed messages
  const fixed_str = `## Fixed Messages\nWelcome: ${fixed.welcome ?? ''}\nClosing: ${fixed.closing ?? ''}`;

  // Operational notes
  const ops_str = `## Operational Notes\nWhen asked for more: ${ops.replyWhenAskedMore ?? ''}\nWhen asked for summary: ${ops.replyWhenAskedSummary ?? ''}\nWhen user doesn't want to go deeper: ${ops.replyWhenUserDoesntWantToGoDeeper ?? ''}`;

  // Assemble all sections
  const sections = [
    header,
    `# Bloom Global Prompt\n${objective}`,
    profile_str,
    rules,
    resp_struct_str,
    progression_str,
    areas_str,
    brevity_str,
    safety_str,
    tools_str,
    style_str,
    long_content_str,
    policies_str,
    feedback_str,
    control_str,
    fixed_str,
    ops_str,
    'RESPONSE HAVE TO BE IN ENGLISH',
  ];

  return sections.join('\n\n');
}
