'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, Cog6ToothIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, UserCircleIcon as UserCircleOutlineIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Fragment, useState } from 'react'

interface HeaderProps {
    onMenuClick: () => void
    onLogout: () => void
}

export default function Header({ onMenuClick, onLogout }: HeaderProps) {
    const { theme, toggleTheme } = useTheme()
    const [searchQuery, setSearchQuery] = useState('')
    const [notifications] = useState([
        { id: 1, message: 'New user registered', time: '2 minutes ago', type: 'info' },
        { id: 2, message: 'AI model updated successfully', time: '1 hour ago', type: 'success' },
        { id: 3, message: 'System maintenance scheduled', time: '3 hours ago', type: 'warning' },
    ])

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white shadow-sm">
            {/* Mobile menu button */}
            <button
                type="button"
                className="p-2.5 text-gray-700 lg:hidden"
                onClick={onMenuClick}
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator for mobile */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            {/* Logo and Brand - Mobile */}
            <div className="flex items-center lg:hidden px-3">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 relative">
                        <Image
                            src="/logo.png"
                            alt="Open Therapy"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-lg font-bold text-gray-900">Open Therapy</span>
                </div>
            </div>

            {/* Main header content */}
            <div className="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Search - Hidden on mobile, visible on tablet+ */}
                {/* <div className="hidden md:flex flex-1 max-w-lg">
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users, categories, or settings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm"
                        />
                    </div>
                </div> */}

                {/* Right side actions */}
                <div className="ml-auto flex items-center gap-x-2 sm:gap-x-4">
                    {/* Dark mode toggle */}
                    {/* <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        {theme === 'light' ? (
                            <MoonIcon className="h-5 w-5" />
                        ) : (
                            <SunIcon className="h-5 w-5" />
                        )}
                    </button> */}

                    {/* Notifications */}
                    {/* <Menu as="div" className="relative">
                        <Menu.Button className="p-2 text-gray-400 hover:text-gray-500 relative">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-5 w-5" aria-hidden="true" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            )}
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <Menu.Item key={notification.id}>
                                            {({ active }) => (
                                                <div className={`px-4 py-3 ${active ? 'bg-gray-50' : ''}`}>
                                                    <p className="text-sm text-gray-900">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-200">
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        View all notifications
                                    </button>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu> */}

                    {/* Separator - Hidden on mobile */}
                    <div className="hidden sm:block h-6 w-px bg-gray-200" aria-hidden="true" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">AU</span>
                            </div>
                            <span className="hidden sm:flex sm:items-center">
                                <span className="ml-2 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                    Admin User
                                </span>
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@opentherapy.com</p>
                                </div>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`${active ? 'bg-gray-50' : ''
                                                } flex items-center px-4 py-2 text-sm leading-6 text-gray-900`}
                                        >
                                            <UserCircleOutlineIcon className="h-4 w-4 mr-3 text-gray-400" />
                                            Your profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`${active ? 'bg-gray-50' : ''
                                                } flex items-center px-4 py-2 text-sm leading-6 text-gray-900`}
                                        >
                                            <Cog6ToothIcon className="h-4 w-4 mr-3 text-gray-400" />
                                            Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <div className="border-t border-gray-200 my-1"></div>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={onLogout}
                                            className={`${active ? 'bg-gray-50' : ''
                                                } block w-full text-left px-4 py-2 text-sm leading-6 text-gray-900`}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    )
}
