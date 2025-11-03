"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AuthProvider = 'email' | 'google' | 'apple';

export default function DeleteAccountContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authProvider, setAuthProvider] = useState<AuthProvider>('email');
  const [googleId, setGoogleId] = useState("");
  const [appleId, setAppleId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    setError("");

    try {
      const requestBody: any = {
        email,
        authProvider,
      };

      if (authProvider === 'email') {
        requestBody.password = password;
      } else if (authProvider === 'google') {
        requestBody.googleId = googleId;
      } else if (authProvider === 'apple') {
        requestBody.appleId = appleId;
      }

      const response = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setShowConfirm(false);
        // Reset form after 3 seconds
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setGoogleId("");
          setAppleId("");
          setAuthProvider('email');
          setSuccess(false);
        }, 3000);
      } else {
        setError(data.message || "Failed to delete account");
        setShowConfirm(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setShowConfirm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setError("");
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Account Deleted
        </h2>
        <p className="text-gray-600">
          Your account has been successfully deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Delete Account
        </h2>
        <p className="text-gray-600">
          Permanently delete your account and all associated data.
        </p>
      </div>

      {!showConfirm ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="authProvider"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Login Method
            </label>
            <select
              id="authProvider"
              name="authProvider"
              value={authProvider}
              onChange={(e) => {
                setAuthProvider(e.target.value as AuthProvider);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="email">Email & Password</option>
              <option value="google">Google</option>
              <option value="apple">Apple</option>
            </select>
          </div>

          {authProvider === 'email' && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your password"
              />
            </div>
          )}

          {authProvider === 'google' && (
            <div>
              <label
                htmlFor="googleId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Google User ID
              </label>
              <input
                id="googleId"
                name="googleId"
                type="text"
                required
                value={googleId}
                onChange={(e) => setGoogleId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Your Google User ID"
              />
              <p className="mt-1 text-xs text-gray-500">
                This is the ID provided by Google when you signed in.
              </p>
            </div>
          )}

          {authProvider === 'apple' && (
            <div>
              <label
                htmlFor="appleId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Apple User ID
              </label>
              <input
                id="appleId"
                name="appleId"
                type="text"
                required
                value={appleId}
                onChange={(e) => setAppleId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Your Apple User ID"
              />
              <p className="mt-1 text-xs text-gray-500">
                This is the ID provided by Apple when you signed in.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Continue to Delete Account
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Are you absolutely sure?
                </h3>
                <p className="text-sm text-red-800 mb-4">
                  This will permanently delete your account and all associated data including:
                </p>
                <ul className="text-sm text-red-800 list-disc list-inside space-y-1 mb-4">
                  <li>Your profile information</li>
                  <li>All your session history</li>
                  <li>Your emotional diary entries</li>
                  <li>Your subscription status</li>
                  <li>All other personal data</li>
                </ul>
                <p className="text-sm font-semibold text-red-900">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Deleting..." : "Yes, Delete My Account"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

