'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { RADIUS, TapeStrip, StickyTag, Thumbtack } from '@/app/components/WisprPrimitives';

interface AttachmentItem {
    file_url: string;
    file_name: string;
    file_type?: string;
    file_size?: string;
}

interface PostItem {
    id?: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    featured_image_url?: string;
    featured?: boolean;
    published: boolean;
    created_at?: string;
    read_time?: number;
    attachments?: AttachmentItem[];
}

interface CommentItem {
    id: string;
    post_slug: string;
    author_name: string;
    author_email?: string;
    content: string;
    approved: boolean;
    created_at: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [tab, setTab] = useState<'posts' | 'editor' | 'comments'>('posts');
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Editor state
    const [editingSlug, setEditingSlug] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [featured, setFeatured] = useState(false);
    const [published, setPublished] = useState(true);
    const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
    const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

    // Upload & Form Status
    const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
    const [uploadingAttachment, setUploadingAttachment] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
    const bodyImageInputRef = useRef<HTMLInputElement>(null);
    const coverImageInputRef = useRef<HTMLInputElement>(null);
    const attachmentInputRef = useRef<HTMLInputElement>(null);

    // Fetch posts and comments on load
    const fetchData = async () => {
        setLoading(true);
        try {
            const [postsRes, commentsRes] = await Promise.all([
                fetch('/api/blog'),
                fetch('/api/admin/comments'),
            ]);

            if (postsRes.ok) {
                const pData = await postsRes.json();
                setPosts(pData.posts || []);
            }
            if (commentsRes.ok) {
                const cData = await commentsRes.json();
                setComments(cData.comments || []);
            }
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Logout
    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    // Reset Form for New Post
    const handleStartNewPost = () => {
        setEditingSlug(null);
        setTitle('');
        setSlug('');
        setDescription('');
        setTags('');
        setContent('');
        setCoverImage('');
        setFeatured(false);
        setPublished(true);
        setAttachments([]);
        setFormStatus('idle');
        setStatusMessage('');
        setTab('editor');
    };

    // Load Post for Editing
    const handleEditPost = (post: PostItem) => {
        setEditingSlug(post.slug);
        setTitle(post.title);
        setSlug(post.slug);
        setDescription(post.description || '');
        setTags(Array.isArray(post.tags) ? post.tags.join(', ') : '');
        setContent(post.content || '');
        setCoverImage(post.featured_image_url || '');
        setFeatured(Boolean(post.featured));
        setPublished(post.published ?? true);
        setAttachments(post.attachments || []);
        setFormStatus('idle');
        setStatusMessage('');
        setTab('editor');
    };

    // Quick toggle top featured post
    const handleToggleFeatured = async (postSlug: string, currentFeatured: boolean) => {
        try {
            const newFeatured = !currentFeatured;
            const res = await fetch(`/api/blog/${postSlug}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: newFeatured }),
            });

            if (res.ok) {
                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.slug === postSlug) {
                            return { ...p, featured: newFeatured };
                        }
                        return newFeatured ? { ...p, featured: false } : p;
                    })
                );
            }
        } catch (err) {
            console.error('Error toggling featured:', err);
        }
    };

    // Delete Post
    const handleDeletePost = async (postSlug: string) => {
        if (!confirm(`Are you sure you want to delete post "${postSlug}"?`)) return;

        try {
            const res = await fetch(`/api/blog/${postSlug}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts((prev) => prev.filter((p) => p.slug !== postSlug));
                alert('Post deleted successfully.');
            } else {
                const d = await res.json();
                alert(`Delete failed: ${d.error}`);
            }
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    // Cover Image Upload Handler
    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingCover(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('postSlug', slug || 'covers');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                setCoverImage(data.url);
            } else {
                alert(`Cover upload failed: ${data.error}`);
            }
        } catch (err: any) {
            alert(`Upload error: ${err.message}`);
        } finally {
            setUploadingCover(false);
        }
    };

    // In-Body Image Upload Handler
    const handleBodyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingBodyImage(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('postSlug', slug || 'body-images');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                const markdownImage = `\n\n![${file.name.split('.')[0]}](${data.url})\n\n`;
                insertAtCursor(markdownImage);
            } else {
                alert(`Image upload failed: ${data.error}`);
            }
        } catch (err: any) {
            alert(`Upload error: ${err.message}`);
        } finally {
            setUploadingBodyImage(false);
            if (bodyImageInputRef.current) bodyImageInputRef.current.value = '';
        }
    };

    // File / PDF Attachment Upload Handler
    const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingAttachment(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('postSlug', slug || 'attachments');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.url) {
                const newItem: AttachmentItem = {
                    file_url: data.url,
                    file_name: data.fileName || file.name,
                    file_type: data.fileType || file.type,
                    file_size: data.fileSize || `${(file.size / 1024).toFixed(1)} KB`,
                };
                setAttachments((prev) => [...prev, newItem]);
            } else {
                alert(`Attachment upload failed: ${data.error}`);
            }
        } catch (err: any) {
            alert(`Upload error: ${err.message}`);
        } finally {
            setUploadingAttachment(false);
            if (attachmentInputRef.current) attachmentInputRef.current.value = '';
        }
    };

    // Helper to insert markdown text at textarea cursor
    const insertAtCursor = (textToInsert: string) => {
        const textarea = contentTextareaRef.current;
        if (!textarea) {
            setContent((prev) => prev + textToInsert);
            return;
        }
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const prev = content;
        const newText = prev.substring(0, start) + textToInsert + prev.substring(end);
        setContent(newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        }, 50);
    };

    // Save or Update Post
    const handleSubmitPost = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !content) {
            setFormStatus('error');
            setStatusMessage('Please fill in title, description, and markdown content.');
            return;
        }

        setFormStatus('saving');
        setStatusMessage('');

        const payload = {
            title,
            slug: slug || undefined,
            description,
            tags,
            content,
            featured_image_url: coverImage || undefined,
            featured,
            published,
            attachments,
        };

        try {
            const endpoint = editingSlug ? `/api/blog/${editingSlug}` : '/api/blog';
            const method = editingSlug ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to save post');
            }

            setFormStatus('success');
            setStatusMessage(editingSlug ? 'Post updated successfully!' : 'New post published successfully!');

            // Refresh post list
            await fetchData();

            setTimeout(() => {
                setTab('posts');
            }, 1200);
        } catch (err: any) {
            setFormStatus('error');
            setStatusMessage(err.message || 'An unexpected error occurred.');
        }
    };

    // Comment Moderation Actions
    const handleApproveComment = async (id: string, approved: boolean) => {
        try {
            const res = await fetch('/api/admin/comments', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, approved }),
            });
            if (res.ok) {
                setComments((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, approved } : c))
                );
            }
        } catch (err) {
            console.error('Error updating comment:', err);
        }
    };

    const handleDeleteComment = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this comment?')) return;
        try {
            const res = await fetch(`/api/admin/comments?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setComments((prev) => prev.filter((c) => c.id !== id));
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    const pendingCommentsCount = comments.filter((c) => !c.approved).length;

    return (
        <>
            <Header />
            <main style={{ paddingTop: '96px', paddingBottom: '5rem', minHeight: '90vh' }}>
                <div className="container" style={{ maxWidth: '1080px' }}>

                    {/* Admin Header Bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '2rem',
                        borderBottom: '2.5px dashed #2d2d2d',
                        paddingBottom: '1.25rem',
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <StickyTag color="yellow" rotate={-1}>
                                    ✍️ Control Deck
                                </StickyTag>
                                <span style={{
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-muted)',
                                }}>
                                    Authenticated as Author
                                </span>
                            </div>
                            <h1 style={{
                                fontFamily: 'Kalam, cursive',
                                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                fontWeight: 700,
                                color: '#2d2d2d',
                                margin: '0.35rem 0 0 0',
                            }}>
                                Blog Studio &amp; Moderation
                            </h1>
                        </div>

                        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={handleStartNewPost}
                                className="btn-sketch"
                                style={{ padding: '0.5rem 1.25rem', fontSize: '1.05rem' }}
                            >
                                ➕ New Post
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn-sketch-secondary"
                                style={{ padding: '0.5rem 1.1rem', fontSize: '1.05rem', color: '#dc2626' }}
                            >
                                🚪 Lock &amp; Logout
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setTab('posts')}
                            style={{
                                padding: '0.55rem 1.25rem',
                                borderRadius: RADIUS.wobblySm,
                                border: '2.5px solid #2d2d2d',
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: tab === 'posts' ? '#2d2d2d' : '#ffffff',
                                color: tab === 'posts' ? '#ffffff' : '#2d2d2d',
                                boxShadow: tab === 'posts' ? '1px 1px 0px #2d2d2d' : '3px 3px 0px #2d2d2d',
                                transform: tab === 'posts' ? 'translate(2px, 2px)' : 'none',
                                transition: 'all 0.1s ease',
                            }}
                        >
                            📚 All Articles ({posts.length})
                        </button>

                        <button
                            onClick={() => setTab('editor')}
                            style={{
                                padding: '0.55rem 1.25rem',
                                borderRadius: RADIUS.wobblySm,
                                border: '2.5px solid #2d2d2d',
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: tab === 'editor' ? '#2d2d2d' : '#ffffff',
                                color: tab === 'editor' ? '#ffffff' : '#2d2d2d',
                                boxShadow: tab === 'editor' ? '1px 1px 0px #2d2d2d' : '3px 3px 0px #2d2d2d',
                                transform: tab === 'editor' ? 'translate(2px, 2px)' : 'none',
                                transition: 'all 0.1s ease',
                            }}
                        >
                            ✍️ {editingSlug ? `Editing: ${title.slice(0, 18)}...` : 'Write Post'}
                        </button>

                        <button
                            onClick={() => setTab('comments')}
                            style={{
                                padding: '0.55rem 1.25rem',
                                borderRadius: RADIUS.wobblySm,
                                border: '2.5px solid #2d2d2d',
                                fontFamily: 'Patrick Hand, cursive',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: tab === 'comments' ? '#2d2d2d' : '#ffffff',
                                color: tab === 'comments' ? '#ffffff' : '#2d2d2d',
                                boxShadow: tab === 'comments' ? '1px 1px 0px #2d2d2d' : '3px 3px 0px #2d2d2d',
                                transform: tab === 'comments' ? 'translate(2px, 2px)' : 'none',
                                transition: 'all 0.1s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                            }}
                        >
                            <span>💬 Comments</span>
                            {pendingCommentsCount > 0 && (
                                <span style={{
                                    background: 'var(--accent)',
                                    color: '#ffffff',
                                    fontSize: '0.82rem',
                                    padding: '0.1rem 0.45rem',
                                    borderRadius: '50px',
                                    border: '1px solid #2d2d2d',
                                }}>
                                    {pendingCommentsCount} new
                                </span>
                            )}
                        </button>
                    </div>

                    {/* ======================================================== */}
                    {/* TAB 1: ALL POSTS LIST */}
                    {/* ======================================================== */}
                    {tab === 'posts' && (
                        <div>
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Patrick Hand, cursive', fontSize: '1.25rem' }}>
                                    Loading your articles... ⏳
                                </div>
                            ) : posts.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    background: '#ffffff',
                                    border: '2.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobbly,
                                    padding: '3rem 2rem',
                                    boxShadow: '4px 4px 0px #2d2d2d',
                                }}>
                                    <p style={{ fontFamily: 'Kalam, cursive', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                                        No articles written yet! 📝
                                    </p>
                                    <button onClick={handleStartNewPost} className="btn-sketch">
                                        Write your first post 🚀
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {posts.map((p) => (
                                        <div
                                            key={p.slug}
                                            style={{
                                                background: '#ffffff',
                                                border: p.featured ? '3px solid var(--accent)' : '2.5px solid #2d2d2d',
                                                borderRadius: RADIUS.wobblyMd,
                                                padding: '1.5rem',
                                                boxShadow: p.featured ? '5px 5px 0px var(--accent)' : '4px 4px 0px #2d2d2d',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: '1rem',
                                            }}
                                        >
                                            <div style={{ maxWidth: '620px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                                                    {p.featured && (
                                                        <span style={{
                                                            padding: '0.15rem 0.55rem',
                                                            borderRadius: RADIUS.wobblySm,
                                                            fontSize: '0.85rem',
                                                            fontFamily: 'Patrick Hand, cursive',
                                                            fontWeight: 700,
                                                            background: 'var(--bg-postit-coral)',
                                                            border: '1.5px solid #2d2d2d',
                                                        }}>
                                                            ⭐ Top Featured
                                                        </span>
                                                    )}
                                                    <span style={{
                                                        padding: '0.15rem 0.5rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        fontSize: '0.85rem',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontWeight: 700,
                                                        background: p.published ? 'var(--bg-postit-green)' : 'var(--bg-postit-orange)',
                                                        border: '1.5px solid #2d2d2d',
                                                    }}>
                                                        {p.published ? '🟢 Published' : '🟡 Draft'}
                                                    </span>
                                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                        /blog/{p.slug}
                                                    </span>
                                                </div>
                                                <h3 style={{
                                                    fontFamily: 'Kalam, cursive',
                                                    fontSize: '1.45rem',
                                                    fontWeight: 700,
                                                    color: '#2d2d2d',
                                                    margin: '0 0 0.35rem 0',
                                                }}>
                                                    {p.title}
                                                </h3>
                                                <p style={{
                                                    fontFamily: 'Patrick Hand, cursive',
                                                    fontSize: '1.05rem',
                                                    color: 'var(--text-secondary)',
                                                    margin: 0,
                                                    lineHeight: 1.4,
                                                }}>
                                                    {p.description}
                                                </p>
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                {/* 1-Click Feature Toggle Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleFeatured(p.slug, Boolean(p.featured))}
                                                    title="Pin to top of blog page as hero feature"
                                                    style={{
                                                        padding: '0.4rem 0.85rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        border: '2px solid #2d2d2d',
                                                        background: p.featured ? 'var(--bg-postit-coral)' : '#ffffff',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        boxShadow: '2px 2px 0px #2d2d2d',
                                                    }}
                                                >
                                                    {p.featured ? '⭐ Featured' : '☆ Pin to Top'}
                                                </button>

                                                <a
                                                    href={`/blog/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: '0.4rem 0.85rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        border: '2px solid #2d2d2d',
                                                        background: 'var(--bg-elevated)',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        textDecoration: 'none',
                                                        color: '#2d2d2d',
                                                        boxShadow: '2px 2px 0px #2d2d2d',
                                                    }}
                                                >
                                                    👁️ View
                                                </a>
                                                <button
                                                    onClick={() => handleEditPost(p)}
                                                    style={{
                                                        padding: '0.4rem 0.85rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        border: '2px solid #2d2d2d',
                                                        background: '#ffffff',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        color: '#2d2d2d',
                                                        boxShadow: '2px 2px 0px #2d2d2d',
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(p.slug)}
                                                    style={{
                                                        padding: '0.4rem 0.85rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        border: '2px solid #2d2d2d',
                                                        background: '#fee2e2',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        color: '#b91c1c',
                                                        boxShadow: '2px 2px 0px #2d2d2d',
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ======================================================== */}
                    {/* TAB 2: RICH BLOG POST EDITOR */}
                    {/* ======================================================== */}
                    {tab === 'editor' && (
                        <div style={{
                            background: '#ffffff',
                            border: '3px solid #2d2d2d',
                            borderRadius: RADIUS.wobbly,
                            padding: '2.5rem 2rem',
                            boxShadow: '6px 6px 0px #2d2d2d',
                            position: 'relative',
                        }}>
                            <TapeStrip rotate={-1} />

                            <div style={{ marginBottom: '1.75rem', borderBottom: '2px dashed #2d2d2d', paddingBottom: '1rem' }}>
                                <h2 style={{
                                    fontFamily: 'Kalam, cursive',
                                    fontSize: '1.85rem',
                                    fontWeight: 700,
                                    color: '#2d2d2d',
                                    margin: 0,
                                }}>
                                    {editingSlug ? '✏️ Edit Article' : '📝 Author New Article'}
                                </h2>
                                <p style={{
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.05rem',
                                    color: 'var(--text-secondary)',
                                    margin: '0.25rem 0 0 0',
                                }}>
                                    Supports full Markdown, embedded image uploads, cover photography, downloadable research attachments, and top featuring.
                                </p>
                            </div>

                            {formStatus === 'success' && (
                                <div style={{
                                    background: '#dcfce7',
                                    border: '2px solid #16a34a',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '0.75rem 1rem',
                                    color: '#15803d',
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    marginBottom: '1.5rem',
                                }}>
                                    ✅ {statusMessage}
                                </div>
                            )}

                            {formStatus === 'error' && (
                                <div style={{
                                    background: '#fee2e2',
                                    border: '2px solid #dc2626',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '0.75rem 1rem',
                                    color: '#b91c1c',
                                    fontFamily: 'Patrick Hand, cursive',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    marginBottom: '1.5rem',
                                }}>
                                    ⚠️ {statusMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmitPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>

                                {/* Title */}
                                <div>
                                    <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                                        Article Title <span style={{ color: 'var(--accent)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Scaling Low-Resource Bangla NLP with Transformers"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: RADIUS.wobblySm,
                                            border: '2.5px solid #2d2d2d',
                                            background: 'var(--bg-elevated)',
                                            fontSize: '1.15rem',
                                            fontFamily: 'Patrick Hand, cursive',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Slug (Optional custom slug) */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                                            URL Slug (leave empty to auto-generate)
                                        </label>
                                        <input
                                            type="text"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            placeholder="e.g. low-resource-bangla-nlp"
                                            style={{
                                                width: '100%',
                                                padding: '0.65rem 0.85rem',
                                                borderRadius: RADIUS.wobblySm,
                                                border: '2px solid #2d2d2d',
                                                background: 'var(--bg-elevated)',
                                                fontSize: '1rem',
                                                fontFamily: 'JetBrains Mono, monospace',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                                            Tags (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            placeholder="NLP, AI, PyTorch, Research"
                                            style={{
                                                width: '100%',
                                                padding: '0.65rem 0.85rem',
                                                borderRadius: RADIUS.wobblySm,
                                                border: '2px solid #2d2d2d',
                                                background: 'var(--bg-elevated)',
                                                fontSize: '1.05rem',
                                                fontFamily: 'Patrick Hand, cursive',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label style={{ display: 'block', fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                                        Summary / Description <span style={{ color: 'var(--accent)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="A concise overview that shows on the blog cards..."
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.65rem 0.85rem',
                                            borderRadius: RADIUS.wobblySm,
                                            border: '2px solid #2d2d2d',
                                            background: 'var(--bg-elevated)',
                                            fontSize: '1.1rem',
                                            fontFamily: 'Patrick Hand, cursive',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Cover Image Upload */}
                                <div style={{
                                    background: 'var(--bg-elevated)',
                                    border: '2px dashed #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '1rem 1.25rem',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <label style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700 }}>
                                            📸 Cover Photo
                                        </label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={coverImageInputRef}
                                                onChange={handleCoverImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => coverImageInputRef.current?.click()}
                                                disabled={uploadingCover}
                                                style={{
                                                    padding: '0.35rem 0.85rem',
                                                    borderRadius: RADIUS.wobblySm,
                                                    border: '2px solid #2d2d2d',
                                                    background: '#ffffff',
                                                    fontFamily: 'Patrick Hand, cursive',
                                                    fontSize: '0.95rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    boxShadow: '2px 2px 0px #2d2d2d',
                                                }}
                                            >
                                                {uploadingCover ? 'Uploading...' : '📁 Upload Photo'}
                                            </button>
                                            {coverImage && (
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImage('')}
                                                    style={{
                                                        padding: '0.35rem 0.65rem',
                                                        borderRadius: RADIUS.wobblySm,
                                                        border: '2px solid #2d2d2d',
                                                        background: '#fee2e2',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 700,
                                                        color: '#b91c1c',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        placeholder="Paste image URL or upload above..."
                                        style={{
                                            width: '100%',
                                            padding: '0.55rem 0.75rem',
                                            borderRadius: RADIUS.wobblySm,
                                            border: '1.5px solid #2d2d2d',
                                            background: '#ffffff',
                                            fontSize: '0.95rem',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Downloadable Attachments (PDF / Code / Datasets) */}
                                <div style={{
                                    background: 'var(--bg-postit)',
                                    border: '2px dashed #2d2d2d',
                                    borderRadius: RADIUS.wobblySm,
                                    padding: '1rem 1.25rem',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div>
                                            <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700 }}>
                                                📎 Attachments &amp; PDF Downloads ({attachments.length})
                                            </span>
                                            <p style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                                Attach papers, slides, datasets, or code files for visitors to download.
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            ref={attachmentInputRef}
                                            onChange={handleAttachmentUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => attachmentInputRef.current?.click()}
                                            disabled={uploadingAttachment}
                                            style={{
                                                padding: '0.35rem 0.85rem',
                                                borderRadius: RADIUS.wobblySm,
                                                border: '2px solid #2d2d2d',
                                                background: '#ffffff',
                                                fontFamily: 'Patrick Hand, cursive',
                                                fontSize: '0.95rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                boxShadow: '2px 2px 0px #2d2d2d',
                                            }}
                                        >
                                            {uploadingAttachment ? 'Uploading...' : '➕ Add File (PDF/Zip)'}
                                        </button>
                                    </div>

                                    {attachments.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.5rem' }}>
                                            {attachments.map((att, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        background: '#ffffff',
                                                        border: '1.5px solid #2d2d2d',
                                                        borderRadius: RADIUS.wobblySm,
                                                        padding: '0.4rem 0.75rem',
                                                        fontSize: '0.95rem',
                                                        fontFamily: 'Patrick Hand, cursive',
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 600 }}>📄 {att.file_name} ({att.file_size || 'file'})</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#dc2626',
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Markdown Content Toolbar & Area */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                        <label style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.15rem', fontWeight: 700 }}>
                                            Markdown Content <span style={{ color: 'var(--accent)' }}>*</span>
                                        </label>

                                        {/* Write vs Preview Toggle */}
                                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                                            <button
                                                type="button"
                                                onClick={() => setEditorTab('write')}
                                                style={{
                                                    padding: '0.25rem 0.65rem',
                                                    borderRadius: RADIUS.wobblySm,
                                                    border: '1.5px solid #2d2d2d',
                                                    background: editorTab === 'write' ? '#2d2d2d' : '#ffffff',
                                                    color: editorTab === 'write' ? '#ffffff' : '#2d2d2d',
                                                    fontFamily: 'Patrick Hand, cursive',
                                                    fontSize: '0.92rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ✏️ Write
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditorTab('preview')}
                                                style={{
                                                    padding: '0.25rem 0.65rem',
                                                    borderRadius: RADIUS.wobblySm,
                                                    border: '1.5px solid #2d2d2d',
                                                    background: editorTab === 'preview' ? '#2d2d2d' : '#ffffff',
                                                    color: editorTab === 'preview' ? '#ffffff' : '#2d2d2d',
                                                    fontFamily: 'Patrick Hand, cursive',
                                                    fontSize: '0.92rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                👁️ Preview
                                            </button>
                                        </div>
                                    </div>

                                    {/* Markdown Helper Toolbar */}
                                    {editorTab === 'write' && (
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '0.35rem',
                                            marginBottom: '0.5rem',
                                            background: 'var(--bg-elevated)',
                                            border: '2px solid #2d2d2d',
                                            borderRadius: RADIUS.wobblySm,
                                            padding: '0.45rem',
                                        }}>
                                            <button type="button" onClick={() => insertAtCursor('## Section Title\n')} style={toolbarBtnStyle}>H2</button>
                                            <button type="button" onClick={() => insertAtCursor('### Subtitle\n')} style={toolbarBtnStyle}>H3</button>
                                            <button type="button" onClick={() => insertAtCursor('**bold text**')} style={toolbarBtnStyle}>B</button>
                                            <button type="button" onClick={() => insertAtCursor('*italic text*')} style={toolbarBtnStyle}>I</button>
                                            <button type="button" onClick={() => insertAtCursor('> Quote block\n')} style={toolbarBtnStyle}>Quote</button>
                                            <button type="button" onClick={() => insertAtCursor('```python\n# your code here\n```\n')} style={toolbarBtnStyle}>Code</button>
                                            <button type="button" onClick={() => insertAtCursor('[Link Text](https://)')} style={toolbarBtnStyle}>Link</button>

                                            {/* In-body image upload trigger */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={bodyImageInputRef}
                                                onChange={handleBodyImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => bodyImageInputRef.current?.click()}
                                                disabled={uploadingBodyImage}
                                                style={{
                                                    ...toolbarBtnStyle,
                                                    background: 'var(--bg-postit-green)',
                                                }}
                                            >
                                                {uploadingBodyImage ? 'Uploading Image...' : '🖼️ Insert Image'}
                                            </button>
                                        </div>
                                    )}

                                    {editorTab === 'write' ? (
                                        <textarea
                                            ref={contentTextareaRef}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="# Introduction&#10;&#10;Write your thoughts, research notes, and findings..."
                                            required
                                            style={{
                                                width: '100%',
                                                minHeight: '420px',
                                                padding: '1rem',
                                                borderRadius: RADIUS.wobblySm,
                                                border: '2.5px solid #2d2d2d',
                                                background: '#ffffff',
                                                fontFamily: 'JetBrains Mono, monospace',
                                                fontSize: '1rem',
                                                lineHeight: 1.6,
                                                outline: 'none',
                                                resize: 'vertical',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            minHeight: '420px',
                                            padding: '1.5rem',
                                            borderRadius: RADIUS.wobblySm,
                                            border: '2.5px solid #2d2d2d',
                                            background: '#faf8f5',
                                            fontFamily: 'Patrick Hand, cursive',
                                            fontSize: '1.15rem',
                                            lineHeight: 1.65,
                                            overflowY: 'auto',
                                        }}>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                                Previewing rendered text structure:
                                            </p>
                                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                                {content || 'Nothing written yet.'}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Customization Checkboxes & Action Row */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    borderTop: '2px dashed #2d2d2d',
                                    paddingTop: '1.25rem',
                                    marginTop: '0.5rem',
                                }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontFamily: 'Patrick Hand, cursive',
                                            fontSize: '1.15rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={published}
                                                onChange={(e) => setPublished(e.target.checked)}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <span>Publish Live</span>
                                        </label>

                                        {/* Featured Top Toggle */}
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontFamily: 'Patrick Hand, cursive',
                                            fontSize: '1.15rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            color: 'var(--secondary-accent)',
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={featured}
                                                onChange={(e) => setFeatured(e.target.checked)}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <span>⭐ Top Featured Article (Hero Card)</span>
                                        </label>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.65rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setTab('posts')}
                                            style={{
                                                padding: '0.65rem 1.25rem',
                                                borderRadius: RADIUS.wobblySm,
                                                border: '2px solid #2d2d2d',
                                                background: '#ffffff',
                                                fontFamily: 'Patrick Hand, cursive',
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'saving'}
                                            className="btn-sketch"
                                            style={{
                                                padding: '0.65rem 1.75rem',
                                                fontSize: '1.15rem',
                                                cursor: formStatus === 'saving' ? 'wait' : 'pointer',
                                            }}
                                        >
                                            {formStatus === 'saving'
                                                ? 'Saving...'
                                                : editingSlug
                                                    ? '💾 Update Article'
                                                    : '🚀 Publish Article'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ======================================================== */}
                    {/* TAB 3: VISITOR COMMENTS MODERATION */}
                    {/* ======================================================== */}
                    {tab === 'comments' && (
                        <div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ fontFamily: 'Kalam, cursive', fontSize: '1.85rem', fontWeight: 700, color: '#2d2d2d', margin: 0 }}>
                                    Visitor Discussion &amp; Feedback
                                </h2>
                                <p style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.1rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                                    Approve genuine feedback or remove spam comments before they go live on your articles.
                                </p>
                            </div>

                            {comments.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    background: '#ffffff',
                                    border: '2.5px solid #2d2d2d',
                                    borderRadius: RADIUS.wobbly,
                                    padding: '3rem',
                                    boxShadow: '4px 4px 0px #2d2d2d',
                                }}>
                                    <p style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '1.35rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        No visitor comments yet. 💬
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {comments.map((c) => (
                                        <div
                                            key={c.id}
                                            style={{
                                                position: 'relative',
                                                background: c.approved ? '#ffffff' : 'var(--bg-postit)',
                                                border: '2.5px solid #2d2d2d',
                                                borderRadius: RADIUS.wobblySm,
                                                padding: '1.35rem',
                                                boxShadow: '4px 4px 0px #2d2d2d',
                                            }}
                                        >
                                            <Thumbtack color={c.approved ? '#55a630' : '#ff4d4d'} />

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <strong style={{ fontFamily: 'Kalam, cursive', fontSize: '1.2rem', color: '#2d2d2d' }}>
                                                            {c.author_name}
                                                        </strong>
                                                        {c.author_email && (
                                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                                                &lt;{c.author_email}&gt;
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.95rem', color: 'var(--secondary-accent)', marginTop: '0.15rem' }}>
                                                        Article: <strong>/blog/{c.post_slug}</strong>
                                                    </div>
                                                </div>

                                                <span style={{
                                                    padding: '0.15rem 0.55rem',
                                                    borderRadius: RADIUS.wobblySm,
                                                    fontSize: '0.85rem',
                                                    fontFamily: 'Patrick Hand, cursive',
                                                    fontWeight: 700,
                                                    background: c.approved ? 'var(--bg-postit-green)' : 'var(--bg-postit-orange)',
                                                    border: '1.5px solid #2d2d2d',
                                                }}>
                                                    {c.approved ? '✅ Approved' : '⏳ Pending Review'}
                                                </span>
                                            </div>

                                            <p style={{
                                                fontFamily: 'Patrick Hand, cursive',
                                                fontSize: '1.15rem',
                                                color: '#2d2d2d',
                                                lineHeight: 1.5,
                                                margin: '0.5rem 0 1rem 0',
                                                whiteSpace: 'pre-wrap',
                                            }}>
                                                {c.content}
                                            </p>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px dashed #2d2d2d', paddingTop: '0.65rem' }}>
                                                <span style={{ fontFamily: 'Patrick Hand, cursive', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    {new Date(c.created_at).toLocaleDateString()}
                                                </span>

                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleApproveComment(c.id, !c.approved)}
                                                        style={{
                                                            padding: '0.35rem 0.85rem',
                                                            borderRadius: RADIUS.wobblySm,
                                                            border: '2px solid #2d2d2d',
                                                            background: c.approved ? '#ffffff' : 'var(--bg-postit-green)',
                                                            fontFamily: 'Patrick Hand, cursive',
                                                            fontSize: '0.95rem',
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            boxShadow: '2px 2px 0px #2d2d2d',
                                                        }}
                                                    >
                                                        {c.approved ? 'Unapprove' : '✅ Approve'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteComment(c.id)}
                                                        style={{
                                                            padding: '0.35rem 0.85rem',
                                                            borderRadius: RADIUS.wobblySm,
                                                            border: '2px solid #2d2d2d',
                                                            background: '#fee2e2',
                                                            fontFamily: 'Patrick Hand, cursive',
                                                            fontSize: '0.95rem',
                                                            fontWeight: 700,
                                                            color: '#b91c1c',
                                                            cursor: 'pointer',
                                                            boxShadow: '2px 2px 0px #2d2d2d',
                                                        }}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </>
    );
}

const toolbarBtnStyle: React.CSSProperties = {
    padding: '0.2rem 0.55rem',
    borderRadius: '8px',
    border: '1.5px solid #2d2d2d',
    background: '#ffffff',
    fontFamily: 'Patrick Hand, cursive',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '1px 1px 0px #2d2d2d',
};
