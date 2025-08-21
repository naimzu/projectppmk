export type UserRole = 'PPMK_MEMBER' | 'CLUB_MEMBER' | 'CLUB_HICOM' | 'PPMK_BIRO' | 'PPMK_HICOM';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  clubId?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  memberCount: number;
  managedBy?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  organizerId: string;
  clubId?: string;
  image?: string;
  attendees: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  scope: 'PPMK' | 'CLUB';
  clubId?: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'Submitted' | 'Approved' | 'Rejected';
  submittedBy: string;
  submittedAt: Date;
  items: ProposalItem[];
  clubId: string;
}

export interface ProposalItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  clubId: string;
  clubName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedAt: Date;
  reason?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event' | 'announcement' | 'application' | 'proposal';
  read: boolean;
  createdAt: Date;
  link?: string;
}

export interface RouteConfig {
  path: string;
  label: string;
  icon: any;
  roles: UserRole[];
}
