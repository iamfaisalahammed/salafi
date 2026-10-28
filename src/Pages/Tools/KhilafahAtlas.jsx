import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

/* ==========================================
   ১. আইকন
========================================== */
const Icon = ({ d, d2, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d2} />}
  </svg>
);

const IconGlobe = (p) => <Icon {...p} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IconZoomIn = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />;
const IconZoomOut = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />;
const IconReset = (p) => <Icon {...p} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />;
const IconMapPin = (p) => <Icon {...p} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" d2="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />;
const IconLayers = (p) => <Icon {...p} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />;
const IconBook = (p) => <Icon {...p} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
const IconCalendar = (p) => <Icon {...p} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
const IconCompare = (p) => <Icon {...p} d="M9 17V7m6 10V7m-8 10h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />;
const IconSearch = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
const IconClose = (p) => <Icon {...p} d="M6 18L18 6M6 6l12 12" />;
const IconCrown = (p) => <Icon {...p} d="M5 16l-1-8 4 3 4-5 4 5 4-3-1 8H5z" />;
const IconRoute = (p) => <Icon {...p} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />;
const IconHelp = (p) => <Icon {...p} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IconChevron = (p) => <Icon {...p} d="M5 15l7-7 7 7" />;
const IconSwap = (p) => <Icon {...p} d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4-4m-4 4l4 4" />;

/* ==========================================
   ২. বাংলা ঐতিহাসিক তথ্যভাণ্ডার ও মানচিত্র ডাটা
========================================== */
const HISTORICAL_CITIES_BN = [
  { id: 'makkah', name: 'মক্কা আল-মুকাররমা', coords: { x: 550, y: 480 }, region: 'হিজাজ', significance: 'ইসলামের পবিত্রতম স্থান, কাবা শরীফ ও মহানবী (সাঃ)-এর জন্মস্থান।' },
  { id: 'madinah', name: 'মদীনা আল-মুনাওয়ারা', coords: { x: 540, y: 450 }, region: 'হিজাজ', significance: 'প্রথম ইসলামী রাষ্ট্রের রাজধানী ও মহানবী (সাঃ)-এর রওজা মোবারক।' },
  { id: 'jerusalem', name: 'জেরুজালেম (বায়তুল মুকাদ্দাস)', coords: { x: 485, y: 375 }, region: 'শাম/ফিলিস্তিন', significance: 'ইসলামের ৩য় পবিত্রতম স্থান, মসজিদুল আকসা।' },
  { id: 'damascus', name: 'দামেস্ক (Damascus)', coords: { x: 495, y: 360 }, region: 'শাম', significance: 'উমাইয়া খিলাফাতের রাজধানী ও ঐতিহাসিক বাণিজ্য কেন্দ্র।' },
  { id: 'kufa', name: 'কুফা (Kufa)', coords: { x: 545, y: 370 }, region: 'ইরাক', significance: 'হযরত আলী (রাঃ)-এর সময়কালের রাজধানী ও জ্ঞানচর্চার কেন্দ্র।' },
  { id: 'baghdad', name: 'বাগদাদ (Baghdad)', coords: { x: 560, y: 355 }, region: 'ইরাক', significance: 'আব্বাসীয় খিলাফাতের রাজধানী ও বায়তুল হিকমাহ (জ্ঞান গৃহ)।' },
  { id: 'cairo', name: 'কায়রো (Cairo/Fustat)', coords: { x: 450, y: 400 }, region: 'মিশর', significance: 'ফাতেমীয়, আইয়ুবীয় ও মামলুকদের রাজধানী; আল-আজহার বিশ্ববিদ্যালয়।' },
  { id: 'cordoba', name: 'কর্ডোবা (Qurtubah)', coords: { x: 190, y: 290 }, region: 'আল-আন্দালুস (স্পেন)', significance: 'কর্ডোবা খিলাফাতের রাজধানী ও ইউরোপের তৎকালীন বৃহত্তম শিক্ষাকেন্দ্র।' },
  { id: 'istanbul', name: 'ইস্তাম্বুল (Constantinople)', coords: { x: 440, y: 270 }, region: 'অনাতোলিয়া', significance: 'উসমানীয় (অটোমান) সাম্রাজ্যের রাজধানী ও ১৪৫৩ সালে বিজয়।' },
  { id: 'marrakesh', name: 'মারাকেশ (Marrakesh)', coords: { x: 170, y: 370 }, region: 'মাগরেব (মরোক্কো)', significance: 'আলমোরাভিদ ও আলমোহাদ খিলাফাতের রাজধানী।' },
  { id: 'isfahan', name: 'ইসফাহান (Isfahan)', coords: { x: 640, y: 360 }, region: 'পারস্য (ইরান)', significance: 'সফবীয় সাম্রাজ্যের রাজধানী ও বিশ্বখ্যাত স্থাপত্যের শহর।' },
  { id: 'delhi', name: 'দিল্লি (Delhi)', coords: { x: 820, y: 410 }, region: 'হিন্দুস্থান (ভারত)', significance: 'দিল্লি সালতানাত ও মুঘল সাম্রাজ্যের ঐতিহাসিক রাজধানী।' }
].map((c) => ({ ...c, short: c.name.split(' ')[0] }));

const SILK_ROAD_ROUTES = [
  'M 190,290 L 450,400 L 495,360 L 560,355 L 640,360 L 820,410',
  'M 450,400 L 540,450 L 550,480 L 620,530 L 820,410'
];

const HISTORICAL_PERIODS_BN = [
  {
    id: 1, name: 'নবী করীম ﷺ এর যুগ', subtitle: 'ইসলামের শুভ সূচনা ও নবুয়তী রাষ্ট্রীয় ভিত্তি',
    dates: '৬১০ – ৬৩২ খ্রি.', type: 'নবুয়তী রাষ্ট্র', typeCategory: 'খিলাফাত', color: '#34D399', fillOpacity: 0.7,
    capital: 'মদীনা আল-মুনাওয়ারা', peakArea: '১০,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['সৌদি আরব', 'ইয়েমেন', 'ওমান', 'সংযুক্ত আরব আমিরাত', 'জর্ডান (আংশিক)'],
    leadership: 'রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম',
    overview: 'নবুয়তের মাধ্যমে মক্কায় ইসলামের সূচনা এবং ৬২২ খ্রিষ্টাব্দে মদীনায় হিজরতের মাধ্যমে প্রথম ইসলামী রাষ্ট্রের ভিত্তি স্থাপিত হয়। মদীনাহ সনদের মাধ্যমে অসাম্প্রদায়িক বিচার ব্যবস্থা ও সামাজিক শান্তি কায়েম করা হয়।',
    keyEvents: [
      { year: '৬১০ খ্রি.', title: 'প্রথম ওহী লাভ', desc: 'গারে হিরায় পবিত্র কুরআন অবতীর্ণ হওয়া শুরু।' },
      { year: '৬২২ খ্রি.', title: 'ঐতিহাসিক হিজরত', desc: 'মক্কা থেকে মদীনায় আগমন এবং ইসলামী বর্ষপঞ্জি (হিজরী) সূচনা।' },
      { year: '৬৩০ খ্রি.', title: 'মক্কা বিজয়', desc: 'রক্তপাতহীনভাবে মক্কা বিজয় ও কাবা শরীফকে মূর্তিমুক্তকরণ।' }
    ],
    sources: [{ title: 'সিরাতে ইবনে হিশাম', author: 'ইবনে হিশাম', notes: 'মহানবী (সাঃ)-এর প্রাচীনতম ও নির্ভরযোগ্য জীবনীগ্রন্থ।' }],
    mapPaths: [{ name: 'আরব উপদ্বীপ (মদীনা কেন্দ্রিক)', path: 'M 520,440 L 565,435 L 590,460 L 620,490 L 610,540 L 580,570 L 530,560 L 520,500 Z' }]
  },
  {
    id: 2, name: 'হযরত আবু বকর (রাঃ)', subtitle: 'প্রথম রাশেদুন খলিফা — রিদ্দা যুদ্ধ ও রাষ্ট্রীয় স্থায়িত্ব',
    dates: '৬৩২ – ৬৩৪ খ্রি.', type: 'রাশেদুন খিলাফাত', typeCategory: 'খিলাফাত', color: '#10B981', fillOpacity: 0.7,
    capital: 'মদীনা আল-মুনাওয়ারা', peakArea: '১৪,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['সৌদি আরব', 'ইয়েমেন', 'ওমান', 'ইউএই', 'কুয়েত', 'ইরাক (আংশিক)'],
    leadership: 'খলিফা আবু বকর আস-সিদ্দিক (রাঃ)',
    overview: 'মহানবী (সাঃ)-এর ওফাতের পর ভণ্ড নবীদের উপদ্রব ও রিদ্দা (স্বধর্ম ত্যাগ) আন্দোলন কঠোরভাবে দমন করে রাষ্ট্রকে একত্রিত করেন। তাঁর আমলেই প্রথম পবিত্র কুরআন গ্রন্থাকারে সংকলন করা হয়।',
    keyEvents: [
      { year: '৬৩২ খ্রি.', title: 'সকিফায় খিলাফাত নির্বাচন', desc: 'সহাবীদের সর্বসম্মতিক্রমে প্রথম খলিফা নির্বাচন।' },
      { year: '৬৩৩ খ্রি.', title: 'পবিত্র কুরআন সংকলন', desc: 'হযরত জায়েদ ইবনে সাবেত (রাঃ)-এর নেতৃত্বে পাণ্ডুলিপি তৈরি।' }
    ],
    sources: [{ title: 'তারিখ আল-উমাম ওয়াল মুলুক', author: 'ইমাম আত-তাবারী', notes: 'খিলাফাতের প্রারম্ভিক ইতিহাস।' }],
    mapPaths: [{ name: 'একত্রিত আরব ও সীমান্ত অঞ্চল', path: 'M 505,420 L 550,395 L 585,410 L 630,470 L 625,545 L 575,575 L 520,555 L 510,480 Z' }]
  },
  {
    id: 3, name: 'হযরত ওমর (রাঃ)', subtitle: 'দ্বিতীয় রাশেদুন খলিফা — প্রশাসনিক ও ভূখণ্ডগত বিস্তার',
    dates: '৬৩৪ – ৬৪৪ খ্রি.', type: 'রাশেদুন খিলাফাত', typeCategory: 'খিলাফাত', color: '#059669', fillOpacity: 0.7,
    capital: 'মদীনা আল-মুনাওয়ারা', peakArea: '৩৮,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['সৌদি আরব', 'জর্ডান', 'ফিলিস্তিন', 'সিরিয়া', 'ইরাক', 'ইরান (পশ্চিম)', 'মিশর', 'লিবিয়া'],
    leadership: 'খলিফা ওমর ইবনুল খাত্তাব (রাঃ)',
    overview: 'তাঁর শাসনকালে পারস্য সাম্রাজ্য ও বাইজেন্টাইন সাম্রাজ্যের বিশাল অংশ ইসলামী রাষ্ট্রের অধীনে আসে। তিনি বাইতুল মাল (রাজকোষ), বিচার বিভাগ, ডাক বিভাগ ও হিজরী সন চালু করেন।',
    keyEvents: [
      { year: '৬৩৬ খ্রি.', title: 'ইয়ারমুকের যুদ্ধ', desc: 'রোমান বাইজেন্টাইন বাহিনীর বিরুদ্ধে ঐতিহাসিক বিজয়।' },
      { year: '৬৩৭ খ্রি.', title: 'জেরুজালেম বিজয়', desc: 'শান্তিপূর্ণভাবে জেরুজালেমের চাবি গ্রহণ ও নিরাপত্তা চুক্তি।' }
    ],
    sources: [{ title: 'ফুতুহুল বুলদান', author: 'আল-বালাযুরী', notes: 'ইসলামী বিজয়াভিযান ও প্রশাসনিক নথি।' }],
    mapPaths: [{ name: 'বিস্তৃত রাশেদুন সাম্রাজ্য (ওমর রাঃ)', path: 'M 430,410 L 465,370 L 500,340 L 570,330 L 630,340 L 640,390 L 615,480 L 625,550 L 520,560 L 435,435 Z' }]
  },
  {
    id: 4, name: 'হযরত উসমান (রাঃ)', subtitle: 'তৃতীয় রাশেদুন খলিফা — নৌবাহিনী গঠন ও মহাসমুদ্র বিস্তার',
    dates: '৬৪৪ – ৬৫৬ খ্রি.', type: 'রাশেদুন খিলাফাত', typeCategory: 'খিলাফাত', color: '#34D399', fillOpacity: 0.7,
    capital: 'মদীনা আল-মুনাওয়ারা', peakArea: '৪৯,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['সৌদি আরব', 'মিশর', 'লিবিয়া', 'তিউনিসিয়া', 'সিরিয়া', 'ইরাক', 'ইরান', 'আফগানিস্তান', 'সাইপ্রাস'],
    leadership: 'খলিফা উসমান ইবনে আফফান (রাঃ)',
    overview: 'প্রথম মুসলিম নৌবাহিনী গঠন করা হয়। কুরআনুল কারীমের প্রামাণিক কপি (মুসহাফে উসমানী) প্রস্তুত করে সাম্রাজ্যের বিভিন্ন দেশে প্রেরণ করা হয়। উত্তর আফ্রিকা ও মধ্য এশিয়ায় সীমান্ত সম্প্রসারিত হয়।',
    keyEvents: [
      { year: '৬৫০ খ্রি.', title: 'মুসহাফে উসমানী লিখন', desc: 'কুরআনের মানক কপি তৈরি ও বিশ্বব্যাপী বিতরণ।' },
      { year: '৬৫৪ খ্রি.', title: 'যাতুস সাওয়ারী (নৌযুদ্ধ)', desc: 'ভূমধ্যসাগরে প্রথম পরাক্রমশালী নৌ-বিজয়।' }
    ],
    sources: [{ title: 'আল-বিদায়া ওয়ান নিহায়া', author: 'ইবনে কাছীর', notes: 'ইতিহাস ও খিলাফাত সংকলন।' }],
    mapPaths: [{ name: 'সর্বোচ্চ রাশেদুন মানচিত্র (উসমান রাঃ)', path: 'M 380,390 L 450,330 L 520,290 L 610,290 L 680,320 L 710,380 L 650,450 L 620,550 L 510,560 L 375,415 Z' }]
  },
  {
    id: 5, name: 'হযরত আলী (রাঃ)', subtitle: 'চতুর্থ রাশেদুন খলিফা — বিচার বিভাগীয় ন্যায়বিচার ও সংস্কার',
    dates: '৬৫৬ – ৬৬১ খ্রি.', type: 'রাশেদুন খিলাফাত', typeCategory: 'খিলাফাত', color: '#0D9488', fillOpacity: 0.7,
    capital: 'কুফা (ইরাক)', peakArea: '৪৬,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['সৌদি আরব', 'ইরাক', 'ইরান', 'মিশর', 'ইয়েমেন'],
    leadership: 'খলিফা আলী ইবনে আবী তালিব (রাঃ)',
    overview: 'রাজধানী মদীনা থেকে কুফায় স্থানান্তরিত করা হয়। অভ্যন্তরীণ সংস্কার, বায়তুল মালের সুষম বন্টন, প্রশাসনিক স্বচ্ছতা ও আদালতের অবকাঠামো পুনর্গঠনে বিশেষ জোর দেন।',
    keyEvents: [
      { year: '৬৫৬ খ্রি.', title: 'রাজধানী স্থানান্তর', desc: 'প্রশাসনিক সুবিধার জন্য কুফা শহরে রাজধানী স্থাপন।' },
      { year: '৬৬১ খ্রি.', title: 'শাহাদাত বরণ', desc: 'ইরাকের কুফায় আব্দুর রহমান ইবনে মুলজিম কর্তৃক শাহাদাত।' }
    ],
    sources: [{ title: 'নাহজুল বালাগা', author: 'হযরত আলী (রাঃ) সম্পর্কিত সঙ্কলন', notes: 'চিঠিপত্র, ভাষণ ও প্রশাসনিক নির্দেশাবলী।' }],
    mapPaths: [{ name: 'রাশেদুন সীমান্ত (আলী রাঃ)', path: 'M 420,390 L 480,350 L 550,310 L 650,310 L 690,360 L 630,470 L 600,550 L 500,550 L 415,420 Z' }]
  },
  {
    id: 6, name: 'উমাইয়া খিলাফাত', subtitle: 'প্রথম রাজবংশীয় মহাসাম্রাজ্য — আটলান্টিক থেকে সিন্ধু',
    dates: '৬৬১ – ৭৫০ খ্রি.', type: 'উমাইয়া খিলাফাত', typeCategory: 'খিলাফাত', color: '#3B82F6', fillOpacity: 0.65,
    capital: 'দামেস্ক (সিরিয়া)', peakArea: '১,১১,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['স্পেন', 'পর্তুগাল', 'মরোক্কো', 'আলজেরিয়া', 'তিউনিসিয়া', 'মিশর', 'সিরিয়া', 'ইরাক', 'ইরান', 'পাকিস্তান'],
    leadership: 'মুয়াবিয়া (রাঃ), আবদুল মালিক, ওমর ইবনে আবদুল আজিজ',
    overview: 'দামেস্ককে রাজধানী করে উমাইয়ারা তিনটি মহাদেশজুড়ে বিস্তৃত বৃহত্তম সাম্রাজ্য গঠন করে। ফার্সি ও গ্রিকের বদলে আরবিকে রাষ্ট্রভাষা করা হয় এবং সোনার দিনার মুদ্রা চালু হয়।',
    keyEvents: [
      { year: '৬৯১ খ্রি.', title: 'ডোম অফ দ্য রক নির্মাণ', desc: 'জেরুজালেমে কুব্বাতুস সাখরা নির্মাণ কাজ সমাপ্ত।' },
      { year: '৭১১ খ্রি.', title: 'আন্দালুস ও সিন্ধু বিজয়', desc: 'তারিক বিন যিয়াদ কর্তৃক স্পেন এবং মুহাম্মদ বিন কাসিম কর্তৃক সিন্ধু বিজয়।' }
    ],
    sources: [{ title: 'দ্য উমাইয়া ক্যালিফেট', author: 'জি. আর. হটিং', notes: 'উমাইয়া রাষ্ট্রব্যবস্থা সংক্রান্ত ঐতিহাসিক গ্রন্থ।' }],
    mapPaths: [{ name: 'উমাইয়া বিশ্ব সাম্রাজ্য', path: 'M 160,380 L 170,270 L 260,290 L 350,330 L 450,280 L 540,260 L 680,260 L 780,310 L 830,410 L 750,470 L 620,530 L 450,420 L 300,410 L 160,400 Z' }]
  },
  {
    id: 7, name: 'আব্বাসীয় খিলাফাত', subtitle: 'ইসলামী স্বর্ণযুগ ও বিশ্ব জ্ঞান-বিজ্ঞানের কেন্দ্রবিন্দু',
    dates: '৭৫০ – ১২৫৮ খ্রি.', type: 'আব্বাসীয় খিলাফাত', typeCategory: 'খিলাফাত', color: '#8B5CF6', fillOpacity: 0.65,
    capital: 'বাগদাদ (ইরাক)', peakArea: '১,০৫,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['ইরাক', 'ইরান', 'সিরিয়া', 'মিশর', 'সৌদি আরব', 'আফগানিস্তান', 'উজবেকিস্তান'],
    leadership: 'আবু জাফর আল-মানসুর, হারুন অর-রশিদ, আল-মামুন',
    overview: "বাগদাদে বিশ্বখ্যাত 'বায়তুল হিকমাহ' (House of Wisdom) প্রতিষ্ঠা করে বীজগণিত, জ্যোতির্বিজ্ঞান, চিকিৎসা ও দর্শনে বিপ্লব ঘটানো হয়। এটিই ইসলামী সভ্যতার স্বর্ণযুগ।",
    keyEvents: [
      { year: '৭৬২ খ্রি.', title: 'বাগদাদ নগরী প্রতিষ্ঠা', desc: "খলিফা মানসুর কর্তৃক গোলাকৃতির 'শান্তির নগরী' বাগদাদ পত্তন।" },
      { year: '৮৩০ খ্রি.', title: 'বায়তুল হিকমাহ গঠন', desc: 'বিজ্ঞান ও অনুবাদ গবেষণার জন্য সর্ববৃহৎ লাইব্রেরি।' }
    ],
    sources: [{ title: 'বাগদাদ ডিউরিং দ্য আব্বাসিদ ক্যালিফেট', author: 'গাই ল্যা স্ট্রেঞ্জ', notes: 'আব্বাসীয় নগর নকশা ও বিবরণ।' }],
    mapPaths: [{ name: 'আব্বাসীয় সাম্রাজ্যের ভূখণ্ড', path: 'M 300,380 L 380,330 L 470,280 L 560,250 L 700,250 L 780,320 L 810,420 L 710,470 L 600,530 L 450,420 L 310,400 Z' }]
  },
  {
    id: 8, name: 'ফাতেমীয় খিলাফাত', subtitle: 'উত্তর আফ্রিকা ও মিশরের ইসমাইলি রাজবংশ',
    dates: '৯০৯ – ১১৭১ খ্রি.', type: 'ফাতেমীয় খিলাফাত', typeCategory: 'খিলাফাত', color: '#EC4899', fillOpacity: 0.65,
    capital: 'মেহদিয়া -> কায়রো', peakArea: '৪১,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['মিশর', 'তিউনিসিয়া', 'লিবিয়া', 'আলজেরিয়া', 'ফিলিস্তিন', 'সিরিয়া'],
    leadership: 'আল-মুইজ, আল-মুস্তানসির',
    overview: 'উত্তর আফ্রিকায় সূচনা হয়ে ৯৬৯ খ্রিষ্টাব্দে মিশর জয় করে। তারা কায়রো নগরী ও আল-আজহার মসজিদ ও বিশ্ববিদ্যালয় প্রতিষ্ঠা করে।',
    keyEvents: [
      { year: '৯৬৯ খ্রি.', title: 'কায়রো শহর প্রতিষ্ঠা', desc: 'সেনাপতি জওহর আল-সিকিল্লি কর্তৃক কায়রোর ভিত্তিপ্রস্তর স্থাপন।' },
      { year: '৯৭০ খ্রি.', title: 'আল-আজহারের প্রতিষ্ঠা', desc: 'আল-আজহার মসজিদ ও ইসলামী বিদ্যাপীঠ নির্মাণ।' }
    ],
    sources: [{ title: 'হিস্ট্রি অফ দ্য ফাতেমিড ক্যালিফেট', author: 'ফারহাদ দফতারি', notes: 'ফাতেমীয় শাসন সংক্রান্ত গ্রন্থ।' }],
    mapPaths: [{ name: 'ফাতেমীয় ভূখণ্ড', path: 'M 220,360 L 300,340 L 430,370 L 490,340 L 540,400 L 540,510 L 460,430 L 300,410 L 220,380 Z' }]
  },
  {
    id: 9, name: 'কর্ডোবা খিলাফাত', subtitle: 'মুসলিম ইউরোপের স্বর্ণালী সভ্যতা ও সংস্কৃতি',
    dates: '৯২৯ – ১০৩১ খ্রি.', type: 'আন্দালুসীয় উমাইয়া', typeCategory: 'খিলাফাত', color: '#F59E0B', fillOpacity: 0.7,
    capital: 'কর্ডোবা (স্পেন)', peakArea: '৬,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['স্পেন', 'পর্তুগাল', 'মরোক্কো (উপকূল)'],
    leadership: 'তৃতীয় আবদুর রহমান, আল-হাকাম দ্বিতীয়',
    overview: 'স্পেনে উমাইয়া বংশের পুনরুত্থান। কর্ডোবা পরিণত হয় তৎকালীন ইউরোপের শিক্ষা, সংস্কৃতি, আলোকসজ্জা ও চিকিৎসার প্রধান রাজধানীতে।',
    keyEvents: [
      { year: '৯২৯ খ্রি.', title: 'স্বাধীন খিলাফাত ঘোষণা', desc: 'তৃতীয় আবদুর রহমান নিজেকে খলিফা ঘোষণা করেন।' },
      { year: '৯৩৬ খ্রি.', title: 'মদীনা আজ-জাহরা রাজপ্রাসাদ', desc: 'কর্ডোবার কাছে বিস্ময়কর প্রাসাদ নগরী নির্মাণ।' }
    ],
    sources: [{ title: 'দ্য অর্নামেন্ট অফ দ্য ওয়ার্ল্ড', author: 'এম. আর. মেনোকাল', notes: 'আন্দালুসের ইউরোপীয় সাংস্কৃতিক প্রভাব।' }],
    mapPaths: [{ name: 'কর্ডোবা খিলাফাত সীমা', path: 'M 160,280 L 220,260 L 245,290 L 230,320 L 175,325 L 155,300 Z' }]
  },
  {
    id: 10, name: 'আলমোহাদ খিলাফাত', subtitle: 'মাগরেব ও আন্দালুসের বার্বার ইসলামী সাম্রাজ্য',
    dates: '১১২১ – ১২৬৯ খ্রি.', type: 'বার্বার খিলাফাত', typeCategory: 'খিলাফাত', color: '#D97706', fillOpacity: 0.65,
    capital: 'মারাকেশ ও সেভিল', peakArea: '২৩,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['মরোক্কো', 'আলজেরিয়া', 'তিউনিসিয়া', 'স্পেন (দক্ষিণাংশ)'],
    leadership: 'ইবনে তুমার্ত, আবদুল মুমিন',
    overview: 'উত্তর আফ্রিকার এটলাস পর্বতমালা থেকে আত্মপ্রকাশ করে সমগ্র মাগরেব এবং দক্ষিণ স্পেনকে একটি সুসংহত শাসনের অধীনে নিয়ে আসে।',
    keyEvents: [{ year: '১১৪৭ খ্রি.', title: 'মারাকেশ দখল', desc: 'আলমোহাদদের নতুন রাজধানীর সাম্রাজ্য বিস্তার।' }],
    sources: [{ title: 'হিস্ট্রি অফ দি আলমোহাদস', author: 'ইবনুল কাত্তান', notes: 'বার্বার শাসকদের ইতিহাস।' }],
    mapPaths: [{ name: 'আলমোহাদ ভূখণ্ড', path: 'M 140,370 L 170,270 L 230,295 L 320,330 L 340,370 L 280,410 L 180,410 Z' }]
  },
  {
    id: 11, name: 'আইয়ুবীয় সালতানাত', subtitle: 'সুলতান সালাহউদ্দিন এবং জেরুজালেম পুনরুদ্ধার',
    dates: '১১৭১ – ১২৬০ খ্রি.', type: 'সালতানাত', typeCategory: 'সালতানাত', color: '#EF4444', fillOpacity: 0.65,
    capital: 'কায়রো / দামেস্ক', peakArea: '২৭,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['মিশর', 'সিরিয়া', 'জর্ডান', 'ফিলিস্তিন', 'ইয়েমেন'],
    leadership: 'সুলতান সালাহউদ্দিন আইয়ুবী',
    overview: 'বীর যোদ্ধা সুলতান সালাহউদ্দিন আইয়ুবী কর্তৃক প্রতিষ্ঠিত। তিনি ক্রুসেডারদের পরাজিত করে ১১৮৭ সালে ঐতিহাসিক জেরুজালেম মুক্ত করেন।',
    keyEvents: [
      { year: '১১৮৭ খ্রি.', title: 'হিত্তিনের যুদ্ধ', desc: 'ক্রুসেডারদের বিরুদ্ধে সালাহউদ্দিনের ঐতিহাসিক বিজয়।' },
      { year: '১১৮৭ খ্রি.', title: 'জেরুজালেম পুনরুদ্ধার', desc: '৮৮ বছর পর মুসলিমদের নিকট জেরুজালেমের প্রত্যাবর্তন।' }
    ],
    sources: [{ title: 'আন-নাওয়াদিরুস সুলতানিয়্যাহ', author: 'বাহাউদ্দিন ইবনে শাদ্দাদ', notes: 'সালাহউদ্দিনের প্রত্যক্ষ জীবনচরিত।' }],
    mapPaths: [{ name: 'আইয়ুবীয় রাজ্য', path: 'M 400,390 L 470,360 L 510,345 L 545,400 L 550,530 L 510,540 L 440,430 Z' }]
  },
  {
    id: 12, name: 'মামলুক সালতানাত', subtitle: 'মঙ্গোলদের প্রতিহতকারী ও পবিত্র দুই মসজিদের রক্ষক',
    dates: '১২৫০ – ১৫১৭ খ্রি.', type: 'সালতানাত', typeCategory: 'সালতানাত', color: '#DC2626', fillOpacity: 0.65,
    capital: 'কায়রো (মিশর)', peakArea: '২১,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['মিশর', 'সিরিয়া', 'জর্ডান', 'ফিলিস্তিন', 'সৌদি আরব (হিজাজ)'],
    leadership: 'সুলতান কুতুজ, রুকনুদ্দিন বাইবার্স',
    overview: 'ঐতিহাসিক আইন জালুতের যুদ্ধে দুর্ধর্ষ মঙ্গোল বাহিনীকে পরাজিত করে সমগ্র মুসলিম বিশ্বকে নিশ্চিত ধ্বংসের হাত থেকে রক্ষা করে।',
    keyEvents: [{ year: '১২৬০ খ্রি.', title: 'আইন জালুতের যুদ্ধ', desc: 'মঙ্গোলদের বিশ্বজয় থামিয়ে দেওয়া অভাবনীয় বিজয়।' }],
    sources: [{ title: 'আল-সুলুক লি-মারিফাত দুয়াল আল-মুলুক', author: 'আল-মাকরিজী', notes: 'মামলুক ইতিহাস।' }],
    mapPaths: [{ name: 'মামলুক ভূখণ্ড', path: 'M 410,390 L 475,355 L 515,350 L 550,420 L 540,510 L 440,420 Z' }]
  },
  {
    id: 13, name: 'উসমানীয় সাম্রাজ্য', subtitle: 'তিন মহাদেশব্যাপী বিস্তৃত সর্বশেষ খিলাফাত সাম্রাজ্য',
    dates: '১২৯৯ – ১৯২২ খ্রি.', type: 'সাম্রাজ্য / খিলাফাত', typeCategory: 'সাম্রাজ্য', color: '#F43F5E', fillOpacity: 0.65,
    capital: 'ইস্তাম্বুল (তুরস্ক)', peakArea: '৫২,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['তুরস্ক', 'গ্রিস', 'বুলগেরিয়া', 'মিশর', 'সিরিয়া', 'ইরাক', 'সৌদি আরব'],
    leadership: 'সুলতান মুহাম্মদ আল-ফাতেহ, সুলাইমান আল-কানুনী',
    overview: '১৪৫৩ সালে ইস্তাম্বুল জয় করে হাজার বছরের বাইজেন্টাইন সাম্রাজ্যের পতন ঘটায়। তারা দীর্ঘ ৬০০ বছর ধরে পূর্ব ইউরোপ, মধ্যপ্রাচ্য ও উত্তর আফ্রিকা শাসন করে।',
    keyEvents: [
      { year: '১৪৫৩ খ্রি.', title: 'কনস্টান্টিনোপল বিজয়', desc: 'সুলতান মুহাম্মদ আল-ফাতেহ কর্তৃক ইস্তাম্বুল বিজয়।' },
      { year: '১৫১৭ খ্রি.', title: 'খিলাফাত গ্রহণ', desc: 'মামলুকদের পর আনুষ্ঠানিকভাবে খিলাফাতের দায়িত্ব গ্রহণ।' }
    ],
    sources: [{ title: 'হিস্ট্রি অফ দি অটোমান এম্পায়ার', author: 'খালিল ইনালসিক', notes: 'উসমানীয় প্রশাসনিক দলিল।' }],
    mapPaths: [{ name: 'উসমানীয় বিশালাকার সাম্রাজ্য', path: 'M 360,240 L 430,220 L 520,250 L 570,300 L 560,370 L 540,480 L 440,400 L 300,380 L 260,340 L 330,260 Z' }]
  },
  {
    id: 14, name: 'মুঘল সাম্রাজ্য', subtitle: 'দক্ষিণ এশিয়ার ইসলামিক স্থাপত্য ও সংস্কৃতির স্বর্ণযুগ',
    dates: '১৫২৬ – ১৮৫৭ খ্রি.', type: 'সাম্রাজ্য', typeCategory: 'সাম্রাজ্য', color: '#14B8A6', fillOpacity: 0.65,
    capital: 'দিল্লি / আগ্রা', peakArea: '৪০,০০,০০০ বর্গ কি.মি.',
    modernCountries: ['ভারত', 'পাকিস্তান', 'বাংলাদেশ', 'আফগানিস্তান (আংশিক)'],
    leadership: 'জহিরুদ্দিন বাবর, আকবর, শাহজাহান, আওরঙ্গজেব',
    overview: 'জহিরুদ্দিন বাবর কর্তৃক প্রতিষ্ঠিত। মুঘল আমলে এই সমৃদ্ধ অঞ্চল ছিল বিশ্ব অর্থনীতির বড় অংশের কেন্দ্র। তাজমহল, লালকেল্লা ও শালিমার গার্ডেন তাদের অমর স্থাপত্য।',
    keyEvents: [
      { year: '১৫২৬ খ্রি.', title: 'পানিপথের প্রথম যুদ্ধ', desc: 'বাবর কর্তৃক ইব্রাহিম লোদীকে পরাজিত করে মুঘল শাসন স্থাপন।' },
      { year: '১৬৩২ খ্রি.', title: 'তাজমহল নির্মাণ শুরু', desc: 'সম্রাট শাহজাহান কর্তৃক বিশ্বখ্যাত স্থাপত্যের নির্মাণ আরম্ভ।' }
    ],
    sources: [{ title: 'বাবরনামা', author: 'সম্রাট বাবর', notes: 'আত্মজীবনী ও ভৌগোলিক বিবরণ।' }],
    mapPaths: [{ name: 'মুঘল ভারতীয় ভূখণ্ড', path: 'M 720,330 L 780,310 L 860,340 L 880,420 L 840,510 L 800,480 L 760,400 Z' }]
  },
  {
    id: 15, name: 'সফবীয় সাম্রাজ্য', subtitle: 'পারস্যের রেনেসাঁ ও শিল্প-স্থাপত্যের চরম উৎকর্ষ',
    dates: '১৫০১ – ১৭৩৬ খ্রি.', type: 'সাম্রাজ্য', typeCategory: 'সাম্রাজ্য', color: '#6366F1', fillOpacity: 0.65,
    capital: 'ইসফাহান (ইরান)', peakArea: '২৮,৫০,০০০ বর্গ কি.মি.',
    modernCountries: ['ইরান', 'আজারবাইজান', 'আরমেনিয়া', 'ইরাক (পূর্বাংশ)', 'তুর্কমেনিস্তান'],
    leadership: 'শাহ ইসমাইল প্রথম, শাহ আব্বাস প্রথম',
    overview: 'পারস্য অঞ্চলে একটি সুসংগঠিত স্বাধীন রাষ্ট্র প্রতিষ্ঠা করে। রাজধানী ইসফাহানকে নিখুঁত নগর পরিকল্পনা ও কারুকাজে বিশ্বের অন্যতম সুন্দর শহরে রূপান্তর করা হয়।',
    keyEvents: [
      { year: '১৫০১ খ্রি.', title: 'তাবরিজ জয়', desc: 'শাহ ইসমাইল প্রথম কর্তৃক সফবীয় সাম্রাজ্যের ভিত্তি স্থাপন।' },
      { year: '১৫৯৮ খ্রি.', title: 'ইসফাহান নগর পরিকল্পনা', desc: 'নাকশে জাহান স্কয়ার ও স্থাপত্য নির্মাণ।' }
    ],
    sources: [{ title: 'দ্য সাফাবিদ এম্পায়ার', author: 'এ. জে. নিউম্যান', notes: 'পারস্যের ইতিহাস গ্রন্থ।' }],
    mapPaths: [{ name: 'সফবীয় পারস্য সীমানা', path: 'M 590,300 L 670,270 L 730,300 L 730,370 L 670,410 L 600,380 Z' }]
  }
];

const LANDMASSES = [
  'M 140,260 L 230,250 L 245,290 L 210,330 L 155,330 Z',
  'M 140,345 L 260,340 L 350,350 L 460,390 L 510,480 L 450,560 L 380,500 L 160,420 Z',
  'M 260,250 L 350,220 L 440,200 L 500,240 L 450,290 L 360,300 L 310,260 Z',
  'M 490,380 L 550,370 L 610,400 L 630,480 L 580,575 L 515,550 L 510,470 Z',
  'M 570,250 L 720,240 L 760,290 L 720,390 L 620,380 Z',
  'M 740,320 L 850,300 L 890,380 L 840,520 L 770,440 Z'
];

const SEA_LABELS = [
  { text: 'আটলান্টিক মহাসাগর', x: 112, y: 330 },
  { text: 'ভূমধ্যসাগর', x: 335, y: 324 },
  { text: 'আরব সাগর', x: 690, y: 545 }
];

const CATEGORIES = [
  { label: 'সবগুলো', val: 'ALL' },
  { label: 'খিলাফাত', val: 'খিলাফাত' },
  { label: 'সালতানাত', val: 'সালতানাত' },
  { label: 'সাম্রাজ্য', val: 'সাম্রাজ্য' }
];

const HOW_TO_STEPS = [
  { t: 'যুগ বেছে নিন', d: 'মানচিত্রের উপরের তালিকা থেকে যেকোনো যুগে ট্যাপ করুন। ঐ যুগের ভূখণ্ড রঙিন হয়ে ফুটে উঠবে।' },
  { t: 'মানচিত্র সরান ও জুম করুন', d: 'আঙুল দিয়ে টেনে সরান, দুই আঙুলে চিমটি কেটে জুম করুন। কম্পিউটারে মাউস ড্র্যাগ ও স্ক্রল চাকা কাজ করে। + − বাটনও ব্যবহার করা যায়।' },
  { t: 'শহরে ট্যাপ করুন', d: 'সোনালি রঙের শহর ঐ যুগের রাজধানী। যেকোনো শহর বা ভূখণ্ডে ট্যাপ করলে ছোট কার্ডে তথ্য দেখা যাবে।' },
  { t: 'নিচের প্যানেলে বিস্তারিত পড়ুন', d: 'নিচের কার্ড উপরে টেনে বা ট্যাপ করে খুলুন। সেখানে বিবরণ, ঘটনাবলী ও তথ্যসূত্র ট্যাব আছে।' },
  { t: 'দুই যুগ তুলনা করুন', d: '"যুগ তুলনা" চালু করে দ্বিতীয় যুগ বেছে নিন। দ্বিতীয় যুগের সীমানা কমলা ড্যাশ রেখায় দেখাবে।' }
];

/* ==========================================
   ৩. সহায়ক ফাংশন
========================================== */
const MIN_K = 0.8;
const MAX_K = 6;
const VIEW = { x: 90, y: 190, w: 830, h: 410 };
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const isCapitalOf = (period, city) => period.capital.includes(city.short);
const GRATICULE_X = [90, 170, 250, 330, 410, 490, 570, 650, 730, 810, 890];
const GRATICULE_Y = [190, 270, 350, 430, 510, 590];

/* ==========================================
   ৪. তথ্য প্যানেল (ডেস্কটপ সাইডবার ও মোবাইল শিট উভয়ে ব্যবহৃত)
========================================== */
function InfoContent({ period, comparePeriod, isCompareMode, activeTab, setActiveTab, onSwap }) {
  const tabs = [
    { id: 'overview', label: 'বিবরণ' },
    { id: 'timeline', label: 'ঘটনাবলী' },
    { id: 'sources', label: 'তথ্যসূত্র' }
  ];

  return (
    <div className="flex flex-col min-h-0">
      {isCompareMode && comparePeriod && (
        <div className="p-3 bg-[#0B1724] border-b border-[#dfbd7b]/40 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[#dfbd7b]">তুলনামূলক তথ্য</span>
            <button
              onClick={onSwap}
              className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-[#1E3350] text-gray-200 border border-gray-700 hover:border-[#dfbd7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
            >
              <IconSwap className="w-3.5 h-3.5" /> অদলবদল
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-[#112236] rounded-lg border border-emerald-500/40">
              <span className="text-emerald-400 font-bold block">{period.name}</span>
              <span className="text-gray-300 block mt-1">আয়তন: {period.peakArea}</span>
              <span className="text-gray-300 block">রাজধানী: {period.capital}</span>
            </div>
            <div className="p-2 bg-[#112236] rounded-lg border border-amber-400/40">
              <span className="text-amber-300 font-bold block">{comparePeriod.name}</span>
              <span className="text-gray-300 block mt-1">আয়তন: {comparePeriod.peakArea}</span>
              <span className="text-gray-300 block">রাজধানী: {comparePeriod.capital}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-px bg-gray-800 text-xs">
        <div className="p-3 bg-[#112236]">
          <span className="text-gray-400 text-[11px] font-bold block">রাজধানী</span>
          <span className="font-bold text-white flex items-center gap-1 mt-1 text-sm">
            <IconCrown className="w-4 h-4 text-[#dfbd7b] shrink-0" /> {period.capital}
          </span>
        </div>
        <div className="p-3 bg-[#112236]">
          <span className="text-gray-400 text-[11px] font-bold block">সর্বোচ্চ বিস্তার</span>
          <span className="font-bold text-emerald-400 mt-1 text-sm block">{period.peakArea}</span>
        </div>
      </div>

      <div className="flex border-b border-gray-800 bg-[#0B1724]" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xs font-bold border-b-2 transition focus-visible:outline-none focus-visible:bg-[#1E3350] ${
              activeTab === tab.id ? 'border-[#dfbd7b] text-[#dfbd7b] bg-[#112236]' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 text-xs">
        {activeTab === 'overview' && (
          <>
            <div>
              <h3 className="text-xs font-bold text-[#dfbd7b] mb-2 flex items-center gap-1.5">
                <IconBook className="w-4 h-4 text-emerald-400" /> সংক্ষিপ্ত বিবরণ
              </h3>
              <p className="text-gray-200 leading-relaxed text-[13px] bg-[#1E3350]/30 p-3.5 rounded-xl border border-gray-800/80">{period.overview}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-300 mb-1.5">শাসনকর্তা ও নেতৃত্ব</h3>
              <p className="text-gray-100 text-[13px] bg-[#1E3350]/30 p-3 rounded-xl border border-gray-800/80 font-semibold">{period.leadership}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-300 mb-2">বর্তমান যেসব দেশ অন্তর্ভুক্ত</h3>
              <div className="flex flex-wrap gap-1.5">
                {period.modernCountries.map((country) => (
                  <span key={country} className="px-2.5 py-1 rounded-md bg-[#1E3350] text-gray-200 border border-gray-700 text-[12px]">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#dfbd7b] mb-3">গুরুত্বপূর্ণ ঐতিহাসিক ঘটনাবলী</h3>
            {period.keyEvents.map((evt) => (
              <div key={evt.year + evt.title} className="relative pl-4 border-l-2 border-[#dfbd7b] space-y-1 pb-2">
                <span className="text-[11px] font-bold text-[#dfbd7b] bg-[#dfbd7b]/10 px-2 py-0.5 rounded border border-[#dfbd7b]/30">{evt.year}</span>
                <h4 className="font-bold text-white text-[13px] mt-1">{evt.title}</h4>
                <p className="text-gray-300 text-[12px] leading-relaxed">{evt.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#dfbd7b] mb-2">ঐতিহাসিক তথ্যসূত্র ও গ্রন্থ</h3>
            {period.sources.map((src) => (
              <div key={src.title} className="bg-[#1E3350]/30 border border-gray-800 p-3.5 rounded-xl space-y-1.5">
                <div className="font-bold text-[#dfbd7b] text-[13px]">{src.title}</div>
                <div className="text-[12px] text-gray-300">লেখক/সংকলক: <span className="text-white font-medium">{src.author}</span></div>
                <p className="text-[12px] text-gray-400 italic bg-[#0B1724] p-2 rounded border border-gray-800">{src.notes}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-800">
          মানচিত্রের সীমানা আনুমানিক ও শিক্ষামূলক চিত্রায়ন; এটি নিখুঁত ভৌগোলিক সীমানা নয়।
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   ৫. মূল কম্পোনেন্ট
========================================== */
export default function KhilafahAtlas() {
  const [selectedPeriodId, setSelectedPeriodId] = useState(1);
  const [comparePeriodId, setComparePeriodId] = useState(null);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [hintVisible, setHintVisible] = useState(true);
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });

  const svgRef = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchDistRef = useRef(0);
  const startPosRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  const currentPeriod = useMemo(
    () => HISTORICAL_PERIODS_BN.find((p) => p.id === selectedPeriodId) || HISTORICAL_PERIODS_BN[0],
    [selectedPeriodId]
  );
  const comparePeriod = useMemo(
    () => HISTORICAL_PERIODS_BN.find((p) => p.id === comparePeriodId) || null,
    [comparePeriodId]
  );

  const filteredEras = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return HISTORICAL_PERIODS_BN.filter((p) => {
      const matchesCategory = categoryFilter === 'ALL' || p.typeCategory === categoryFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const textHit = [p.name, p.capital, p.dates, p.type].some((s) => s.toLowerCase().includes(q));
      const cityHit = HISTORICAL_CITIES_BN.some(
        (c) => (c.name + c.region).toLowerCase().includes(q) && isCapitalOf(p, c)
      );
      return textHit || cityHit;
    });
  }, [searchQuery, categoryFilter]);

  /* নির্বাচিত যুগ স্ক্রোল করে দৃশ্যমান রাখা */
  useEffect(() => {
    const el = document.getElementById(`era-btn-${selectedPeriodId}`);
    if (el) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [selectedPeriodId]);

  /* Esc দিয়ে গাইড বন্ধ */
  useEffect(() => {
    if (!showHelp) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowHelp(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHelp]);

  /* ---------- জুম ও প্যান ---------- */
  const toSvgPoint = useCallback((cx, cy) => {
    const svg = svgRef.current;
    const ctm = svg ? svg.getScreenCTM() : null;
    if (!svg || !ctm) return { x: VIEW.x + VIEW.w / 2, y: VIEW.y + VIEW.h / 2 };
    const pt = svg.createSVGPoint();
    pt.x = cx;
    pt.y = cy;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const unitsPerPx = useCallback(() => {
    const svg = svgRef.current;
    const ctm = svg ? svg.getScreenCTM() : null;
    return ctm && ctm.a ? 1 / ctm.a : 1;
  }, []);

  const zoomAt = useCallback((factor, px, py) => {
    setTransform((prev) => {
      const k = clamp(prev.k * factor, MIN_K, MAX_K);
      const r = k / prev.k;
      return { k, x: px - (px - prev.x) * r, y: py - (py - prev.y) * r };
    });
  }, []);

  const zoomCenter = (factor) => zoomAt(factor, VIEW.x + VIEW.w / 2, VIEW.y + VIEW.h / 2);
  const handleReset = () => setTransform({ k: 1, x: 0, y: 0 });
  const handlePan = (dx, dy) => setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const p = toSvgPoint(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.15 : 0.87, p.x, p.y);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [toSvgPoint, zoomAt]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    setHintVisible(false);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 1) {
      movedRef.current = false;
      startPosRef.current = { x: e.clientX, y: e.clientY };
    } else if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      pinchDistRef.current = Math.hypot(a.x - b.x, a.y - b.y);
      movedRef.current = true;
    }
  };

  const onPointerMove = (e) => {
    const prev = pointersRef.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointersRef.current.set(e.pointerId, cur);

    if (pointersRef.current.size === 1) {
      if (Math.hypot(cur.x - startPosRef.current.x, cur.y - startPosRef.current.y) > 6) movedRef.current = true;
      if (!movedRef.current) return;
      const u = unitsPerPx();
      const dx = (cur.x - prev.x) * u;
      const dy = (cur.y - prev.y) * u;
      setTransform((t) => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDistRef.current > 0 && dist > 0) {
        const mid = toSvgPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
        zoomAt(dist / pinchDistRef.current, mid.x, mid.y);
      }
      pinchDistRef.current = dist;
    }
  };

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchDistRef.current = 0;
  };

  /* ---------- অন্যান্য অ্যাকশন ---------- */
  const toggleCompareMode = () => {
    if (isCompareMode) {
      setIsCompareMode(false);
      setComparePeriodId(null);
    } else {
      setIsCompareMode(true);
      setComparePeriodId(selectedPeriodId === 15 ? 1 : selectedPeriodId + 1);
    }
  };

  const swapPeriods = () => {
    if (!comparePeriodId) return;
    setSelectedPeriodId(comparePeriodId);
    setComparePeriodId(selectedPeriodId);
  };

  const onPickEra = (id) => {
    setSelectedCity(null);
    setActiveRegion(null);
    if (isCompareMode && id !== selectedPeriodId) setComparePeriodId(id);
    else setSelectedPeriodId(id);
  };

  const onCityTap = (e, city) => {
    e.stopPropagation();
    if (movedRef.current) return;
    setActiveRegion(null);
    setSelectedCity(city);
  };

  const onRegionTap = (e, name) => {
    e.stopPropagation();
    if (movedRef.current) return;
    setSelectedCity(null);
    setActiveRegion((prev) => (prev === name ? null : name));
  };

  const k = transform.k;
  const showFullLabels = k >= 1.6;

  const iconBtn =
    'w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#dfbd7b] hover:bg-[#1E3350] rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]';

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#0B1724] text-gray-100 font-sans overflow-hidden select-none">
      <style>{`
        @keyframes atlas-dash { to { stroke-dashoffset: -28; } }
        .atlas-route { animation: atlas-dash 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .atlas-route { animation: none; } }
      `}</style>

      {/* ---------- হেডার ---------- */}
      <header className="flex-none bg-[#112236] border-b border-[#dfbd7b]/30 z-30 shadow-xl">
        <div className="flex items-center justify-between gap-2 px-3 md:px-5 pt-2.5 pb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-xl bg-[#dfbd7b]/20 border border-[#dfbd7b] flex items-center justify-center text-[#dfbd7b]">
              <IconGlobe className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-white leading-tight truncate">খিলাফাত এটলাস</h1>
              <p className="text-[11px] md:text-xs text-gray-400 leading-snug truncate">
                যুগ বেছে নিন, মানচিত্র টেনে দেখুন, শহরে ট্যাপ করে জানুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowRoutes((v) => !v)}
              aria-pressed={showRoutes}
              aria-label="বাণিজ্য পথ দেখান বা লুকান"
              className={`flex items-center gap-1 h-9 px-2.5 rounded-lg border text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                showRoutes ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-[#1E3350] text-gray-400 border-gray-700'
              }`}
            >
              <IconRoute className="w-4 h-4" />
              <span className="hidden sm:inline">বাণিজ্য পথ</span>
            </button>
            <button
              onClick={toggleCompareMode}
              aria-pressed={isCompareMode}
              aria-label="যুগ তুলনা চালু বা বন্ধ"
              className={`flex items-center gap-1 h-9 px-2.5 rounded-lg border text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                isCompareMode ? 'bg-[#dfbd7b] text-gray-950 border-[#dfbd7b]' : 'bg-[#1E3350] text-gray-300 border-gray-700'
              }`}
            >
              <IconCompare className="w-4 h-4" />
              <span>{isCompareMode ? 'তুলনা বন্ধ' : 'যুগ তুলনা'}</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="কীভাবে ব্যবহার করবেন"
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#1E3350] border border-[#dfbd7b]/50 text-[#dfbd7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
            >
              <IconHelp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ফিল্টার ও সার্চ */}
        <div className="flex items-center gap-2 px-3 md:px-5 pb-2">
          <div className="flex items-center bg-[#0B1724] p-1 rounded-lg border border-gray-800 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.val}
                onClick={() => setCategoryFilter(cat.val)}
                aria-pressed={categoryFilter === cat.val}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                  categoryFilter === cat.val ? 'bg-[#dfbd7b] text-gray-950 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="যুগ বা শহর খুঁজুন"
            className="md:hidden h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-[#1E3350] border border-gray-700 text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
          >
            <IconSearch className="w-4 h-4" />
          </button>

          <div className="relative hidden md:block flex-1 max-w-xs">
            <div className="absolute left-2.5 top-2.5 text-gray-400 pointer-events-none">
              <IconSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="যুগ বা শহর খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E3350] text-sm text-gray-200 pl-8 pr-8 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-[#dfbd7b]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="সার্চ মুছুন" className="absolute right-2 top-2 text-gray-400 hover:text-white">
                <IconClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {(searchOpen || searchQuery) && (
          <div className="md:hidden px-3 pb-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
                <IconSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="যুগ বা শহর খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E3350] text-base text-gray-200 pl-9 pr-9 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#dfbd7b]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} aria-label="সার্চ মুছুন" className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white">
                  <IconClose className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* টাইমলাইন স্ক্রোলার */}
        <div className="bg-[#060D14]/90 border-t border-gray-800">
          {filteredEras.length === 0 ? (
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-gray-300">
              <span>কোনো যুগ পাওয়া যায়নি।</span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('ALL');
                }}
                className="px-3 py-1.5 rounded-md bg-[#dfbd7b] text-gray-950 font-bold"
              >
                ফিল্টার মুছুন
              </button>
            </div>
          ) : (
            <div className="flex gap-2 px-3 py-2 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              {filteredEras.map((period) => {
                const isSelected = period.id === selectedPeriodId;
                const isComparing = period.id === comparePeriodId;
                return (
                  <button
                    key={period.id}
                    id={`era-btn-${period.id}`}
                    onClick={() => onPickEra(period.id)}
                    aria-pressed={isSelected}
                    className={`snap-start shrink-0 w-[158px] md:w-[190px] flex flex-col text-left px-3 py-2 rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                      isSelected
                        ? 'bg-[#dfbd7b]/20 border-[#dfbd7b] text-white'
                        : isComparing
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-[#112236] border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: period.color }} />
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#dfbd7b]' : ''}`}>{period.name}</span>
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1">{period.dates}</span>
                    {isComparing && <span className="text-[10px] font-bold text-amber-300 mt-0.5">তুলনার যুগ</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {isCompareMode && (
          <div className="px-4 py-1.5 text-[11px] text-amber-200 bg-amber-500/10 border-t border-amber-400/30">
            তুলনা চালু: তালিকা থেকে দ্বিতীয় যুগ বেছে নিন। তার সীমানা কমলা ড্যাশ রেখায় দেখাবে।
          </div>
        )}
      </header>

      {/* ---------- মূল এলাকা ---------- */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* মানচিত্র */}
        <div className="relative flex-1 min-h-0 min-w-0 bg-[#060D14] overflow-hidden">
          {/* লিজেন্ড */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 max-w-[62%] md:max-w-xs">
            <div className="bg-[#112236]/90 backdrop-blur border border-[#dfbd7b]/40 rounded-xl px-3 py-2 shadow-xl text-xs">
              <div className="hidden md:flex items-center gap-1.5 mb-1.5 font-bold text-[#dfbd7b]">
                <IconLayers className="w-4 h-4" /> মানচিত্রের নির্দেশিকা
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm border border-[#dfbd7b] shrink-0" style={{ backgroundColor: currentPeriod.color }} />
                <span className="text-gray-100 font-semibold truncate">{currentPeriod.name}</span>
              </div>
              {isCompareMode && comparePeriod && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3 h-3 rounded-sm border border-dashed border-amber-400 shrink-0" style={{ backgroundColor: comparePeriod.color }} />
                  <span className="text-amber-300 font-semibold truncate">{comparePeriod.name}</span>
                </div>
              )}
              <div className="hidden md:flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dfbd7b] border border-gray-900" /> রাজধানী
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] border border-gray-900 ml-2" /> অন্যান্য শহর
              </div>
              {showRoutes && (
                <div className="hidden md:flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span className="w-5 border-t-2 border-dashed border-[#dfbd7b]" /> রেশম পথ ও বাণিজ্য পথ
                </div>
              )}
            </div>
          </div>

          {/* জুম কন্ট্রোল */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col gap-2">
            <div className="bg-[#112236]/90 backdrop-blur border border-[#dfbd7b]/40 rounded-xl p-1 flex flex-col shadow-xl">
              <button onClick={() => zoomCenter(1.3)} aria-label="জুম ইন" className={iconBtn}>
                <IconZoomIn className="w-5 h-5" />
              </button>
              <button onClick={() => zoomCenter(0.77)} aria-label="জুম আউট" className={iconBtn}>
                <IconZoomOut className="w-5 h-5" />
              </button>
              <div className="h-px bg-gray-800 my-0.5" />
              <button onClick={handleReset} aria-label="মানচিত্র রিসেট করুন" className={iconBtn}>
                <IconReset className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden lg:grid bg-[#112236]/90 backdrop-blur border border-gray-800 rounded-xl p-1.5 grid-cols-3 gap-1 shadow-xl text-gray-400 w-28">
              <div />
              <button onClick={() => handlePan(0, 40)} aria-label="উপরে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▲</button>
              <div />
              <button onClick={() => handlePan(40, 0)} aria-label="বামে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">◀</button>
              <button onClick={handleReset} aria-label="কেন্দ্রে ফিরুন" className="p-1.5 hover:text-[#dfbd7b] hover:bg-[#1E3350] rounded">●</button>
              <button onClick={() => handlePan(-40, 0)} aria-label="ডানে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▶</button>
              <div />
              <button onClick={() => handlePan(0, -40)} aria-label="নিচে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▼</button>
              <div />
            </div>
          </div>

          {/* SVG মানচিত্র */}
          <svg
            ref={svgRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="ইসলামী খিলাফাত ও সাম্রাজ্যের ইন্টারঅ্যাকটিভ মানচিত্র"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onClick={() => {
              if (movedRef.current) return;
              setSelectedCity(null);
              setActiveRegion(null);
            }}
          >
            <defs>
              <radialGradient id="ocean-grad" cx="50%" cy="45%" r="75%">
                <stop offset="0%" stopColor="#10243A" />
                <stop offset="100%" stopColor="#060D14" />
              </radialGradient>
              <linearGradient id="land-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#23405F" />
                <stop offset="100%" stopColor="#162B44" />
              </linearGradient>
              <linearGradient id="terr-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={currentPeriod.color} stopOpacity={Math.min(currentPeriod.fillOpacity + 0.2, 0.95)} />
                <stop offset="100%" stopColor={currentPeriod.color} stopOpacity={currentPeriod.fillOpacity - 0.15} />
              </linearGradient>
              <linearGradient id="compare-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={comparePeriod ? comparePeriod.color : '#FBBF24'} stopOpacity="0.5" />
                <stop offset="100%" stopColor={comparePeriod ? comparePeriod.color : '#FBBF24'} stopOpacity="0.25" />
              </linearGradient>
              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#ocean-grad)" />

            <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
              {/* অক্ষাংশ-দ্রাঘিমা রেখা */}
              <g stroke="#1E3350" strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke">
                {GRATICULE_X.map((x) => (
                  <line key={`gx${x}`} x1={x} y1="150" x2={x} y2="640" vectorEffect="non-scaling-stroke" />
                ))}
                {GRATICULE_Y.map((y) => (
                  <line key={`gy${y}`} x1="60" y1={y} x2="960" y2={y} vectorEffect="non-scaling-stroke" />
                ))}
              </g>

              {/* স্থলভাগ */}
              <g>
                {LANDMASSES.map((d) => (
                  <path
                    key={d}
                    d={d}
                    fill="url(#land-grad)"
                    stroke="#3A5C85"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>

              {/* সাগরের নাম */}
              <g fill="#4A6A91" fontStyle="italic" className="pointer-events-none">
                {SEA_LABELS.map((s) => (
                  <text key={s.text} x={s.x} y={s.y} fontSize={10 / Math.sqrt(k)}>
                    {s.text}
                  </text>
                ))}
              </g>

              {/* বাণিজ্য পথ */}
              {showRoutes && (
                <g fill="none" className="pointer-events-none">
                  {SILK_ROAD_ROUTES.map((route) => (
                    <path
                      key={route}
                      d={route}
                      className="atlas-route"
                      stroke="#dfbd7b"
                      strokeWidth="1.6"
                      strokeDasharray="6 8"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              )}

              {/* তুলনার ভূখণ্ড */}
              {isCompareMode && comparePeriod && (
                <g className="pointer-events-none">
                  {comparePeriod.mapPaths.map((poly) => (
                    <path
                      key={`cmp-${poly.name}`}
                      d={poly.path}
                      fill="url(#compare-grad)"
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              )}

              {/* নির্বাচিত যুগের ভূখণ্ড */}
              <g filter="url(#soft-glow)">
                {currentPeriod.mapPaths.map((poly) => (
                  <path
                    key={`pri-${poly.name}`}
                    d={poly.path}
                    fill="url(#terr-grad)"
                    stroke="#dfbd7b"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer"
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') setActiveRegion(poly.name);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === 'mouse') setActiveRegion(null);
                    }}
                    onClick={(e) => onRegionTap(e, poly.name)}
                  />
                ))}
              </g>

              {/* শহর ও রাজধানী */}
              {HISTORICAL_CITIES_BN.map((city) => {
                const isCapital = isCapitalOf(currentPeriod, city);
                const isSelected = selectedCity && selectedCity.id === city.id;
                const showLabel = isCapital || isSelected || showFullLabels;
                return (
                  <g
                    key={city.id}
                    transform={`translate(${city.coords.x} ${city.coords.y})`}
                    className="cursor-pointer"
                    onClick={(e) => onCityTap(e, city)}
                  >
                    <circle r={16 / k} fill="transparent" />
                    {isCapital && (
                      <circle r={9 / k} fill="none" stroke="#dfbd7b" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
                        <animate attributeName="r" values={`${8 / k};${17 / k};${8 / k}`} dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={(isCapital ? 6 : 4.2) / k}
                      fill={isCapital ? '#dfbd7b' : '#34D399'}
                      stroke={isSelected ? '#FFFFFF' : '#0B1724'}
                      strokeWidth={1.8 / k}
                    />
                    {showLabel && (
                      <text
                        x={9 / k}
                        y={4 / k}
                        fontSize={(isCapital ? 12 : 10.5) / k}
                        fontWeight={isCapital ? 700 : 500}
                        fill={isCapital ? '#dfbd7b' : '#E5E7EB'}
                        stroke="#060D14"
                        strokeWidth={3 / k}
                        strokeLinejoin="round"
                        style={{ paintOrder: 'stroke' }}
                        className="pointer-events-none"
                      >
                        {city.short}
                        {isCapital ? ' 👑' : ''}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* ব্যবহার-ইঙ্গিত */}
          {hintVisible && !selectedCity && !activeRegion && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-max max-w-[92%]">
              <div className="bg-[#112236]/90 border border-[#dfbd7b]/40 text-[#dfbd7b] text-[11px] md:text-xs font-medium rounded-full px-3.5 py-1.5 text-center">
                টেনে সরান · দুই আঙুলে জুম · শহরে ট্যাপ করুন
              </div>
            </div>
          )}

          {/* শহর বা অঞ্চলের কার্ড */}
          {(selectedCity || activeRegion) && (
            <div className="absolute bottom-3 left-3 right-3 md:right-auto md:bottom-6 md:left-6 z-20 bg-[#112236]/95 border border-[#dfbd7b]/50 backdrop-blur rounded-xl p-3.5 text-xs md:max-w-xs shadow-2xl">
              {selectedCity ? (
                <div>
                  <div className="flex items-start justify-between gap-2 font-bold text-[#dfbd7b] text-sm mb-1">
                    <span className="flex items-center gap-1.5">
                      <IconMapPin className="w-4 h-4 text-emerald-400 shrink-0" /> {selectedCity.name}
                    </span>
                    <button onClick={() => setSelectedCity(null)} aria-label="কার্ড বন্ধ করুন" className="text-gray-400 hover:text-white p-1 -m-1">
                      <IconClose className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-200 mt-1 leading-relaxed text-[13px]">{selectedCity.significance}</p>
                  <div className="text-[11px] text-gray-400 mt-2 pt-1.5 border-t border-gray-800">
                    অঞ্চল: <strong className="text-gray-300">{selectedCity.region}</strong>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-2 font-bold text-[#dfbd7b] text-sm">
                    <span className="flex items-center gap-1.5">
                      <IconLayers className="w-4 h-4 text-emerald-400 shrink-0" /> {activeRegion}
                    </span>
                    <button onClick={() => setActiveRegion(null)} aria-label="কার্ড বন্ধ করুন" className="text-gray-400 hover:text-white p-1 -m-1">
                      <IconClose className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[12px] text-gray-300 mt-1">{currentPeriod.name}-এর অধীনে ঐতিহাসিক সীমানা।</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ডেস্কটপ সাইডবার */}
        <aside className="hidden lg:flex flex-col w-96 bg-[#112236] border-l border-[#dfbd7b]/30 z-20 shadow-2xl min-h-0">
          <div className="p-4 border-b border-gray-800 bg-[#1E3350]/30 flex-none">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#dfbd7b]/15 text-[#dfbd7b] border border-[#dfbd7b]/30">{currentPeriod.type}</span>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <IconCalendar className="w-3.5 h-3.5 text-emerald-400" /> {currentPeriod.dates}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2 leading-tight">{currentPeriod.name}</h2>
            <p className="text-xs text-[#dfbd7b] font-medium mt-1">{currentPeriod.subtitle}</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <InfoContent
              period={currentPeriod}
              comparePeriod={comparePeriod}
              isCompareMode={isCompareMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSwap={swapPeriods}
            />
          </div>
        </aside>

        {/* মোবাইল বটম শিট */}
        <section className="lg:hidden flex-none bg-[#112236] border-t-2 border-[#dfbd7b]/60 rounded-t-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom)]">
          <button
            onClick={() => setSheetOpen((v) => !v)}
            aria-expanded={sheetOpen}
            className="w-full px-4 pt-2 pb-3 text-left focus-visible:outline-none focus-visible:bg-[#1E3350]/50 rounded-t-2xl"
          >
            <span className="block mx-auto w-10 h-1 rounded-full bg-gray-600 mb-2" />
            <span className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white truncate">{currentPeriod.name}</span>
                <span className="block text-[11px] text-[#dfbd7b] truncate">{currentPeriod.subtitle}</span>
                <span className="block text-[11px] text-gray-400 mt-0.5 truncate">
                  {currentPeriod.dates} · রাজধানী: {currentPeriod.capital}
                </span>
              </span>
              <span className="shrink-0 flex flex-col items-center text-[10px] text-gray-400 gap-0.5">
                <IconChevron className={`w-5 h-5 text-[#dfbd7b] transition-transform ${sheetOpen ? 'rotate-180' : ''}`} />
                {sheetOpen ? 'বন্ধ' : 'বিস্তারিত'}
              </span>
            </span>
          </button>
          {sheetOpen && (
            <div className="max-h-[50dvh] overflow-y-auto border-t border-gray-800">
              <InfoContent
                period={currentPeriod}
                comparePeriod={comparePeriod}
                isCompareMode={isCompareMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSwap={swapPeriods}
              />
            </div>
          )}
        </section>
      </div>

      {/* ---------- ব্যবহার-নির্দেশিকা মডাল ---------- */}
      {showHelp && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm sm:p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-help-title"
            className="w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-[#112236] border border-[#dfbd7b]/50 rounded-t-3xl sm:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 p-5 border-b border-gray-800">
              <div>
                <h2 id="atlas-help-title" className="text-lg font-bold text-white">খিলাফাত এটলাস</h2>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  নবী করীম ﷺ-এর যুগ থেকে সফবীয় সাম্রাজ্য পর্যন্ত ১৫টি যুগের ভূখণ্ড, রাজধানী, ঘটনা ও তথ্যসূত্র মানচিত্রে দেখুন।
                </p>
              </div>
              <button onClick={() => setShowHelp(false)} aria-label="গাইড বন্ধ করুন" className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white shrink-0">
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-bold text-[#dfbd7b] mb-3">কীভাবে ব্যবহার করবেন</h3>
              <ol className="space-y-3">
                {HOW_TO_STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[#dfbd7b]/20 border border-[#dfbd7b]/60 text-[#dfbd7b] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[13px] font-bold text-white">{s.t}</span>
                      <span className="block text-[12px] text-gray-300 leading-relaxed mt-0.5">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                মানচিত্রের সীমানা আনুমানিক ও শিক্ষামূলক চিত্রায়ন। এই গাইড পরে খুলতে উপরের ডানের ? বাটনে ট্যাপ করুন।
              </p>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 py-3 rounded-xl bg-[#dfbd7b] text-gray-950 font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                বুঝেছি, শুরু করি
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
