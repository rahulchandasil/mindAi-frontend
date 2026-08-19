import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import conversationReducer from "../features/conversation/conversationSlice.js";
import messageReducer from "../features/message/messageSlice.js";
import therapistReducer from "../features/therapist/therapistSlice.js";
import adminReducer from "../features/admin/adminSlice.js"
import analyticsReducer from "../features/analytic/analyticSlice.js"
import therapistNoteReducer from "../features/therapistNote/therapistNoteSlice.js";
import notificationReducer from "../features/notification/notificationSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    message: messageReducer,
    therapist: therapistReducer,
    admin: adminReducer,
    analytics: analyticsReducer,
    therapistNote: therapistNoteReducer,
    notification: notificationReducer,
  },
});
