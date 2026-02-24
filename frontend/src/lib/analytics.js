// analytics.js
// Completely dynamic to prevent build-time crashes
let analytics = null;

export const initAnalytics = async () => {
  if (typeof window === "undefined") return;

  // We import firebase here to avoid top-level evaluation during build
  const { app } = require('./firebase');
  if (!app) return;

  try {
    const { getAnalytics, isSupported } = require('firebase/analytics');
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  } catch (err) {
    console.warn("Analytics failed to initialize:", err.message);
  }
};

export const logEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;

  if (analytics) {
    try {
      const { logEvent: firebaseLogEvent } = require('firebase/analytics');
      firebaseLogEvent(analytics, eventName, eventParams);
    } catch (err) {
      console.error("Failed to log event:", err);
    }
  } else {
    // Fallback or dev logging
    console.log(`[Analytics - Dev] Target: ${eventName}`, eventParams);
  }
};
