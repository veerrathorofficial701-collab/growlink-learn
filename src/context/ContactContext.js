import { createContext, useContext, useState } from "react";

const ContactContext = createContext(null);

const INITIAL = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@innovatetech.com",
    phone: "+1 555 0101",
    subject: "Link Building Partnership",
    message: "Hi, we're interested in exploring a link building partnership for our SaaS product.",
    date: "2025-01-10",
    status: "Unread",
  },
  {
    id: 2,
    name: "David Chen",
    email: "david@ecosolutions.io",
    phone: "+1 555 0202",
    subject: "Campaign Pricing Inquiry",
    message: "Could you send over pricing details for your Growth plan? We need around 50 backlinks per month.",
    date: "2025-01-12",
    status: "Read",
  },
  {
    id: 3,
    name: "Maria Patel",
    email: "maria@stylevault.com",
    phone: "+1 555 0303",
    subject: "Crypto Niche Outreach",
    message: "We operate in the crypto space and need publishers that accept crypto-related content. Can you help?",
    date: "2025-01-14",
    status: "Replied",
  },
];

export function ContactProvider({ children }) {
  const [submissions, setSubmissions] = useState(INITIAL);

  function addSubmission(data) {
    setSubmissions(prev => [
      { ...data, id: Date.now(), date: new Date().toISOString().slice(0, 10), status: "Unread" },
      ...prev,
    ]);
  }

  function updateStatus(id, status) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  }

  function deleteSubmission(id) {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  }

  return (
    <ContactContext.Provider value={{ submissions, addSubmission, updateStatus, deleteSubmission }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  return useContext(ContactContext);
}
