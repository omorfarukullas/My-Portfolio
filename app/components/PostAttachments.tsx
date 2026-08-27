import { RADIUS, StickyTag } from './HandDrawn';

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
        <div style={{
            background: 'var(--bg-postit)',
            border: '2.5px solid #2d2d2d',
            borderRadius: RADIUS.wobbly,
            padding: '1.75rem',
            boxShadow: '4px 4px 0px #2d2d2d',
            margin: '2.5rem 0',
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <StickyTag color="coral" rotate={-1} style={{ marginBottom: '0.35rem' }}>
                    📎 Downloads &amp; Resources
                </StickyTag>
                <h3 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.45rem', fontWeight: 700, margin: '0.2rem 0', color: '#2d2d2d' }}>
                    Attached Research Files &amp; Media
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                {attachments.map((att, idx) => (
                    <a
                        key={idx}
                        href={att.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={att.file_name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: '#ffffff',
                            border: '2px solid #2d2d2d',
                            borderRadius: RADIUS.wobblySm,
                            padding: '0.75rem 1rem',
                            boxShadow: '2px 2px 0px #2d2d2d',
                            textDecoration: 'none',
                            color: '#2d2d2d',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '4px 4px 0px #2d2d2d';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '2px 2px 0px #2d2d2d';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
                            <span style={{ fontSize: '1.5rem' }}>📄</span>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.1rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {att.file_name}
                                </div>
                                {att.file_size && (
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                        {att.file_size}
                                    </div>
                                )}
                            </div>
                        </div>

                        <span style={{
                            padding: '0.2rem 0.6rem',
                            background: 'var(--bg-elevated)',
                            border: '1.5px solid #2d2d2d',
                            borderRadius: RADIUS.wobblySm,
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            flexShrink: 0,
                            marginLeft: '0.5rem',
                        }}>
                            Download ⬇️
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
