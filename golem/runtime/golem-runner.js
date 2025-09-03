function golemExecute(intent) {
  if (intent.includes("הצעת מחיר")) {
    return {
      action: "create_quote",
      client: "שלמה כהן",
      items: ["שפכטל", "צבע", "עבודה"],
      vat: 0.17,
      platform: "base44"
    };
  } else if (intent.includes("רחפן") && intent.includes("פיש")) {
    return {
      action: "drone_delivery",
      client: "משתמש אנונימי",
      items: ["פיש", "צ'יפס"],
      platform: "smartDrone"
    };
  } else if (intent.includes("ירושלים") && intent.includes("מתקפת סייבר")) {
    return {
      action: "restore_independence_day",
      client: "עיריית ירושלים",
      platform: "city_emergency_protocol"
    };
  } else {
    return {
      action: "unknown"
    };
  }
}

module.exports = { golemExecute };
