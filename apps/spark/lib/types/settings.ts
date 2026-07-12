export interface NotificationSettings {
  billing: boolean;
  usageAlerts: boolean;
  roamingTips: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  shareUsageForOffers: boolean;
  twoFactor: boolean;
}

export interface Settings {
  fullName: string;
  email: string;
  mobile: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}
