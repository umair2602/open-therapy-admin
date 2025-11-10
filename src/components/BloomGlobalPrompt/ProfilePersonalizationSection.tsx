"use client";

import { useState, useCallback } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { BloomGlobalPrompt, EmotionalProfile } from "@/types";

interface ProfilePersonalizationSectionProps {
  prompt: BloomGlobalPrompt;
  updatePrompt: (updates: Partial<BloomGlobalPrompt>) => void;
}

export default function ProfilePersonalizationSection({
  prompt,
  updatePrompt,
}: ProfilePersonalizationSectionProps) {
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [expandedProfiles, setExpandedProfiles] = useState<string[]>([]);
  const [newProfile, setNewProfile] = useState<Partial<EmotionalProfile>>({
    id: "",
    name: "",
    description: "",
    enabled: true,
    opening: "",
    positiveAspects: "",
    challengingAspects: "",
    mainChallenges: "",
    goals: "",
    bloomTone: "",
    briefDescription: "",
    keywords: { positive: [], challenging: [] },
    wayOfFeeling: "",
    selfCarePaths: "",
    dailyPractices: [],
    interventions: "",
  });

  // Memoize the handleInputChange function to prevent unnecessary re-renders
  const handleInputChange = useCallback(
    (
      field: keyof BloomGlobalPrompt["profilePersonalization"],
      value: string | boolean | EmotionalProfile[]
    ) => {
      updatePrompt({
        profilePersonalization: {
          ...prompt.profilePersonalization,
          [field]: value,
        },
      });
    },
    [prompt.profilePersonalization, updatePrompt]
  );

  const toggleProfileExpansion = (profileId: string) => {
    setExpandedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const startEditingProfile = (profile: EmotionalProfile) => {
    setEditingProfile(profile.id);
  };

  const cancelEditing = () => {
    setEditingProfile(null);
  };

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = (
      prompt.profilePersonalization.profiles || []
    ).filter((p) => p.id !== profileId);
    handleInputChange("profiles", updatedProfiles);
  };

  const addNewProfile = () => {
    if (!newProfile.id || !newProfile.name) return;

    const profile: EmotionalProfile = {
      id: newProfile.id,
      name: newProfile.name,
      description: newProfile.description || "",
      enabled: newProfile.enabled || true,
      opening: newProfile.opening || "",
      positiveAspects: newProfile.positiveAspects || "",
      challengingAspects: newProfile.challengingAspects || "",
      mainChallenges: newProfile.mainChallenges || "",
      goals: newProfile.goals || "",
      bloomTone: newProfile.bloomTone || "",
      briefDescription: newProfile.briefDescription || "",
      keywords: newProfile.keywords || { positive: [], challenging: [] },
      wayOfFeeling: newProfile.wayOfFeeling || "",
      selfCarePaths: newProfile.selfCarePaths || "",
      dailyPractices: newProfile.dailyPractices || [],
      interventions: newProfile.interventions || "",
    };

    const updatedProfiles = [
      ...(prompt.profilePersonalization.profiles || []),
      profile,
    ];
    handleInputChange("profiles", updatedProfiles);
    setNewProfile({
      id: "",
      name: "",
      description: "",
      enabled: true,
      opening: "",
      positiveAspects: "",
      challengingAspects: "",
      mainChallenges: "",
      goals: "",
      bloomTone: "",
      briefDescription: "",
      keywords: { positive: [], challenging: [] },
      wayOfFeeling: "",
      selfCarePaths: "",
      dailyPractices: [],
      interventions: "",
    });
  };

  const updateProfileField = useCallback(
    (profileId: string, field: keyof EmotionalProfile, value: any) => {
      const updatedProfiles = (
        prompt.profilePersonalization.profiles || []
      ).map((p) => (p.id === profileId ? { ...p, [field]: value } : p));
      handleInputChange("profiles", updatedProfiles);

      // If the profile ID changes, keep editing state and expansion in sync
      if (field === "id" && typeof value === "string") {
        const newId = value as string;
        setEditingProfile((prev) => (prev === profileId ? newId : prev));
        setExpandedProfiles((prev) =>
          prev.map((id) => (id === profileId ? newId : id))
        );
      }
    },
    [prompt.profilePersonalization.profiles, handleInputChange]
  );

  const addKeyword = (
    profileId: string,
    type: "positive" | "challenging",
    keyword: string
  ) => {
    if (!keyword.trim()) return;
    const profile = (prompt.profilePersonalization.profiles || []).find(
      (p) => p.id === profileId
    );
    if (!profile) return;

    const updatedKeywords = {
      ...profile.keywords,
      [type]: [...profile.keywords[type], keyword.trim()],
    };
    updateProfileField(profileId, "keywords", updatedKeywords);
  };

  const removeKeyword = (
    profileId: string,
    type: "positive" | "challenging",
    index: number
  ) => {
    const profile = (prompt.profilePersonalization.profiles || []).find(
      (p) => p.id === profileId
    );
    if (!profile) return;

    const updatedKeywords = {
      ...profile.keywords,
      [type]: profile.keywords[type].filter((_, i) => i !== index),
    };
    updateProfileField(profileId, "keywords", updatedKeywords);
  };

  const addDailyPractice = (profileId: string, practice: string) => {
    if (!practice.trim()) return;
    const profile = (prompt.profilePersonalization.profiles || []).find(
      (p) => p.id === profileId
    );
    if (!profile) return;

    updateProfileField(profileId, "dailyPractices", [
      ...profile.dailyPractices,
      practice.trim(),
    ]);
  };

  const removeDailyPractice = (profileId: string, index: number) => {
    const profile = (prompt.profilePersonalization.profiles || []).find(
      (p) => p.id === profileId
    );
    if (!profile) return;

    updateProfileField(
      profileId,
      "dailyPractices",
      profile.dailyPractices.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={prompt.profilePersonalization.enabled}
            onChange={(e) => handleInputChange("enabled", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            Enable Profile Personalization
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Directory Path
        </label>
        <input
          type="text"
          value={prompt.profilePersonalization.directoryPath}
          onChange={(e) => handleInputChange("directoryPath", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="/profiles"
        />
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Emotional Profiles
        </h4>
        <div className="space-y-4">
          {(prompt.profilePersonalization.profiles || []).map(
            (profile, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-4 bg-white rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleProfileExpansion(profile.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedProfiles.includes(profile.id) ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {profile.name}
                      </h5>
                      <p className="text-sm text-gray-500">{profile.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {profile.enabled ? (
                        <EyeIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          profile.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {profile.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingProfile === profile.id ? (
                      <>
                        <button
                          onClick={() => setEditingProfile(null)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditingProfile(profile)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProfile(profile.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {expandedProfiles.includes(profile.id) && (
                  <div className="p-6 bg-gray-50">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile ID
                          </label>
                          <input
                            type="text"
                            value={profile.id}
                            onChange={(e) =>
                              updateProfileField(
                                profile.id,
                                "id",
                                e.target.value
                              )
                            }
                            disabled={editingProfile !== profile.id}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Name
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                              updateProfileField(
                                profile.id,
                                "name",
                                e.target.value
                              )
                            }
                            disabled={editingProfile !== profile.id}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={profile.description}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "description",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Opening (Chat)
                        </label>
                        <textarea
                          value={profile.opening}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "opening",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Positive Aspects
                        </label>
                        <textarea
                          value={profile.positiveAspects}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "positiveAspects",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Challenging Aspects
                        </label>
                        <textarea
                          value={profile.challengingAspects}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "challengingAspects",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Main Challenges
                        </label>
                        <textarea
                          value={profile.mainChallenges}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "mainChallenges",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Goals / Directions
                        </label>
                        <textarea
                          value={profile.goals}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "goals",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bloom's Tone and Guidance
                        </label>
                        <textarea
                          value={profile.bloomTone}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "bloomTone",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brief Profile Description
                        </label>
                        <textarea
                          value={profile.briefDescription}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "briefDescription",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Positive Keywords
                          </label>
                          <div className="space-y-2">
                            {profile.keywords.positive.map((keyword, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                  {keyword}
                                </span>
                                {editingProfile === profile.id && (
                                  <button
                                    onClick={() =>
                                      removeKeyword(
                                        profile.id,
                                        "positive",
                                        index
                                      )
                                    }
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <XMarkIcon className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {editingProfile === profile.id && (
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  placeholder="Add positive keyword"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      addKeyword(
                                        profile.id,
                                        "positive",
                                        e.currentTarget.value
                                      );
                                      e.currentTarget.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    const input = e.currentTarget
                                      .previousElementSibling as HTMLInputElement;
                                    addKeyword(
                                      profile.id,
                                      "positive",
                                      input.value
                                    );
                                    input.value = "";
                                  }}
                                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Challenging Keywords
                          </label>
                          <div className="space-y-2">
                            {profile.keywords.challenging.map(
                              (keyword, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                                    {keyword}
                                  </span>
                                  {editingProfile === profile.id && (
                                    <button
                                      onClick={() =>
                                        removeKeyword(
                                          profile.id,
                                          "challenging",
                                          index
                                        )
                                      }
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <XMarkIcon className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              )
                            )}
                            {editingProfile === profile.id && (
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  placeholder="Add challenging keyword"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      addKeyword(
                                        profile.id,
                                        "challenging",
                                        e.currentTarget.value
                                      );
                                      e.currentTarget.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    const input = e.currentTarget
                                      .previousElementSibling as HTMLInputElement;
                                    addKeyword(
                                      profile.id,
                                      "challenging",
                                      input.value
                                    );
                                    input.value = "";
                                  }}
                                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Way of Feeling (450–600)
                        </label>
                        <textarea
                          value={profile.wayOfFeeling}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "wayOfFeeling",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Self-Care Paths (300–450)
                        </label>
                        <textarea
                          value={profile.selfCarePaths}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "selfCarePaths",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Daily Practices
                        </label>
                        <div className="space-y-2">
                          {profile.dailyPractices.map((practice, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {practice}
                              </span>
                              {editingProfile === profile.id && (
                                <button
                                  onClick={() =>
                                    removeDailyPractice(profile.id, index)
                                  }
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          {editingProfile === profile.id && (
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Add daily practice"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    addDailyPractice(
                                      profile.id,
                                      e.currentTarget.value
                                    );
                                    e.currentTarget.value = "";
                                  }
                                }}
                              />
                              <button
                                onClick={(e) => {
                                  const input = e.currentTarget
                                    .previousElementSibling as HTMLInputElement;
                                  addDailyPractice(profile.id, input.value);
                                  input.value = "";
                                }}
                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bloom's Interventions
                        </label>
                        <textarea
                          value={profile.interventions}
                          onChange={(e) =>
                            updateProfileField(
                              profile.id,
                              "interventions",
                              e.target.value
                            )
                          }
                          disabled={editingProfile !== profile.id}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profile.enabled}
                            onChange={(e) =>
                              updateProfileField(
                                profile.id,
                                "enabled",
                                e.target.checked
                              )
                            }
                            disabled={editingProfile !== profile.id}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            Enable Profile
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">
          Add New Profile
        </h4>
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newProfile.id || ""}
              onChange={(e) =>
                setNewProfile({ ...newProfile, id: e.target.value })
              }
              placeholder="Profile ID"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newProfile.name || ""}
              onChange={(e) =>
                setNewProfile({ ...newProfile, name: e.target.value })
              }
              placeholder="Profile Name"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={addNewProfile}
            disabled={!newProfile.id || !newProfile.name}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-4 w-4 mr-2 inline" />
            Add Profile
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Guidelines Fallback
        </label>
        <textarea
          value={prompt.profilePersonalization.quickGuidelinesFallback}
          onChange={(e) =>
            handleInputChange("quickGuidelinesFallback", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Use general therapeutic principles with empathy and active listening."
        />
      </div>
    </div>
  );
}
