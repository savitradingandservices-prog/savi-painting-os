// api-client.js — talks to the free Google Apps Script backend
// No paid SDK, no paid hosting: fetch() over plain HTTPS.

// 1. Paste your deployed Web App URL here (Deploy → New deployment → Web app).
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgGMAIVQg7bLSSixqn3-pWpu1aWoErOIjV2PMAJWdP1r9DradlU0dkgDIFoqsbzRSu/exec";
// 2. Paste the same API_KEY you set in Script Properties.
const API_KEY = "savi2026key789";

// Internal: POST with text/plain content-type avoids a CORS preflight
// (Apps Script web apps don't handle OPTIONS requests, so a "simple request"
// is required — this is the standard free workaround, no proxy needed).
async function callBackend(action, sheet, extra = {}) {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, sheet, apiKey: API_KEY, ...extra }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Backend error");
  return json.data;
}

export const api = {
  list:   (sheet)          => callBackend("list", sheet),
  create: (sheet, data)    => callBackend("create", sheet, { data }),
  update: (sheet, id, data)=> callBackend("update", sheet, { id, data }),
  remove: (sheet, id)      => callBackend("delete", sheet, { id }),
};

/**
 * USAGE PATTERN (drop into any module component):
 *
 *   import { api } from "./api-client";
 *   import { useState, useEffect } from "react";
 *
 *   const [items, setItems] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *
 *   useEffect(() => {
 *     api.list("Inventory").then(data => { setItems(data); setLoading(false); });
 *   }, []);
 *
 *   const saveItem = async (form) => {
 *     const saved = await api.create("Inventory", form);
 *     setItems(prev => [...prev, saved]);
 *   };
 *
 *   const adjustStock = async (id, patch) => {
 *     const updated = await api.update("Inventory", id, patch);
 *     setItems(prev => prev.map(i => i.id === id ? updated : i));
 *   };
 *
 * Every module (Leads, Customers, Quotations, Invoices, Projects, Labour,
 * Inventory, Expenses, Followups, WhatsApp templates/log, Users, AuditLog)
 * follows this same list/create/update/remove pattern against its own
 * sheet name from Code.gs's SCHEMAS object.
 */
