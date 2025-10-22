'use client'

import { showErrorToast, showSuccessToast } from '@/lib/utils';
import { Settings, User, Eye, EyeOff, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner';

export default function SettingsContent() {
    const [activeTab, setActiveTab] = useState('general')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        role: ''
    })
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const [loading, setLoading] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Fetch admin profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/admin/profile')
                const data = await response.json()
                
                if (response.ok && data.user) {
                    setProfileData({
                        username: data.user.username,
                        email: data.user.email,
                        role: data.user.role
                    })
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error)
            } finally {
                setLoadingProfile(false)
            }
        }
        
        fetchProfile()
    }, [])

    const tabs = [
        { id: 'general', name: 'General', icon: Settings },
        { id: 'profile', name: 'Profile', icon: User },
    ]

    const handleProfileUpdate = async () => {
        setLoading(true)
        setMessage({ type: '', text: '' })
        
        try {
            const response = await fetch('/api/admin/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: profileData.username,
                    email: profileData.email
                })
            })
            
            const data = await response.json()
            
            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' })
                showSuccessToast('Profile Updated Successfully!')
            } else {
                showErrorToast('Failed to update profile')
                setMessage({ type: 'error', text: data.message || 'Failed to update profile' })
            }
        } catch (error) {
            showErrorToast('An error occurred. Please try again.');
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordUpdate = async () => {
        setLoading(true)
        setMessage({ type: '', text: '' })
        
        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long' })
            setLoading(false)
            return
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' })
            setLoading(false)
            return
        }
        
        try {
            const response = await fetch('/api/admin/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            })
            
            const data = await response.json()
            
            if (response.ok) {
                showSuccessToast('Password changed successfully!')
                setMessage({ type: 'success', text: 'Password changed successfully!' })
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                showErrorToast('Failed to change password')
                setMessage({ type: 'error', text: data.message || 'Failed to change password' })
            }
        } catch (error) {
            showErrorToast('An error occurred. Please try again.')
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg">
                        <Settings className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600">Manage your platform configuration and preferences</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id)
                                        setMessage({ type: '', text: '' })
                                    }}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5" />
                                    <span className="text-sm font-medium">{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg ${
                                message.type === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        {activeTab === 'general' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Platform Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Open Therapy"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default Language
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>German</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time Zone
                                        </label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>UTC-8 (Pacific)</option>
                                            <option>UTC-5 (Eastern)</option>
                                            <option>UTC+0 (GMT)</option>
                                            <option>UTC+1 (Central European)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex justify-end space-x-3">
                                        <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                            Cancel
                                        </button>
                                        <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                                
                                {loadingProfile ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-6 mb-8">
                                            <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                                    <span className="text-white font-bold text-xl">
                                                        {profileData.username ? profileData.username.substring(0, 2).toUpperCase() : 'AD'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{profileData.username || 'Loading...'}</h3>
                                                    <p className="text-sm text-gray-500">{profileData.role || 'Admin'}</p>
                                                </div>
                                            </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.username}
                                            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.role}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3">
                                        <button 
                                            type="button"
                                            onClick={() => setMessage({ type: '', text: '' })}
                                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleProfileUpdate}
                                            disabled={loading}
                                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Updating...' : 'Update Profile'}
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showCurrentPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirm New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-end space-x-3">
                                            <button 
                                                type="button"
                                                onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                                                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handlePasswordUpdate}
                                                disabled={loading}
                                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Changing...' : 'Change Password'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}