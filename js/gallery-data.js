/* ============================================================
   Star Group Construction — Gallery data (curated)
   ------------------------------------------------------------
   High-resolution, watermark-free, clutter-free shots only,
   grouped by area/job. Each entry:
     { f: filename in /images, t: filter tag, c: caption, feat: homepage-featured }
   Tags in use: "kitchens", "bathrooms", "interiors"
   (Add a "pergolas" entry + a matching filter button when pergola photos arrive.)
   ============================================================ */
window.SGC_GALLERY = [
  // ===================== KITCHENS =====================
  // — Marble / luxury kitchens
  { f: "star.groupconstruction_1752689191_3678145988578455768_75918023720.jpg", t: "kitchens",  c: "Waterfall Marble Island Kitchen",        feat: true },
  { f: "n-img_9959.jpg",                                                          t: "kitchens",  c: "Marble Waterfall Island, Lake View",     feat: true },
  { f: "star.groupconstruction_1757633461_3719621524010661946_75918023720.jpg", t: "kitchens",  c: "Modern White Kitchen, Marble Island",    feat: true },
  { f: "n-img_2236.jpg",                                                          t: "kitchens",  c: "White Quartz Peninsula, Mosaic Tile",    feat: true },
  { f: "star.groupconstruction_1757633076_3719618300646126115_75918023720.jpg", t: "kitchens",  c: "Bright Cream Kitchen Remodel" },
  { f: "star.groupconstruction_1752689085_3678145098152503870_75918023720.jpg", t: "kitchens",  c: "Modern Gray Kitchen, Marble Backsplash" },
  { f: "star.groupconstruction_1752689191_3678145988377169713_75918023720.jpg", t: "kitchens",  c: "Navy Kitchen, Bookmatched Marble Wall" },
  { f: "star.groupconstruction_1757633461_3719621523951926969_75918023720_c.jpg", t: "kitchens", c: "Open Kitchen With Center Island" },
  // — Espresso-cabinet kitchen (one job)
  { f: "n-img_2233.jpg",                                                          t: "kitchens",  c: "Open Espresso Kitchen & Living",         feat: true },
  { f: "n-img_2230.jpg",                                                          t: "kitchens",  c: "Espresso Kitchen, Quartz Island" },
  { f: "n-img_2239.jpg",                                                          t: "kitchens",  c: "Glass-Mosaic Backsplash & Range" },

  // ===================== BATHROOMS =====================
  { f: "n-img_1593.jpg",                                                          t: "bathrooms", c: "Marble Shower, Brushed-Gold Fixtures",   feat: true },
  { f: "n-dfdf370b-1c56-4bf4-b36d-d00f6c30f55d.jpg",                              t: "bathrooms", c: "Onyx Marble Shower With Bench" },
  { f: "n-img_1629.jpg",                                                          t: "bathrooms", c: "Marble Double-Vanity Bathroom",          feat: true },
  { f: "n-e20d721a-e5c3-487f-a560-3f9e52881b4c.jpg",                              t: "bathrooms", c: "Onyx Marble Walk-In Shower" },
  { f: "star.groupconstruction_1752689552_3678149015959981050_75918023720.jpg", t: "bathrooms", c: "White Marble Bathroom Remodel" },
  { f: "star.groupconstruction_1752689552_3678149015884511997_75918023720.jpg", t: "bathrooms", c: "Frameless Glass Marble Shower" },
  { f: "star.groupconstruction_1757632851_3719616408603934042_75918023720.jpg", t: "bathrooms", c: "Marble Shower, Chrome Fixtures" },

  // ===================== INTERIORS =====================
  { f: "star.groupconstruction_1752689191_3678145988385561726_75918023720.jpg", t: "interiors", c: "Formal Dining, Built-In Shelving",       feat: true },
  { f: "star.groupconstruction_1752689191_3678145988385327265_75918023720.jpg", t: "interiors", c: "Elegant Dining Room, Pool View" }
];

/* Friendly label per tag, shown on hover + in the lightbox. */
window.SGC_TAG_LABEL = {
  kitchens:  "Kitchen Remodel",
  bathrooms: "Bathroom Remodel",
  interiors: "Interior Renovation",
  pergolas:  "Pergola"
};
