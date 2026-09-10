const templates = {
  invitation: {
    // inviter_name: "Vishal",
    organization_name: "Acme Inc",
    role: "admin",
    invite_url: "http://localhost:3000/invite/abc123",
    expires_at: "20 Mar 2026",
  },
};

export function getTemplateData(templateKey) {
  if (!templates[templateKey]) {
    throw new Error(`No mock data found for template: ${templateKey}`);
  }
  return templates[templateKey];
}

export function validateTemplateData(templateKey, data) {
  const requiredFields = Object.keys(templates[templateKey]);

  const missing = requiredFields.filter(
    (key) => data[key] === undefined || data[key] === null,
  );

  if (missing.length) {
    throw new Error(`Missing fields for ${templateKey}: ${missing.join(", ")}`);
  }
}
