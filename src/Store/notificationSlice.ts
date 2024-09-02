import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../Types/Notification";
import notificationApi from "../Api/notification-api";
import { AxiosError } from "axios";

const initialState: {notification: Notification[], notificationPanelOpened: boolean} = {
    notification: [],
    notificationPanelOpened: false
};


export const fetchNotifications = createAsyncThunk
<Notification[], undefined, {}>(
    "notification/fetchNotifications",
    async ()  => {
        try {
            const response = await notificationApi.getNotifications();   
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(`Axios error: ${error.message}`);
            }
        }
    }
);

export const fetchReadNotification = createAsyncThunk
<void, {notificationId: string}, {}>(
    'notification/fetchReadNotification',
    async ({notificationId}, {rejectWithValue}) => {
        try {
            await notificationApi.markAsRead(notificationId);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(`Axios error: ${error.message}`);
            }
            return rejectWithValue('Failed to mark notification as read');
        }
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        openNotificationPanel: (state) => {
            state.notificationPanelOpened = true;
        },
        closeNotificationPanel: (state) => {
            state.notificationPanelOpened = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notification = action.payload;
        });
        builder.addCase(fetchReadNotification.fulfilled, (state, action) => {
            state.notification = state.notification.map((notification) => {
                if (notification.id === action.meta.arg.notificationId) {
                    return {...notification, is_read: true};
                }
                return notification;
            });
        });
    }
});


export const { openNotificationPanel, closeNotificationPanel } = notificationSlice.actions;
export default notificationSlice.reducer;
