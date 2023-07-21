import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
export default new TimeAgo("en-GB");
