/* Enterprise lead form: submits the lead straight into SurrealDB via the
   public insert-only record access (no secret in the page, no relay API);
   falls back to a mailto if the request fails. Same contract as the
   framework page's stack form. */
const LEADS = {
  endpoint: "https://close-wasp-06fmkfm5uhq2f77ih987dcdac4.aws-euw1.surreal.cloud/signup",
  ns: "main", db: "vantage-leads", ac: "submit",
};

const form = document.getElementById("ent-form");
if (form) form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const lead = {
    organisation: f.get("org"),
    email: f.get("email"),
    phone: f.get("phone") || "",
    notes: f.get("notes") || "",
    stack: "enterprise page",
    config_url: location.href,
  };

  const mailtoFallback = () => {
    const body =
      `Organisation: ${lead.organisation}\nEmail: ${lead.email}\nPhone: ${lead.phone || "-"}\n\n` +
      `Notes:\n${lead.notes || "-"}`;
    location.href = "mailto:hello@vantage-ui.com" +
      `?subject=${encodeURIComponent("Enterprise enquiry — " + lead.organisation)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const btn = form.querySelector("button[type=submit]");
  if (btn) btn.disabled = true;
  try {
    const res = await fetch(LEADS.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ns: LEADS.ns, db: LEADS.db, ac: LEADS.ac, ...lead }),
    });
    const data = res.ok ? await res.json().catch(() => ({})) : {};
    if (!res.ok || !data.token) throw new Error(`lead signup failed (${res.status})`);
    const thanks = document.createElement("p");
    thanks.className = "ent-form-thanks";
    thanks.textContent = "Thank you — we'll come back with a proposed stack.";
    form.replaceChildren(thanks);
  } catch (err) {
    if (btn) btn.disabled = false;
    mailtoFallback();
  }
});
