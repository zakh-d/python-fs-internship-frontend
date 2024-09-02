import { RootState } from "../store";

export const selectNotifications = (state: RootState) => state.notification.notification;
export const selectNotificationPanelOpened = (state: RootState) => state.notification.notificationPanelOpened;
export const selectNumberOfUnreadNotifications = (state: RootState) => state.notification.notification.filter((notification) => !notification.is_read).length;