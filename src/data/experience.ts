export type Role = {
  number: string;
  title: string;
  company: string;
  employment: string;
  period: string;
  duration: string;
  industry: string;
  focus?: string;
  points: string[];
};

export const ROLES: Role[] = [
  {
    number: '01',
    title: 'Consultant, SAP MM',
    company: 'PTT Digital Solutions',
    employment: 'Contract',
    period: 'Sep 2022 — Present',
    duration: '3 yrs 11 mos',
    industry: 'Oil & Gas — PTTEP',
    focus: 'Procure to Pay · Plan to Repair',
    points: [
      'Support and enhance Fiori UI5 applications in a live production landscape.',
      'Gather requirements from business users, investigate, define a delivery plan, and author the functional specification.',
      'Write test scripts, run unit tests, and support users through acceptance testing.',
      'Produce end-user training guides and hand over documentation.',
      'Debug programs and functions to isolate root causes and resolve incidents.',
    ],
  },
  {
    number: '02',
    title: 'Consultant, SAP MM',
    company: 'IT One',
    employment: 'Full-time',
    period: 'Nov 2021 — Aug 2022',
    duration: '10 mos',
    industry: 'Healthcare · Steel',
    focus: 'ECC to S/4HANA re-implementation · SAP to non-SAP integration',
    points: [
      'Delivered a full-cycle re-implementation from SAP ECC to S/4HANA for a healthcare client.',
      'Ran requirement gathering and produced functional documents for both programmes.',
      'Designed custom programs and reports against business requirements.',
      'Configured MM master data and handled data migration and conversion.',
      'Integrated SAP with an external e-signing platform alongside the non-SAP team.',
    ],
  },
  {
    number: '03',
    title: 'Consultant, SAP MM',
    company: 'Deloitte Consulting',
    employment: 'Full-time',
    period: 'May 2021 — Oct 2021',
    duration: '6 mos',
    industry: 'Printing — Konica Minolta',
    focus: 'ECC to S/4HANA upgrade across four countries',
    points: [
      'Supported users across Konica Minolta Singapore, Malaysia, Vietnam, and Thailand.',
      'Translated service requests into investigations, delivery plans, and functional specifications.',
      'Authored test scripts, executed unit tests, and supported user acceptance testing.',
      'Created training guides for a multi-country user base.',
      'Debugged programs and functions to trace and resolve errors.',
    ],
  },
  {
    number: '04',
    title: 'Functional Consultant, SAP MM',
    company: 'Home Product Center',
    employment: 'Full-time',
    period: 'Jul 2016 — Apr 2021',
    duration: '4 yrs 10 mos',
    industry: 'Retail — Bangkok, Thailand',
    focus: 'Materials Management · Replenishment',
    points: [
      'Turned user requirements into functional documents for the development team.',
      'Configured the Materials Management module and verified ABAP fixes through testing.',
      'Managed authorisation across organisation levels, roles, parameters, and user AD.',
      'Set up and monitored batch jobs supporting the replenishment process.',
      'Transferred knowledge to both the internal team and end users.',
    ],
  },
];
