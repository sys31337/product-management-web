import cacheService from '@/shared/services/cache';
import { Any } from '@/shared/types/any';
import { LoggedUser } from '../types/user';

class AuthService {
  userInfo?: Any;
  constructor() {
    this.userInfo = this.loadUserInfo();
  }

  /* User Backend Related */
  isAuthenticated(): boolean {
    return !!this.userInfo?.id && this.userInfo.id !== 'Guest';
  }

  saveUserInfo(userInfo: LoggedUser) {
    this.userInfo = userInfo;
    cacheService.set('USER_INFO', userInfo);
    return userInfo;
  }

  loadUserInfo(): LoggedUser | undefined {
    return cacheService.get<LoggedUser>('USER_INFO');
  }

  currentUserId() {
    return this.userInfo?.user_id;
  }

  /* Logout */
  resetUserInfo() {
    cacheService.remove('USER_INFO');
    this.userInfo = undefined;
  }
}

const authService = new AuthService();

export default authService;
