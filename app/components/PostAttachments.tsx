'use client';

import { TealBadge } from './WisprPrimitives';

export interface Attachment {
  id?: string;
  file_url: string;
  file_name: string;
  file_type?: string;
  file_size?: string;
}

export default function PostAttachments({ attachments }: { attachments: Attachment[] }) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div
      className="card-cream my-10"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div className="mb-6 flex flex-col gap-2">
        <TealBadge>Research Media &amp; Files</TealBadge>
        <h3
          className="text-2xl sm:text-3xl text-[#1a1a1a]"
          style={{ fontFamily: 'var(--font-eb-garamond)' }}
        >
          Artifacts &amp; Datasets
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attachments.map((att, idx) => (
          <a
            key={idx}
            href={att.file_url}
            target="_blank"
            rel="noopener noreferrer"
            download={att.file_name}
            className="flex items-center justify-between p-4 bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-xl hover:bg-[#e4e4d0] transition-colors group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-xl">📄</span>
              <div className="overflow-hidden">
                <div className="font-semibold text-sm text-[#1a1a1a] truncate">
                  {att.file_name}
                </div>
                {att.file_size && (
                  <div className="text-xs text-[#8a8a80]">
                    {att.file_size}
                  </div>
                )}
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-[#1a1a1a] text-[#ffffeb] rounded-lg shrink-0 ml-3 group-hover:bg-[#034f46] transition-colors">
              Download ↓
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
