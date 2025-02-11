import cacheService from '@/shared/services/cache';
import { Any } from '@/shared/types/any';

type LoggedUserInfo = Any;

class AuthService {
  userInfo?: Any;
  constructor() {
    this.userInfo = this.loadUserInfo();
  }

  /* User Backend Related */
  isAuthenticated(): boolean {
    return !!this.userInfo?.id && this.userInfo.id !== 'Guest';
  }

  saveUserInfo(userInfo: LoggedUserInfo) {
    this.userInfo = userInfo;
    cacheService.set('USER_INFO', userInfo);
    return userInfo;
  }

  loadUserInfo(): LoggedUserInfo | undefined {
    return cacheService.get<LoggedUserInfo>('USER_INFO');
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
