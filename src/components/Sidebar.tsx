"use client";

import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  DocumentTextIcon,
  HeartIcon,
  HomeIcon,
  UsersIcon,
  CommandLineIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

type NavigationItem = {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
  }[];
};

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "User Management", href: "/users", icon: UsersIcon },
  {
    name: "AI Management",
    href: "/ai-management",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "AI Prompts",
    icon: CommandLineIcon,
    children: [
      {
        name: "Global Prompt",
        href: "/bloom-global-prompt",
        icon: CommandLineIcon,
      },
      // {
      //   name: "Life Area Prompts",
      //   href: "/life-area-prompt",
      //   icon: ShieldExclamationIcon,
      // },
      {
        name: "Crisis Prompts",
        href: "/crisis-prompts",
        icon: ShieldExclamationIcon,
      },
    ],
  },
  {
    name: "Emotional Categories",
    href: "/emotional-categories",
    icon: HeartIcon,
  },
  { name: "Content Management", href: "/content", icon: DocumentTextIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
  // Example with children:
  // {
  //     name: 'Management',
  //     icon: CogIcon,
  //     children: [
  //         { name: 'Subitem 1', href: '/sub1', icon: HomeIcon },
  //         { name: 'Subitem 2', href: '/sub2', icon: UsersIcon }
  //     ]
  // }
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Management",
  ]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children: any[]) =>
    children.some((child) => isActive(child.href));

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
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 relative">
                        <Image
                          src="/logo.png"
                          alt="Open Therapy"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          Open Therapy
                        </span>
                        <p className="text-xs text-gray-500">Admin Panel</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            if (item.children) {
                              const isExpanded = expandedSections.includes(
                                item.name
                              );
                              const hasActiveChild = isParentActive(
                                item.children
                              );

                              return (
                                <li key={item.name}>
                                  <button
                                    onClick={() => toggleSection(item.name)}
                                    className={cn(
                                      hasActiveChild
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                                      "group flex w-full items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors"
                                    )}
                                  >
                                    <item.icon
                                      className={cn(
                                        hasActiveChild
                                          ? "text-blue-700"
                                          : "text-gray-400 group-hover:text-blue-600",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                    {isExpanded ? (
                                      <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
                                    ) : (
                                      <ChevronRightIcon className="ml-auto h-4 w-4 text-gray-400" />
                                    )}
                                  </button>
                                  {isExpanded && (
                                    <ul className="ml-6 mt-1 space-y-1">
                                      {item.children.map((child) => (
                                        <li key={child.name}>
                                          <Link
                                            href={child.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                              isActive(child.href)
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
                                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors"
                                            )}
                                          >
                                            <child.icon
                                              className={cn(
                                                isActive(child.href)
                                                  ? "text-blue-700"
                                                  : "text-gray-400 group-hover:text-blue-600",
                                                "h-5 w-5 shrink-0"
                                              )}
                                              aria-hidden="true"
                                            />
                                            {child.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              );
                            } else {
                              return (
                                <li key={item.name}>
                                  <Link
                                    href={item.href!}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      isActive(item.href!)
                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors"
                                    )}
                                  >
                                    <item.icon
                                      className={cn(
                                        isActive(item.href!)
                                          ? "text-blue-700"
                                          : "text-gray-400 group-hover:text-blue-600",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </Link>
                                </li>
                              );
                            }
                          })}
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
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 shadow-lg">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 relative">
                <Image
                  src="/logo.png"
                  alt="Open Therapy"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Open Therapy
                </span>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    if (item.children) {
                      const isExpanded = expandedSections.includes(item.name);
                      const hasActiveChild = isParentActive(item.children);

                      return (
                        <li key={item.name}>
                          <button
                            onClick={() => toggleSection(item.name)}
                            className={cn(
                              hasActiveChild
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                              "group flex w-full items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors"
                            )}
                          >
                            <item.icon
                              className={cn(
                                hasActiveChild
                                  ? "text-blue-700"
                                  : "text-gray-400 group-hover:text-blue-600",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                            {isExpanded ? (
                              <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronRightIcon className="ml-auto h-4 w-4 text-gray-400" />
                            )}
                          </button>
                          {isExpanded && (
                            <ul className="ml-6 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      isActive(child.href)
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors"
                                    )}
                                  >
                                    <child.icon
                                      className={cn(
                                        isActive(child.href)
                                          ? "text-blue-700"
                                          : "text-gray-400 group-hover:text-blue-600",
                                        "h-5 w-5 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href!}
                            className={cn(
                              isActive(item.href!)
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                              "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors"
                            )}
                          >
                            <item.icon
                              className={cn(
                                isActive(item.href!)
                                  ? "text-blue-700"
                                  : "text-gray-400 group-hover:text-blue-600",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
