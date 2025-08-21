import { Club, Event, Announcement, Proposal, Application, Notification } from '../types';
import { addDays } from 'date-fns';

class DataStore {
  private clubs: Club[] = [
    {
      id: 'tech',
      name: 'Tech Club',
      description: 'Innovation and technology enthusiasts',
      logo: '💻',
      memberCount: 45,
      managedBy: '3'
    },
    {
      id: 'arts',
      name: 'Arts Club',
      description: 'Creative expression through various art forms',
      logo: '🎨',
      memberCount: 32
    },
    {
      id: 'sports',
      name: 'Sports Club',
      description: 'Physical fitness and competitive sports',
      logo: '⚽',
      memberCount: 58
    }
  ];

  private events: Event[] = [
    {
      id: '1',
      title: 'PPMK Welcome Night',
      description: 'Annual welcome event for new members',
      date: addDays(new Date(), 3),
      location: 'Main Hall',
      organizer: 'PPMK Committee',
      organizerId: '5',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      attendees: []
    },
    {
      id: '2',
      title: 'PPMK Town Hall',
      description: 'Quarterly meeting and updates',
      date: addDays(new Date(), -5),
      location: 'Auditorium',
      organizer: 'PPMK Committee',
      organizerId: '5',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
      attendees: ['1', '2', '3']
    },
    {
      id: '3',
      title: 'Tech Hackday',
      description: '24-hour coding marathon',
      date: addDays(new Date(), 7),
      location: 'Tech Lab',
      organizer: 'Tech Club',
      organizerId: '3',
      clubId: 'tech',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      attendees: ['2']
    },
    {
      id: '4',
      title: 'Tech Retrospective',
      description: 'Review of past projects and achievements',
      date: addDays(new Date(), -10),
      location: 'Meeting Room 2',
      organizer: 'Tech Club',
      organizerId: '3',
      clubId: 'tech',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      attendees: ['2', '3']
    }
  ];

  private announcements: Announcement[] = [
    {
      id: '1',
      title: 'Semester Kickoff Schedule',
      content: 'Welcome back! Here are the important dates for this semester...',
      author: 'PPMK Hicom',
      authorId: '5',
      createdAt: new Date(),
      scope: 'PPMK'
    },
    {
      id: '2',
      title: 'Hackday Prep Details',
      content: 'Please prepare your development environment before the hackday...',
      author: 'Club Hicom',
      authorId: '3',
      createdAt: addDays(new Date(), -2),
      scope: 'CLUB',
      clubId: 'tech'
    }
  ];

  private proposals: Proposal[] = [
    {
      id: '1',
      title: 'Tech Hackday Budget',
      description: 'Budget proposal for upcoming hackday event',
      status: 'Submitted',
      submittedBy: 'Muhammad Ali',
      submittedAt: new Date(),
      clubId: 'tech',
      items: [
        { name: 'Refreshments', quantity: 50, price: 500 },
        { name: 'Prizes', quantity: 3, price: 1000 },
        { name: 'Equipment Rental', quantity: 1, price: 800 }
      ]
    }
  ];

  private applications: Application[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Ahmad Rahman',
      clubId: 'tech',
      clubName: 'Tech Club',
      status: 'Pending',
      appliedAt: new Date(),
      reason: 'Interested in learning web development'
    }
  ];

  private notifications: Notification[] = [
    {
      id: '1',
      userId: '1',
      title: 'Welcome to PPMK!',
      message: 'Your account has been created successfully',
      type: 'announcement',
      read: false,
      createdAt: new Date(),
      link: '/announcements'
    },
    {
      id: '2',
      userId: '2',
      title: 'Upcoming Event',
      message: 'Tech Hackday is coming up in 7 days',
      type: 'event',
      read: false,
      createdAt: new Date(),
      link: '/events'
    },
    {
      id: '3',
      userId: '3',
      title: 'New Application',
      message: 'Ahmad Rahman has applied to join Tech Club',
      type: 'application',
      read: false,
      createdAt: new Date(),
      link: '/applications/review'
    },
    {
      id: '4',
      userId: '4',
      title: 'System Update',
      message: 'New features have been added to the system',
      type: 'announcement',
      read: true,
      createdAt: addDays(new Date(), -1)
    },
    {
      id: '5',
      userId: '5',
      title: 'Proposal Submitted',
      message: 'Tech Hackday Budget proposal needs review',
      type: 'proposal',
      read: false,
      createdAt: new Date(),
      link: '/proposals/review'
    }
  ];

  getClubs(): Club[] {
    return this.clubs;
  }

  getEvents(): Event[] {
    return this.events;
  }

  getAnnouncements(): Announcement[] {
    return this.announcements;
  }

  getProposals(): Proposal[] {
    return this.proposals;
  }

  getApplications(): Application[] {
    return this.applications;
  }

  getNotifications(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }

  rsvpEvent(eventId: string, userId: string, add: boolean) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      if (add && !event.attendees.includes(userId)) {
        event.attendees.push(userId);
      } else if (!add) {
        event.attendees = event.attendees.filter(id => id !== userId);
      }
    }
  }

  markNotificationsAsRead(userId: string) {
    this.notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
  }

  updateApplicationStatus(applicationId: string, status: 'Approved' | 'Rejected') {
    const app = this.applications.find(a => a.id === applicationId);
    if (app) {
      app.status = status;
    }
  }

  updateProposalStatus(proposalId: string, status: 'Approved' | 'Rejected') {
    const proposal = this.proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.status = status;
    }
  }
}

export const dataStore = new DataStore();
