import { RADIUS, Thumbtack } from './HandDrawn';

interface CommentData {
    id: string;
    author_name: string;
    content: string;
    created_at: string;
}

export default function CommentsList({ comments }: { comments: CommentData[] }) {
    if (!comments || comments.length === 0) {
        return (
            <div style={{
                background: '#ffffff',
                border: '2px dashed #2d2d2d',
                borderRadius: RADIUS.wobblySm,
                padding: '1.5rem',
                textAlign: 'center',
                fontFamily: 'Patrick Hand, cursive',
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                marginTop: '1.5rem',
            }}>
                No comments posted yet. Be the first to share your thoughts above! ✍️
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
            {comments.map((comment, index) => (
                <div
                    key={comment.id || index}
                    style={{
                        position: 'relative',
                        background: '#ffffff',
                        border: '2px solid #2d2d2d',
                        borderRadius: RADIUS.wobblySm,
                        padding: '1.25rem 1.5rem',
                        boxShadow: '3px 3px 0px #2d2d2d',
                        transform: index % 2 === 0 ? 'rotate(-0.4deg)' : 'rotate(0.4deg)',
                    }}
                >
                    <Thumbtack color={index % 2 === 0 ? '#ff4d4d' : '#2d5da1'} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', borderBottom: '1px dashed #2d2d2d', paddingBottom: '0.35rem' }}>
                        <strong style={{ fontFamily: 'Kalam, cursive', fontSize: '1.2rem', color: '#2d2d2d' }}>
                            {comment.author_name}
                        </strong>
                        <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {new Date(comment.created_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    <p style={{
                        fontFamily: 'Patrick Hand, cursive',
                        fontSize: '1.1rem',
                        lineHeight: 1.5,
                        color: '#333333',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                    }}>
                        {comment.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
