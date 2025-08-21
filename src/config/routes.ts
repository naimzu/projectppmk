import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Bell, 
  Briefcase,
  ClipboardList,
  Building,
  UserCheck,
  Megaphone,
  Search
} from 'lucide-react';
import { RouteConfig, UserRole } from '../types';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  EVENTS_FEEDBACK: '/events/feedback',
  SUGGESTIONS: '/suggestions',
  CLUBS_EXPLORE: '/clubs/explore',
  APPLICATIONS_MINE: '/applications/mine',
  APPLICATIONS_REVIEW: '/applications/review',
  ANNOUNCEMENTS: '/announcements',
  PROPOSALS: '/proposals',
  PROPOSALS_REVIEW: '/proposals/review',
  CLUB_MANAGE: '/club/manage',
  ADMIN_CLUBS: '/admin/clubs',
  ADMIN_MEMBERS: '/admin/members',
  NOTIFICATIONS: '/notifications'
} as const;

export const sidebarConfig: Record<UserRole, RouteConfig[]> = {
  PPMK_MEMBER: [
    { path: ROUTES.DASHBOARD, label: 'Overview', icon: LayoutDashboard, roles: ['PPMK_MEMBER'] },
    { path: ROUTES.EVENTS, label: 'Events', icon: Calendar, roles: ['PPMK_MEMBER'] },
    { path: ROUTES.CLUBS_EXPLORE, label: 'Explore Clubs', icon: Search, roles: ['PPMK_MEMBER'] },
    { path: ROUTES.APPLICATIONS_MINE, label: 'My Applications', icon: FileText, roles: ['PPMK_MEMBER'] },
    { path: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone, roles: ['PPMK_MEMBER'] },
    { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell, roles: ['PPMK_MEMBER'] }
  ],
  CLUB_MEMBER: [
    { path: ROUTES.DASHBOARD, label: 'Overview', icon: LayoutDashboard, roles: ['CLUB_MEMBER'] },
    { path: ROUTES.EVENTS, label: 'Events', icon: Calendar, roles: ['CLUB_MEMBER'] },
    { path: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone, roles: ['CLUB_MEMBER'] },
    { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell, roles: ['CLUB_MEMBER'] }
  ],
  CLUB_HICOM: [
    { path: ROUTES.DASHBOARD, label: 'Overview', icon: LayoutDashboard, roles: ['CLUB_HICOM'] },
    { path: ROUTES.EVENTS, label: 'Events', icon: Calendar, roles: ['CLUB_HICOM'] },
    { path: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone, roles: ['CLUB_HICOM'] },
    { path: ROUTES.APPLICATIONS_REVIEW, label: 'Applications Review', icon: ClipboardList, roles: ['CLUB_HICOM'] },
    { path: ROUTES.PROPOSALS, label: 'Proposals', icon: Briefcase, roles: ['CLUB_HICOM'] },
    { path: ROUTES.CLUB_MANAGE, label: 'Manage Club Members', icon: UserCheck, roles: ['CLUB_HICOM'] },
    { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell, roles: ['CLUB_HICOM'] }
  ],
  PPMK_BIRO: [
    { path: ROUTES.DASHBOARD, label: 'Overview', icon: LayoutDashboard, roles: ['PPMK_BIRO'] },
    { path: ROUTES.EVENTS, label: 'Events', icon: Calendar, roles: ['PPMK_BIRO'] },
    { path: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone, roles: ['PPMK_BIRO'] },
    { path: ROUTES.ADMIN_CLUBS, label: 'All Clubs', icon: Building, roles: ['PPMK_BIRO'] },
    { path: ROUTES.ADMIN_MEMBERS, label: 'All Members', icon: Users, roles: ['PPMK_BIRO'] }
  ],
  PPMK_HICOM: [
    { path: ROUTES.DASHBOARD, label: 'Overview', icon: LayoutDashboard, roles: ['PPMK_HICOM'] },
    { path: ROUTES.EVENTS, label: 'Events', icon: Calendar, roles: ['PPMK_HICOM'] },
    { path: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone, roles: ['PPMK_HICOM'] },
    { path: ROUTES.PROPOSALS_REVIEW, label: 'Review Proposals', icon: ClipboardList, roles: ['PPMK_HICOM'] },
    { path: ROUTES.ADMIN_CLUBS, label: 'All Clubs', icon: Building, roles: ['PPMK_HICOM'] },
    { path: ROUTES.ADMIN_MEMBERS, label: 'All Members', icon: Users, roles: ['PPMK_HICOM'] },
    { path: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell, roles: ['PPMK_HICOM'] }
  ]
};
