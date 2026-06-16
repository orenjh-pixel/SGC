/* ============================================================
   Star Group Construction — Gallery data (curated)
   ------------------------------------------------------------
   Curated down to high-resolution, watermark-free, clutter-free
   shots after an art-director site-worthiness pass.
   Each entry:  { f: filename in /images, t: filter tag, c: caption, feat: homepage-featured }
   Tags in use: "kitchens", "bathrooms", "interiors"
   (Add "roofing" / "exteriors" entries here when those photos arrive,
    plus matching filter buttons in gallery.html.)
   ============================================================ */
window.SGC_GALLERY = [
  // ---------- Kitchens ----------
  { f: "star.groupconstruction_1752689191_3678145988578455768_75918023720.jpg", t: "kitchens",  c: "Waterfall Marble Island Kitchen",        feat: true },
  { f: "star.groupconstruction_1757633461_3719621524010661946_75918023720.jpg", t: "kitchens",  c: "Modern White Kitchen, Marble Island",    feat: true },
  { f: "star.groupconstruction_1757633076_3719618300646126115_75918023720.jpg", t: "kitchens",  c: "Bright Cream Kitchen Remodel",           feat: true },
  { f: "star.groupconstruction_1752689085_3678145098152503870_75918023720.jpg", t: "kitchens",  c: "Modern Gray Kitchen, Marble Backsplash", feat: true },
  { f: "star.groupconstruction_1752689191_3678145988377169713_75918023720.jpg", t: "kitchens",  c: "Navy Kitchen, Bookmatched Marble Wall" },
  { f: "star.groupconstruction_1757633461_3719621523951926969_75918023720_c.jpg", t: "kitchens", c: "Open Kitchen With Center Island" },

  // ---------- Bathrooms ----------
  { f: "star.groupconstruction_1752689552_3678149015959981050_75918023720.jpg", t: "bathrooms", c: "White Marble Bathroom Remodel",          feat: true },
  { f: "star.groupconstruction_1752689552_3678149015884511997_75918023720.jpg", t: "bathrooms", c: "Frameless Glass Marble Shower" },
  { f: "star.groupconstruction_1757632851_3719616408603934042_75918023720.jpg", t: "bathrooms", c: "Marble Shower, Chrome Fixtures" },

  // ---------- Interiors ----------
  { f: "star.groupconstruction_1752689191_3678145988385561726_75918023720.jpg", t: "interiors", c: "Formal Dining, Built-In Shelving",       feat: true },
  { f: "star.groupconstruction_1752689191_3678145988385327265_75918023720.jpg", t: "interiors", c: "Elegant Dining Room, Pool View" }
];

/* Friendly label per tag, shown on hover + in the lightbox. */
window.SGC_TAG_LABEL = {
  kitchens:  "Kitchen Remodel",
  bathrooms: "Bathroom Remodel",
  interiors: "Interior Renovation",
  roofing:   "Roofing",
  exteriors: "Exteriors"
};
