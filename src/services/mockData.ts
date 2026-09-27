/**
 * Initial static/sample data matching demo-dashboard.png
 */
import type { ChatMessage, ConversationSummary, IndexedDocument } from '../types/contracts';

export const INITIAL_CONVERSATIONS: ConversationSummary[] = [
  {
    id: 'conv-1',
    title: 'Spindle vibration on CNC-05',
    dateGroup: 'Today',
    timestamp: '10:24 AM',
    lastMessageSnippet: 'Recommended steps to troubleshoot spindle vibration...',
  },
  {
    id: 'conv-2',
    title: 'Lockout Tagout procedure',
    dateGroup: 'Today',
    timestamp: '9:15 AM',
    lastMessageSnippet: 'OSHA standard 1910.147 energy isolation rules...',
  },
  {
    id: 'conv-3',
    title: 'Tool change error alarm',
    dateGroup: 'Today',
    timestamp: '8:40 AM',
    lastMessageSnippet: 'Alarm 2038 tool carousel recovery steps...',
  },
  {
    id: 'conv-4',
    title: 'Coolant maintenance steps',
    dateGroup: 'Today',
    timestamp: '8:05 AM',
    lastMessageSnippet: 'Refractometer concentration checks and sump cleaning...',
  },
  {
    id: 'conv-5',
    title: 'SINUMERIK 828D parameter',
    dateGroup: 'Yesterday',
    timestamp: '4:15 PM',
    lastMessageSnippet: 'Feed drive acceleration parameters 32300...',
  },
  {
    id: 'conv-6',
    title: 'Preventive maintenance plan',
    dateGroup: 'Yesterday',
    timestamp: '2:30 PM',
    lastMessageSnippet: 'Quarterly mechanical inspection schedule...',
  },
];

export const INITIAL_PDF_LIBRARY: IndexedDocument[] = [
  {
    id: 'doc-1',
    title: 'Haas Mill Operator Manual.pdf',
    filename: 'Haas Mill Operator Manual.pdf',
    sizeBytes: 25165824,
    sizeFormatted: '24 MB',
    dateAdded: 'Feb 12, 2024',
    pageCount: 384,
    manufacturer: 'Haas Automation',
    documentType: 'Operator Manual',
    isIndexed: true,
  },
  {
    id: 'doc-2',
    title: 'OSHA Lockout Tagout.pdf',
    filename: 'OSHA Lockout Tagout.pdf',
    sizeBytes: 3250585,
    sizeFormatted: '3.1 MB',
    dateAdded: 'Jan 18, 2024',
    pageCount: 42,
    manufacturer: 'OSHA',
    documentType: 'Safety Standard',
    isIndexed: true,
  },
  {
    id: 'doc-3',
    title: 'SINUMERIK 828D Manual.pdf',
    filename: 'SINUMERIK 828D Manual.pdf',
    sizeBytes: 18874368,
    sizeFormatted: '18 MB',
    dateAdded: 'Jan 10, 2024',
    pageCount: 612,
    manufacturer: 'Siemens',
    documentType: 'CNC Reference',
    isIndexed: true,
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'What are the recommended steps to troubleshoot spindle vibration on CNC-05 (SHAFT-A)? Check our manuals for Haas and any relevant maintenance procedures.',
    timestamp: '10:24 AM',
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: `Based on the information in your manuals, here are the recommended steps to troubleshoot spindle vibration on CNC-05 (SHAFT-A):

1. **Check tool and toolholder**
   Verify the tool is properly seated and free of damage. Clean the taper and inspect for wear or chips. Ensure the pull stud and toolholder meet Haas specifications. [1]

2. **Inspect spindle runout**
   Measure spindle runout using a dial indicator. Compare to the tolerance specified in the Haas Mill Operator Manual (≤ 0.0002" TIR for most spindles). [1]

3. **Check balance and speed settings**
   Ensure the tool is balanced for the operating speed. Reduce RPM to see if vibration decreases. Review recommended speed ranges for your tool type. [1]

4. **Inspect for mechanical issues**
   Check for bearing noise, looseness, or unusual heat. Verify spindle lubrication and maintenance schedule in the manual. [1] [3]

5. **Confirm machine condition**
   Review recent maintenance logs and check for any open alarms related to the spindle drive or servo system. [3]

If the vibration persists after these checks, the manual recommends contacting Haas Service and providing spindle runout measurements and alarm history.`,
    timestamp: '10:24 AM',
    status: 'pass',
    citations: [
      {
        citation_number: 1,
        evidence_id: 'ev-haas-174',
        document_title: 'Haas Mill Operator Manual',
        page_number: 174,
        snippet: 'Spindle runout specification is ≤ 0.0002" TIR. Inspect toolholder, taper, and pull stud for damage or wear...',
        section: 'Spindle Maintenance & Inspection',
      },
      {
        citation_number: 2,
        evidence_id: 'ev-osha-12',
        document_title: 'OSHA Lockout Tagout',
        page_number: 12,
        snippet: 'Follow lockout/tagout procedures before performing any spindle maintenance... Verify zero energy state...',
        section: 'Energy Isolation Protocols',
      },
      {
        citation_number: 3,
        evidence_id: 'ev-sinumerik-214',
        document_title: 'SINUMERIK 828D Manual',
        page_number: 214,
        snippet: 'Spindle vibration can be caused by unbalanced tools, incorrect speed settings, or mechanical issues. Check servo alarms...',
        section: 'Diagnostics & Troubleshooting',
      },
    ],
    reasoning: {
      observations: [
        'CNC-05 telemetry exhibits elevated RMS vibration in the 2,500 - 4,000 RPM range during SHAFT-A operations.',
        'Spindle taper runout check is the primary baseline test documented in Haas Service Section 8.4.',
      ],
      possible_causes: [
        'Toolholder taper fretting or insufficient drawbar retention force.',
        'Imbalanced cutter assembly for current machining feed/speed regimen.',
        'Early-stage spindle bearing fatigue or cage degradation.',
      ],
      recommended_checks: [
        'Clean spindle internal taper and inspect retention pull stud with blue layout gauge.',
        'Run radial dial test indicator on spindle nose test arbor (limit ≤ 0.0002" TIR).',
        'Verify LOTO isolation before manually rotating spindle to check for axial play.',
      ],
      missing_information: [
        'Specific toolholder assembly ID and current drawbar pull force measurement.',
      ],
    },
    evidenceBundle: [
      {
        evidence_id: 'ev-haas-174',
        evidence_type: 'DOCUMENT',
        summary: 'Spindle runout specification is ≤ 0.0002" TIR. Inspect toolholder, taper, and pull stud.',
        provenance: {
          document_title: 'Haas Mill Operator Manual',
          page_number: 174,
          section_title: 'Spindle Maintenance',
        },
      },
      {
        evidence_id: 'ev-osha-12',
        evidence_type: 'DOCUMENT',
        summary: 'Lockout/tagout energy isolation protocol before servicing mechanical drivetrains.',
        provenance: {
          document_title: 'OSHA Lockout Tagout',
          page_number: 12,
        },
      },
      {
        evidence_id: 'ev-sinumerik-214',
        evidence_type: 'DOCUMENT',
        summary: 'Siemens SINUMERIK 828D drive telemetry and alarm diagnostic thresholds.',
        provenance: {
          document_title: 'SINUMERIK 828D Manual',
          page_number: 214,
        },
      },
    ],
  },
];
