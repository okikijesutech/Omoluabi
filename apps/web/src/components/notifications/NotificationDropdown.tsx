'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, AlertCircle, TrendingUp, Award, X } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'CONTRIBUTION_APPROVED' | 'CONTRIBUTION_REJECTED' | 'LEVEL_UP' | 'BADGE_EARNED' | 'NEW_REVIEW_NEEDED';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: any;
}

export default function NotificationDropdown() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiRequest('/notifications');
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await apiRequest(`/notifications/${id}/read`, { method: 'PATCH' });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiRequest('/notifications/read-all', { method: 'PATCH' });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'CONTRIBUTION_APPROVED': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'CONTRIBUTION_REJECTED': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'LEVEL_UP': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'BADGE_EARNED': return <Award className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-slate-900">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden transform origin-top-right animate-in fade-in zoom-in duration-200">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`p-4 border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                    !notification.read ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-medium truncate ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-slate-800/30 border-t border-slate-800 text-center">
            <Link 
              href="/profile" 
              className="text-xs text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View full profile history
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
