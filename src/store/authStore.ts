import { User } from '../types';

class AuthStore {
  private currentUser: User | null = null;
  private authReady = false;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initAuth();
  }

  private initAuth() {
    // Simulate auth initialization
    setTimeout(() => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
      this.authReady = true;
      this.notifyListeners();
    }, 500);
  }

  login(email: string, password: string): boolean {
    // Mock authentication
    const users: Record<string, User> = {
      'member@ppmk.local': {
        id: '1',
        email: 'member@ppmk.local',
        name: 'Ahmad Rahman',
        role: 'PPMK_MEMBER',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      'clubmember@ppmk.local': {
        id: '2',
        email: 'clubmember@ppmk.local',
        name: 'Siti Nurhaliza',
        role: 'CLUB_MEMBER',
        clubId: 'tech',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      'clubhicom@ppmk.local': {
        id: '3',
        email: 'clubhicom@ppmk.local',
        name: 'Muhammad Ali',
        role: 'CLUB_HICOM',
        clubId: 'tech',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      },
      'biro@ppmk.local': {
        id: '4',
        email: 'biro@ppmk.local',
        name: 'Fatimah Zahra',
        role: 'PPMK_BIRO',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      'hicom@ppmk.local': {
        id: '5',
        email: 'hicom@ppmk.local',
        name: 'Ibrahim Hassan',
        role: 'PPMK_HICOM',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      }
    };

    if (password === 'password123' && users[email]) {
      this.currentUser = users[email];
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifyListeners();
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.notifyListeners();
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isAuthReady(): boolean {
    return this.authReady;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const authStore = new AuthStore();
