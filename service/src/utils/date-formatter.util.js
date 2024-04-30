// NPM Modules

// Local Modules

class DateFormatterUtil {
  static formatDate(date) {
    try {
      if (date === undefined) return null;

      date = new Date(date);
      const y = date.getUTCFullYear();
      const mon = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      const h = String(date.getUTCHours() + 4).padStart(2, '0'); // Adjusting for time zone
      const min = String(date.getUTCMinutes()).padStart(2, '0');
      const s = String(date.getUTCSeconds()).padStart(2, '0');

      return `${y}-${mon}-${d} ${h}:${min}:${s}`;
    } catch (e) {
      return e;
    }
  }
}

export default DateFormatterUtil;
