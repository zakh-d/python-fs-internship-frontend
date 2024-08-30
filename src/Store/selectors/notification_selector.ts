import { RootState } from "../store";

export const selectNotification = (state: RootState) => state.notification.notification;
export const selectNotificationPanelOpened = (state: RootState) => state.notification.notificationPanelOpened;
