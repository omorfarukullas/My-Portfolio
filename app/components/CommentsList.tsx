interface CommentData {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function CommentsList({ comments }: { comments: CommentData[] }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-2xl p-8 text-center text-[#8a8a80] text-sm mt-6">
        No comments recorded yet. Be the first to share your notes above.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6" style={{ fontFamily: 'var(--font-figtree)' }}>
      {comments.map((comment, index) => (
        <div
          key={comment.id || index}
          className="card-cream p-6 border-2 border-[#1a1a1a] rounded-2xl flex flex-col gap-3"
        >
          <div className="flex items-center justify-between border-b border-[#e4e4d0] pb-2 text-sm">
            <span className="font-semibold text-[#1a1a1a]">
              {comment.author_name}
            </span>
            <span className="text-xs text-[#8a8a80]">
              {new Date(comment.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <p className="text-base text-[#222222] leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
