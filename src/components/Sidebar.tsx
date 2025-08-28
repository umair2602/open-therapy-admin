'use client'

import { cn } from '@/lib/utils'
import { Dialog, Transition } from '@headlessui/react'
import {
    BookOpenIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentTextIcon,
    HeartIcon,
    HomeIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'User Management', href: '#', icon: UsersIcon, current: false },
    { name: 'Chat Therapy Sessions', href: '#', icon: ChatBubbleLeftRightIcon, current: false },
    { name: 'Emotional Diary', href: '#', icon: DocumentTextIcon, current: false },

    { name: 'Personality Tests', href: '#', icon: CogIcon, current: false },
    { name: 'Stress Scale Assessments', href: '#', icon: ChartBarIcon, current: false },
    { name: 'Daily Tools', href: '#', icon: BookOpenIcon, current: false },
    { name: 'Insomnia Tests', href: '#', icon: ClockIcon, current: false },
    { name: 'Areas of Life', href: '#', icon: HeartIcon, current: false },
    { name: 'Payment & Subscriptions', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Video/Audio Sessions', href: '#', icon: UserGroupIcon, current: false },
    { name: 'AI Model Management', href: '#', icon: CogIcon, current: false },
    { name: 'Longitudinal Analysis', href: '#', icon: ChartBarIcon, current: false },
    { name: 'Analytics & Reports', href: '#', icon: ChartBarIcon, current: false },
    { name: 'Content Management', href: '#', icon: DocumentTextIcon, current: false },
    { name: 'Security & Compliance', href: '#', icon: ShieldCheckIcon, current: false },
]

interface SidebarProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
    return (
        <>
            {/* Mobile sidebar */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                                <HeartIcon className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-xl font-bold text-gray-900">Open Therapy</span>
                                        </div>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={cn(
                                                                    item.current
                                                                        ? 'bg-gray-50 text-blue-600'
                                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={cn(
                                                                        item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                                                        'h-6 w-6 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <HeartIcon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Open Therapy</span>
                        </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    item.current
                                                        ? 'bg-gray-50 text-blue-600'
                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon
                                                    className={cn(
                                                        item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
