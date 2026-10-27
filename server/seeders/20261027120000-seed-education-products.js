"use strict";

import { randomUUID } from "node:crypto";
import constants from "../app/lib/constants/index.js";

// Education Furniture — 12 products across Classroom, Library, Hostel and
// Auditorium. Images are left empty (upload from the dashboard). "Other
// Details" (content) is intentionally left empty.
//
// Safe to re-run: products whose slug already exists are skipped.

const CATEGORY_ID = "82b674e2-6c1e-42fe-bbae-e19a484b0f45"; // Education Furniture

const SUB = {
  classroom: "1133d455-f192-4b3d-8aa0-e4cafe7d8148",
  library: "2cc4a2f3-da70-41b6-9ae7-1ef8f325e1e0",
  hostel: "cff8bd6c-a432-43e5-b04f-20a314aa25c8",
  auditorium: "07b44695-b04c-4010-9d3b-5cdfc28a4759",
};

// Small helpers so each product below reads like the dashboard form.
const section = (heading, text, list = []) => ({
  heading,
  descriptions: [text],
  image: "",
  has_features: list.length > 0,
  features: { heading: "", list },
});
const feature = (title, description) => ({ title, description, image: "" });

const products = [
  // ───────────────────────── Classroom ─────────────────────────
  {
    sub: "classroom",
    title: "Vidya Classroom Desk",
    slug: "vidya-classroom-desk",
    short_description:
      "An ergonomic classroom desk with built-in storage and a bag hook, made for focused, clutter-free learning.",
    hero: {
      heading: "Vidya Classroom Desk",
      subheading: "Built for focus. Made to last.",
      descriptions: [
        "Vidya combines comfortable posture support, handy storage and sturdy construction to keep students attentive through the school day.",
      ],
    },
    overview: {
      heading: "Comfortable Desks for Longer Lessons",
      descriptions: [
        "Vidya is designed around how students actually sit and study. Its well-proportioned form encourages good posture, so students stay comfortable and attentive through long lessons.",
        "Built-in storage and a bag hook keep books and bags off the floor, helping classrooms stay neat, safe and easy to clean.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Posture-friendly ergonomic design",
          "Built-in book storage",
          "Integrated bag hook",
          "Sturdy frame for daily classroom use",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Designed for Good Posture",
        "A carefully proportioned desk and seat height help students sit upright and comfortably, reducing fatigue during long study hours.",
      ),
      section(
        "Storage Within Reach",
        "Compact storage under the top keeps books and stationery close at hand, leaving the work surface clear for writing and reading.",
        ["Under-top book storage", "Clear, clutter-free desktop"],
      ),
      section(
        "Bags Off the Floor",
        "A built-in bag hook keeps school bags off the floor and out of walkways, making classrooms tidier and safer.",
      ),
    ],
    features: [
      feature("Ergonomic Support", "Encourages good posture for comfortable, focused learning."),
      feature("Durable Build", "A strong frame made to handle everyday classroom use."),
      feature("Integrated Storage", "Keeps books and essentials neatly within reach."),
      feature("Bag Hook", "Keeps bags off the floor for a cleaner, safer room."),
    ],
    specifications: [
      { label: "Product Type", value: "Classroom desk" },
      { label: "Storage", value: "Integrated under-top storage" },
      { label: "Bag Hook", value: "Yes, built-in" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Schools, colleges, coaching centres" },
    ],
    faqs: [
      ["Is Vidya suitable for all age groups?", "Vidya is designed for school and college classrooms. Contact us for size options to suit specific age groups."],
      ["Does the desk have storage?", "Yes, it has built-in storage under the top for books and stationery, plus a hook for bags."],
      ["Can I choose the colour or finish?", "Yes, Vidya is available in a range of finishes to match your classroom."],
      ["Do you supply in bulk for schools?", "Yes, we supply complete classroom setups for schools and institutions. Get in touch for a quote."],
    ],
  },
  {
    sub: "classroom",
    title: "Quest Desk-Bench",
    slug: "quest-desk-bench",
    short_description:
      "A one-piece desk and seat unit with a tough PE seat and side storage — durable, organised and space-saving.",
    hero: {
      heading: "Quest Desk-Bench",
      subheading: "Desk and seat in one sturdy unit.",
      descriptions: [
        "Quest joins the desk and seat into a single, stable unit, giving classrooms neat rows and long-lasting durability.",
      ],
    },
    overview: {
      heading: "One Unit, Neat Classrooms",
      descriptions: [
        "With the desk and seat combined in one frame, Quest keeps classroom layouts uniform and stable — nothing shifts out of line during the day.",
        "A tough PE seat, side storage and strong finished legs make it a practical choice for busy classrooms.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Desk and seat combined in one unit",
          "Durable PE seat",
          "Side storage for books",
          "Strong metal legs with premium finish",
        ],
      },
    },
    details: [
      section(
        "Strong and Stable",
        "The PE seat is comfortable and easy to clean, while the joined frame keeps the desk and seat steady during everyday use.",
        ["PE (polyethylene) seat", "Metal legs with premium finish"],
      ),
      section(
        "Storage at the Side",
        "Built-in side storage keeps books close by without crowding the desktop or the floor.",
      ),
      section(
        "Space-Saving Layout",
        "A single combined unit uses floor space efficiently and keeps rows straight and uniform.",
      ),
    ],
    features: [
      feature("Sturdy PE Seat", "Comfortable, stable and easy to clean."),
      feature("Side Storage", "Keeps books within easy reach."),
      feature("Clean Desktop", "A streamlined top with strong, finished legs."),
      feature("Space Efficient", "Desk and seat in one unit for neat rows."),
    ],
    specifications: [
      { label: "Product Type", value: "Combined desk and seat" },
      { label: "Seat", value: "PE (polyethylene)" },
      { label: "Legs", value: "Metal, premium finish" },
      { label: "Storage", value: "Side storage" },
      { label: "Ideal For", value: "Schools and classrooms" },
    ],
    faqs: [
      ["What is the seat made of?", "The seat is made of durable PE (polyethylene), which is strong and easy to clean."],
      ["Is the desk joined to the seat?", "Yes, Quest is a single unit, which keeps it stable and keeps classroom rows uniform."],
      ["Is there space for books?", "Yes, it has side storage for books and notebooks."],
      ["Can it be customised?", "Yes, finishes can be customised. Contact us with your requirements."],
    ],
  },
  {
    sub: "classroom",
    title: "Scholar Desk & Chair",
    slug: "scholar-desk-and-chair",
    short_description:
      "A classroom desk and chair set with an MDF top, wire-mesh under-desk storage and an easy-lift back handle.",
    hero: {
      heading: "Scholar Desk & Chair",
      subheading: "Smart storage, steady support.",
      descriptions: [
        "Scholar pairs a durable MDF desktop with roomy under-desk storage and an easy-lift handle for quick classroom changes.",
      ],
    },
    overview: {
      heading: "Practical Design for Modern Classrooms",
      descriptions: [
        "Scholar is a desk and chair set built for everyday academic use. The MDF top gives a strong, smooth surface for writing, reading and project work.",
        "A wire-mesh basket under the desk holds books and bags, and the contoured back handle makes it easy to move when the room needs rearranging.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Durable MDF desktop",
          "Wire-mesh under-desk storage",
          "Contoured back handle for easy lifting",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Easy to Move",
        "The ergonomically shaped back handle lets students and staff lift and reposition the unit without strain — ideal for switching between lectures and group work.",
      ),
      section(
        "Room for Books and Bags",
        "A wire-mesh basket under the desk gives plenty of space for books and bags while keeping the desktop clear.",
        ["Wire-mesh under-desk basket", "Clear work surface"],
      ),
      section(
        "Built for Everyday Use",
        "The MDF top is sturdy and reliable, standing up to daily classroom wear.",
      ),
    ],
    features: [
      feature("Easy-Lift Handle", "Move and rearrange desks quickly without strain."),
      feature("Under-Desk Storage", "Wire-mesh basket for books and bags."),
      feature("MDF Desktop", "Strong, smooth surface for daily study."),
      feature("Compact Footprint", "Fits well in classrooms of every size."),
    ],
    specifications: [
      { label: "Product Type", value: "Desk and chair set" },
      { label: "Desktop", value: "MDF" },
      { label: "Storage", value: "Wire-mesh under-desk basket" },
      { label: "Handle", value: "Contoured back handle" },
      { label: "Finishes", value: "Multiple options available" },
    ],
    faqs: [
      ["What is the desktop made of?", "The desktop is made of MDF, which gives a strong and smooth writing surface."],
      ["How is it moved around?", "A contoured back handle makes it easy to lift and reposition the unit."],
      ["Is there storage under the desk?", "Yes, a wire-mesh basket under the desk holds books and bags."],
      ["Can I order it in bulk?", "Yes, we supply Scholar in bulk for schools and colleges."],
    ],
  },
  {
    sub: "classroom",
    title: "Doodle Student Desk Set",
    slug: "doodle-student-desk-set",
    short_description:
      "A playful student desk and chair set with a PE seat, easy-lift handle, under-desk basket and stationery holder.",
    hero: {
      heading: "Doodle Student Desk Set",
      subheading: "Comfortable, durable and fun to learn at.",
      descriptions: [
        "Doodle brings a cheerful look to the classroom, with smart storage and an easy-lift design that makes rearranging simple.",
      ],
    },
    overview: {
      heading: "A Desk Students Enjoy Using",
      descriptions: [
        "Doodle is a student desk and chair set that balances comfort, durability and a friendly, playful style.",
        "A PE seat, under-desk basket and a built-in stationery holder keep everything organised so students can focus on learning.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Durable PE seat",
          "Ergonomic back handle",
          "Under-desk wire basket",
          "Built-in stationery holder on the top",
        ],
      },
    },
    details: [
      section(
        "Stable and Long-Lasting",
        "The PE seat gives reliable stability and holds up well to everyday classroom use.",
      ),
      section(
        "Lift and Move Easily",
        "An ergonomic back handle makes it simple to lift and move the set for group activities or exams.",
      ),
      section(
        "Everything in Its Place",
        "An under-desk wire basket and a stationery holder on the top keep books, pens and pencils organised and the work surface clear.",
        ["Under-desk wire basket", "Tabletop stationery holder"],
      ),
    ],
    features: [
      feature("Sturdy PE Seat", "Stable, comfortable and built to last."),
      feature("Ergonomic Handle", "Effortless lifting for quick room changes."),
      feature("Stationery Holder", "Pens and pencils stay on the desk, not the floor."),
      feature("Under-Desk Basket", "Space for books and bags."),
    ],
    specifications: [
      { label: "Product Type", value: "Student desk and chair set" },
      { label: "Seat", value: "PE (polyethylene)" },
      { label: "Storage", value: "Under-desk wire basket" },
      { label: "Desktop Extras", value: "Built-in stationery holder" },
      { label: "Finishes", value: "Multiple options available" },
    ],
    faqs: [
      ["Who is Doodle designed for?", "Doodle is designed for school students and suits modern, colourful classrooms."],
      ["Does it have a pen holder?", "Yes, the desktop has a built-in stationery holder."],
      ["Is it easy to move?", "Yes, the back handle makes it easy to lift and move."],
      ["Are colours customisable?", "Yes, finishes can be customised to suit your school."],
    ],
  },
  {
    sub: "classroom",
    title: "Gyan Classroom Desk",
    slug: "gyan-classroom-desk",
    short_description:
      "A classroom desk and chair set with under-desk storage, a bookshelf and a bag hook for organised everyday learning.",
    hero: {
      heading: "Gyan Classroom Desk",
      subheading: "Smart design for everyday learning.",
      descriptions: [
        "Gyan keeps books, bags and supplies organised, so students spend less time searching and more time learning.",
      ],
    },
    overview: {
      heading: "Organised Desks, Focused Students",
      descriptions: [
        "Gyan is a desk and chair set built to make classrooms more functional, with a durable top and storage designed around students' daily needs.",
        "Under-desk storage, a bookshelf and a bag hook keep everything in its place and the classroom floor clear.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Under-desk storage",
          "Built-in bookshelf",
          "Integrated bag hook",
          "Durable tabletop",
        ],
      },
    },
    details: [
      section(
        "Bags Stay Off the Floor",
        "A built-in bag hook keeps school bags off the floor, making the classroom cleaner and easier to move around.",
      ),
      section(
        "Storage Under the Desk",
        "Under-desk storage keeps books and essentials neatly organised and helps students stay focused through the day.",
      ),
      section(
        "A Dedicated Bookshelf",
        "A handy bookshelf gives books and supplies their own space, encouraging tidy, efficient study habits.",
        ["Built-in bookshelf", "Under-desk storage", "Bag hook"],
      ),
    ],
    features: [
      feature("Bag Hook", "Keeps bags off the floor and within reach."),
      feature("Under-Desk Storage", "Keeps books and essentials organised."),
      feature("Bookshelf", "Dedicated space for books and supplies."),
      feature("Durable Top", "Made for daily classroom use."),
    ],
    specifications: [
      { label: "Product Type", value: "Desk and chair set" },
      { label: "Storage", value: "Under-desk storage + bookshelf" },
      { label: "Bag Hook", value: "Yes, built-in" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Schools and coaching centres" },
    ],
    faqs: [
      ["What storage does Gyan have?", "Gyan has under-desk storage, a built-in bookshelf and a bag hook."],
      ["Is it suitable for daily use?", "Yes, it has a durable tabletop made for everyday classroom use."],
      ["Can finishes be changed?", "Yes, Gyan is available in a range of finishes."],
      ["Do you provide installation?", "Yes, our team can deliver and set up classroom furniture. Contact us for details."],
    ],
  },

  // ───────────────────────── Library ─────────────────────────
  {
    sub: "library",
    title: "Unite Library Table",
    slug: "unite-library-table",
    short_description:
      "A modern library table that joins with others for group work or stands alone for quiet study, with angled reinforced legs.",
    hero: {
      heading: "Unite Library Table",
      subheading: "Join for teamwork. Separate for focus.",
      descriptions: [
        "Unite adapts to how your library is used — link tables together for group study or use them individually for quiet work.",
      ],
    },
    overview: {
      heading: "A Library Table That Adapts",
      descriptions: [
        "Unite brings a clean, modern look to libraries while staying practical for daily use. Its spacious top supports reading, laptop work and group study.",
        "Tables can be joined for collaborative sessions or separated for individual study, so one set of furniture covers many needs.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Connects with other tables for group work",
          "Angled, reinforced legs for stability",
          "Slim, modern profile",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Connect or Separate",
        "Link Unite tables together for group activities, or use them on their own for individual study — rearranging takes just minutes.",
      ),
      section(
        "Steady Under Heavy Use",
        "Uniquely angled, reinforced legs give strong load-bearing support and keep the table wobble-free in busy libraries.",
        ["Angled reinforced legs", "Wobble-free stability"],
      ),
      section(
        "Light, Modern Look",
        "Slim legs and clean lines keep the table looking light and make it easy to move around the room.",
      ),
    ],
    features: [
      feature("Flexible Layouts", "Join tables for groups or use them alone."),
      feature("Reinforced Legs", "Angled legs for strong, steady support."),
      feature("Slim Profile", "Clean lines that suit modern interiors."),
      feature("Easy to Move", "Rearrange your library quickly."),
    ],
    specifications: [
      { label: "Product Type", value: "Library table" },
      { label: "Configuration", value: "Standalone or connected" },
      { label: "Legs", value: "Angled, reinforced" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Libraries, study halls, classrooms" },
    ],
    faqs: [
      ["Can Unite tables be joined together?", "Yes, they connect easily for group work and separate for individual study."],
      ["Is the table stable?", "Yes, its angled reinforced legs keep it steady even with heavy daily use."],
      ["Where can it be used?", "It suits libraries, study halls, classrooms and collaborative learning spaces."],
      ["Are different finishes available?", "Yes, Unite comes in a range of finishes."],
    ],
  },
  {
    sub: "library",
    title: "Studia Library Table",
    slug: "studia-library-table",
    short_description:
      "A sleek library table with a spacious top and sturdy metal frame for focused and collaborative study.",
    hero: {
      heading: "Studia Library Table",
      subheading: "Modern design, practical space.",
      descriptions: [
        "Studia gives readers plenty of room for books, laptops and notes, on a strong metal frame built for daily use.",
      ],
    },
    overview: {
      heading: "Room to Read, Space to Think",
      descriptions: [
        "Studia is a contemporary library table with a sleek top and sturdy metal frame — a refined addition to libraries and study spaces.",
        "Its spacious surface holds books, laptops and study materials comfortably, keeping the space clutter-free and productive.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Spacious tabletop",
          "Sturdy metal frame",
          "Suits individual and group study",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Space for Everything",
        "A generous surface fits books, laptops and notes side by side, so readers can spread out and focus.",
      ),
      section(
        "Clean Design, Strong Frame",
        "A sleek top on a sturdy metal frame gives a modern look with dependable stability.",
        ["Sturdy metal frame", "Sleek tabletop"],
      ),
    ],
    features: [
      feature("Spacious Top", "Room for books, laptops and notes."),
      feature("Metal Frame", "Strong and stable for daily use."),
      feature("Timeless Look", "Fits any library or study space."),
    ],
    specifications: [
      { label: "Product Type", value: "Library table" },
      { label: "Frame", value: "Metal" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Libraries, reading rooms, study areas" },
    ],
    faqs: [
      ["What is the frame made of?", "Studia has a sturdy metal frame."],
      ["Is it good for laptop use?", "Yes, the spacious top comfortably holds laptops, books and notes."],
      ["Can it be used for group study?", "Yes, it works well for both individual and group study."],
      ["Can I choose the finish?", "Yes, Studia is available in a range of finishes."],
    ],
  },
  {
    sub: "library",
    title: "Readwell Magazine Rack",
    slug: "readwell-magazine-rack",
    short_description:
      "A multi-compartment magazine rack that keeps reading materials neatly displayed and easy to reach.",
    hero: {
      heading: "Readwell Magazine Rack",
      subheading: "Organised reading, made simple.",
      descriptions: [
        "Readwell displays magazines and newspapers neatly, so readers can find what they want at a glance.",
      ],
    },
    overview: {
      heading: "Neat Display for Reading Materials",
      descriptions: [
        "Readwell is a minimal, durable display unit for libraries and common areas.",
        "Multiple compartments keep magazines and newspapers in order while making good use of available space.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Multiple display compartments",
          "Minimal, durable design",
          "Space-efficient footprint",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Easy to Browse",
        "Magazines are displayed face-out so readers can see and pick titles quickly.",
      ),
      section(
        "Multiple Compartments",
        "Separate compartments keep different titles organised and make the most of the space.",
        ["Multiple compartments", "Space-saving design"],
      ),
    ],
    features: [
      feature("Clear Display", "Titles are easy to see and reach."),
      feature("Multiple Compartments", "Keeps reading material organised."),
      feature("Durable Build", "Minimal design made to last."),
    ],
    specifications: [
      { label: "Product Type", value: "Magazine rack" },
      { label: "Compartments", value: "Multiple" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Libraries, lobbies, common areas" },
    ],
    faqs: [
      ["Where can Readwell be used?", "It suits libraries, reading rooms, lobbies and common areas."],
      ["Does it hold newspapers too?", "Yes, its compartments hold magazines, newspapers and brochures."],
      ["Is it available in different finishes?", "Yes, Readwell comes in a range of finishes."],
    ],
  },

  // ───────────────────────── Hostel ─────────────────────────
  {
    sub: "hostel",
    title: "Nestwood Hostel Bed",
    slug: "nestwood-hostel-bed",
    short_description:
      "A sturdy wooden hostel bed with lift-up storage and built-in drawers, available as a single or bunk bed.",
    hero: {
      heading: "Nestwood Hostel Bed",
      subheading: "Reliable comfort for hostel living.",
      descriptions: [
        "Nestwood combines a strong wooden frame with smart storage, keeping shared rooms neat and comfortable.",
      ],
    },
    overview: {
      heading: "Strong Beds, Tidy Rooms",
      descriptions: [
        "Nestwood is a minimal wooden bed built for hostels and student housing, where furniture needs to be strong and long-lasting.",
        "A lift-up storage base and built-in drawers give every student space for their belongings without crowding the room.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Sturdy wooden frame",
          "Lift-up under-bed storage",
          "Built-in drawers",
          "Single and bunk options",
        ],
      },
    },
    details: [
      section(
        "Lift-Up Storage",
        "A smooth lift-up mechanism opens up spacious storage under the bed, making the most of every room.",
      ),
      section(
        "Built-In Drawers",
        "Smooth-gliding drawers give easy access to personal essentials and help keep shared rooms neat.",
      ),
      section(
        "Made for Daily Use",
        "A strong wooden frame provides restful sleep and stands up to years of hostel use.",
        ["Single bed", "Bunk bed"],
      ),
    ],
    features: [
      feature("Lift-Up Storage", "Spacious storage hidden under the bed."),
      feature("Built-In Drawers", "Easy-access space for personal items."),
      feature("Wooden Frame", "Strong and long-lasting."),
      feature("Single or Bunk", "Choose the layout that fits your rooms."),
    ],
    specifications: [
      { label: "Product Type", value: "Hostel bed" },
      { label: "Frame", value: "Wood" },
      { label: "Storage", value: "Lift-up base + drawers" },
      { label: "Configurations", value: "Single bed, bunk bed" },
      { label: "Ideal For", value: "Hostels, dormitories, student housing" },
    ],
    faqs: [
      ["Is Nestwood available as a bunk bed?", "Yes, it is available as both a single bed and a bunk bed."],
      ["What storage does it have?", "It has a lift-up storage base and built-in drawers."],
      ["Is it suitable for hostels?", "Yes, it is built for daily use in hostels, dormitories and student housing."],
      ["Can you supply for a full hostel?", "Yes, we take bulk orders for hostels and institutions."],
    ],
  },
  {
    sub: "hostel",
    title: "Steelrest Hostel Bed",
    slug: "steelrest-hostel-bed",
    short_description:
      "A heavy-duty metal hostel bed in single and bunk versions, with built-in safety features and powder-coated finishes.",
    hero: {
      heading: "Steelrest Hostel Bed",
      subheading: "Sturdy, safe and space-saving.",
      descriptions: [
        "Steelrest is a heavy-duty metal bed built for busy hostels, with a clean modern look and strong frame support.",
      ],
    },
    overview: {
      heading: "Built Strong for Shared Living",
      descriptions: [
        "Steelrest offers heavy-duty metal single and bunk beds made for the demands of hostel life.",
        "Integrated safety features and a space-efficient design make it a dependable choice for shared rooms.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Heavy-duty metal frame",
          "Single and bunk versions",
          "Built-in safety features on bunks",
          "Powder-coated finishes",
        ],
      },
    },
    details: [
      section(
        "Strength for Shared Rooms",
        "A heavy-duty metal frame gives lasting stability and everyday comfort for a good night's sleep.",
      ),
      section(
        "Safe Bunk Design",
        "Bunk versions include built-in safety features, making them suitable for shared accommodation.",
      ),
      section(
        "Choose Your Colour",
        "The frame is powder-coated for a durable finish and is available in several colours.",
        ["Light Blue", "Sea Green", "Orange", "Graphite Grey", "Misty Grey", "White"],
      ),
    ],
    features: [
      feature("Heavy-Duty Frame", "Made for daily hostel use."),
      feature("Safety Built In", "Safety features on bunk versions."),
      feature("Space Efficient", "Bunk option saves floor space."),
      feature("Powder-Coated", "Durable finish in multiple colours."),
    ],
    specifications: [
      { label: "Product Type", value: "Hostel bed" },
      { label: "Frame", value: "Metal, powder-coated" },
      { label: "Configurations", value: "Single bed, bunk bed" },
      { label: "Frame Colours", value: "Light Blue, Sea Green, Orange, Graphite Grey, Misty Grey, White" },
      { label: "Ideal For", value: "Hostels, dormitories, staff quarters" },
    ],
    faqs: [
      ["Is Steelrest available as a bunk bed?", "Yes, it comes as a single bed or a bunk bed."],
      ["Are the bunk beds safe?", "Yes, the bunk version includes built-in safety features."],
      ["Which colours are available?", "Light Blue, Sea Green, Orange, Graphite Grey, Misty Grey and White."],
      ["Do you take bulk orders?", "Yes, we supply hostels and institutions in bulk."],
    ],
  },

  // ───────────────────────── Auditorium ─────────────────────────
  {
    sub: "auditorium",
    title: "Encore Auditorium Chair",
    slug: "encore-auditorium-chair",
    short_description:
      "A comfortable auditorium chair with plush cushioning, headrest support and an armrest with built-in cup holder.",
    hero: {
      heading: "Encore Auditorium Chair",
      subheading: "Comfort that lasts the whole show.",
      descriptions: [
        "Encore gives audiences proper support through long events, with a modern look that suits any auditorium.",
      ],
    },
    overview: {
      heading: "Comfortable Seating for Long Sessions",
      descriptions: [
        "Encore is an auditorium chair with a contoured form that supports the body through long lectures, events and performances.",
        "Plush cushioning, a supportive headrest and a cup-holder armrest make every seat more comfortable and convenient.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Plush cushioning",
          "Supportive headrest",
          "Armrest with integrated cup holder",
          "Choice of fabrics and finishes",
        ],
      },
    },
    details: [
      section(
        "Armrest with Cup Holder",
        "An ergonomic armrest with a built-in cup holder adds comfort and convenience for every guest.",
      ),
      section(
        "Cushioned Comfort",
        "Plush cushioning and a supportive headrest keep audiences comfortable even through long sessions.",
      ),
      section(
        "Built for Busy Venues",
        "A sturdy build makes Encore ideal for auditoriums, seminar halls and event spaces.",
        ["Multiple fabric options", "Durable construction"],
      ),
    ],
    features: [
      feature("Cup-Holder Armrest", "Comfort and convenience in one."),
      feature("Plush Cushioning", "Soft seat and back for long events."),
      feature("Headrest Support", "Proper neck and head support."),
      feature("Durable Build", "Made for high-use venues."),
    ],
    specifications: [
      { label: "Product Type", value: "Auditorium chair" },
      { label: "Headrest", value: "Yes" },
      { label: "Armrest", value: "With integrated cup holder" },
      { label: "Upholstery", value: "Multiple fabric options" },
      { label: "Ideal For", value: "Auditoriums, seminar halls, event spaces" },
    ],
    faqs: [
      ["Does the chair have a cup holder?", "Yes, the armrest has an integrated cup holder."],
      ["Is it comfortable for long events?", "Yes, plush cushioning and a headrest provide support through long sessions."],
      ["Can I choose the fabric colour?", "Yes, Encore is available in multiple fabric options."],
      ["Do you handle full auditorium projects?", "Yes, we supply and install seating for complete auditoriums."],
    ],
  },
  {
    sub: "auditorium",
    title: "Orator Podium",
    slug: "orator-podium",
    short_description:
      "A sleek, sturdy podium that gives speakers a professional platform for lectures, speeches and events.",
    hero: {
      heading: "Orator Podium",
      subheading: "A platform for confident presentations.",
      descriptions: [
        "Orator gives every speaker a polished, professional place to present — in auditoriums, classrooms and conference halls.",
      ],
    },
    overview: {
      heading: "Present with Confidence",
      descriptions: [
        "Orator is a professional podium with a sleek design that suits both formal and everyday settings.",
        "Its sturdy structure performs reliably in auditoriums, classrooms, training rooms and conference halls.",
      ],
      features: {
        heading: "Features & Options",
        list: [
          "Sleek, professional design",
          "Sturdy construction",
          "Suits formal and casual settings",
          "Choice of finishes",
        ],
      },
    },
    details: [
      section(
        "Professional Presence",
        "A clean, polished look helps speakers present with clarity and confidence.",
      ),
      section(
        "Made to Perform",
        "A sturdy build gives reliable use across auditoriums, classrooms and conference halls.",
        ["Auditoriums", "Classrooms", "Conference halls", "Training rooms"],
      ),
    ],
    features: [
      feature("Sleek Design", "A professional look for any venue."),
      feature("Sturdy Build", "Reliable for daily and event use."),
      feature("Versatile", "Works in formal and casual settings."),
    ],
    specifications: [
      { label: "Product Type", value: "Podium / lectern" },
      { label: "Finishes", value: "Multiple options available" },
      { label: "Ideal For", value: "Auditoriums, classrooms, conference halls, training rooms" },
    ],
    faqs: [
      ["Where can Orator be used?", "It suits auditoriums, classrooms, conference halls and training rooms."],
      ["Can the finish match our interiors?", "Yes, Orator is available in multiple finishes."],
      ["Can you add our institution's logo?", "Contact us — custom branding can be discussed for bulk and project orders."],
    ],
  },
];

const seo = (p) => ({
  meta_title: `${p.title} | Education Furniture – Natraj Furniture`,
  meta_description: p.short_description,
  meta_keywords: `${p.title.toLowerCase()}, education furniture, ${p.sub} furniture, school furniture, Natraj Furniture`,
});

export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  const table = constants.models.PRODUCT_TABLE;

  const [[category]] = await sequelize.query(
    `SELECT id FROM ${constants.models.CATEGORY_TABLE} WHERE id = :id`,
    { replacements: { id: CATEGORY_ID } },
  );
  if (!category) {
    throw new Error(`Education category ${CATEGORY_ID} not found — create it first.`);
  }

  const [subs] = await sequelize.query(
    `SELECT id FROM ${constants.models.SUB_CATEGORY_TABLE} WHERE id IN (:ids)`,
    { replacements: { ids: Object.values(SUB) } },
  );
  const missing = Object.entries(SUB).filter(([, id]) => !subs.some((s) => s.id === id));
  if (missing.length) {
    throw new Error(`Sub-categories not found: ${missing.map(([k]) => k).join(", ")}`);
  }

  const [existing] = await sequelize.query(
    `SELECT slug FROM ${table} WHERE slug IN (:slugs)`,
    { replacements: { slugs: products.map((p) => p.slug) } },
  );
  const skip = new Set(existing.map((r) => r.slug));

  await sequelize.transaction(async (transaction) => {
    for (const [i, p] of products.entries()) {
      if (skip.has(p.slug)) {
        console.log(`  ↷ skipped (already exists): ${p.slug}`);
        continue;
      }

      const json = {
        hero: { ...p.hero, images: [] },
        overview: { ...p.overview, image: "" },
        details: { sections: p.details, banner: { image: "" } },
        features: { heading: "Features & Options", items: p.features },
        faqs: p.faqs.map(([question, answer]) => ({ question, answer })),
        specifications: p.specifications,
        materials: {},
        models_3d: [],
        downloads: [],
        gallery: { heading: "", images: [] },
        colors: [],
      };

      await sequelize.query(
        `INSERT INTO ${table}
          (id, slug, title, short_description, category_id, sub_category_id,
           is_active, sort_order, content, thumbnail,
           hero, overview, details, features, faqs, specifications,
           materials, models_3d, downloads, gallery, colors,
           meta_title, meta_description, meta_keywords, created_at, updated_at)
         VALUES
          (:id, :slug, :title, :short_description, :category_id, :sub_category_id,
           true, :sort_order, NULL, NULL,
           :hero::jsonb, :overview::jsonb, :details::jsonb, :features::jsonb, :faqs::jsonb, :specifications::jsonb,
           :materials::jsonb, :models_3d::jsonb, :downloads::jsonb, :gallery::jsonb, :colors::jsonb,
           :meta_title, :meta_description, :meta_keywords, NOW(), NOW())`,
        {
          transaction,
          replacements: {
            id: randomUUID(),
            slug: p.slug,
            title: p.title,
            short_description: p.short_description,
            category_id: CATEGORY_ID,
            sub_category_id: SUB[p.sub],
            sort_order: i + 1,
            ...Object.fromEntries(Object.entries(json).map(([k, v]) => [k, JSON.stringify(v)])),
            ...seo(p),
          },
        },
      );
      console.log(`  ✔ added: ${p.slug}`);
    }
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(
    `DELETE FROM ${constants.models.PRODUCT_TABLE} WHERE slug IN (:slugs)`,
    { replacements: { slugs: products.map((p) => p.slug) } },
  );
}
