import fs from 'fs';
import path from 'path';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import {
    getAllPostsAsync,
    getAllTagsAsync,
    getPostBySlugAsync,
    getRelatedPostsAsync,
    getAdjacentPostsAsync,
} from '../lib/mdx';

// Simple .env.local loader for standalone execution
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach((line) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const eqIdx = trimmed.indexOf('=');
                if (eqIdx !== -1) {
                    const key = trimmed.substring(0, eqIdx).trim();
                    const value = trimmed.substring(eqIdx + 1).trim();
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        });
    }
}

loadEnv();

const TEST_SLUG = `automated-test-${Date.now()}`;
const TEST_TAG = `TestTag-${Date.now()}`;

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
        console.log(`  ✅ PASS: ${testName}`);
        passedCount++;
    } else {
        console.error(`  ❌ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
        failedCount++;
    }
}

async function runTests() {
    console.log('====================================================');
    console.log('🧪 Starting Blog System & Supabase Automated Tests');
    console.log(`   Target Test Slug: ${TEST_SLUG}`);
    console.log('====================================================\n');

    const admin = getSupabaseAdmin();
    const client = getSupabaseClient();

    if (!admin || !client || !isSupabaseConfigured()) {
        console.error('❌ Supabase is not properly configured. Check .env.local');
        process.exit(1);
    }

    try {
        // --- TEST 1: Create Test Post ---
        console.log('📋 Test Suite 1: Post Creation & Ingestion');
        const testPostPayload: Record<string, any> = {
            slug: TEST_SLUG,
            title: 'Automated Portfolio Verification Post',
            description: 'Temporary post created by automated test suite to verify blog system.',
            content: '# Verification Header\n\nThis is a temporary test post verifying that Supabase blog ingestion and display work correctly.',
            tags: ['PortfolioTest', TEST_TAG],
            featured_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
            published: true,
            read_time: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let { data: createdPost, error: insertError } = await admin
            .from('posts')
            .insert({ ...testPostPayload, featured: false })
            .select()
            .single();

        if (insertError && insertError.message?.includes('featured')) {
            const retry = await admin
                .from('posts')
                .insert(testPostPayload)
                .select()
                .single();
            createdPost = retry.data;
            insertError = retry.error;
        }

        assert(!insertError && !!createdPost, 'Post inserted into Supabase via service role', insertError?.message);

        // --- TEST 2: getAllPostsAsync() includes Supabase post ---
        console.log('\n📋 Test Suite 2: Public Post Listing & Retrieval');
        const allPosts = await getAllPostsAsync();
        const foundInAll = allPosts.find((p) => p.slug === TEST_SLUG);
        assert(!!foundInAll, 'getAllPostsAsync() includes newly uploaded post from Supabase');
        assert(foundInAll?.title === testPostPayload.title, 'getAllPostsAsync() maps title and metadata correctly');

        // --- TEST 3: getAllTagsAsync() includes tags from Supabase ---
        console.log('\n📋 Test Suite 3: Tag Extraction & Filtering');
        const allTags = await getAllTagsAsync();
        assert(allTags.includes(TEST_TAG), 'getAllTagsAsync() includes new tag from Supabase post');
        assert(allTags.includes('PortfolioTest'), 'getAllTagsAsync() includes PortfolioTest tag');

        // --- TEST 4: getPostBySlugAsync() retrieves post details ---
        console.log('\n📋 Test Suite 4: Single Post Retrieval by Slug');
        const fetchedPost = await getPostBySlugAsync(TEST_SLUG);
        assert(!!fetchedPost, 'getPostBySlugAsync() finds post by slug');
        assert(fetchedPost?.slug === TEST_SLUG, 'Retrieved post has correct slug');
        assert(fetchedPost?.published === true, 'Retrieved post is published');
        assert(fetchedPost?.readTime === 2, 'Retrieved post preserves read_time');
        assert(Array.isArray(fetchedPost?.tags) && fetchedPost.tags.includes(TEST_TAG), 'Retrieved post has correct tags');

        // --- TEST 5: Related & Adjacent posts ---
        console.log('\n📋 Test Suite 5: Related & Adjacent Posts Navigation');
        const related = await getRelatedPostsAsync(TEST_SLUG, [TEST_TAG]);
        // No other post has this unique TEST_TAG, so related should be empty
        assert(Array.isArray(related), 'getRelatedPostsAsync() returns array');
        const adjacent = await getAdjacentPostsAsync(TEST_SLUG);
        assert('prev' in adjacent && 'next' in adjacent, 'getAdjacentPostsAsync() returns prev/next structure');

        // --- TEST 6: Comments moderation workflow ---
        console.log('\n📋 Test Suite 6: Comments & Moderation');
        // Submit unapproved comment (mirrors POST /api/blog/[slug]/comments using server admin)
        const commentClient = admin;
        const { data: insertedComment, error: commentError } = await commentClient
            .from('comments')
            .insert({
                post_slug: TEST_SLUG,
                author_name: 'Test Reviewer',
                author_email: 'test@example.com',
                content: 'This is an unapproved test comment.',
                approved: false,
            })
            .select()
            .single();

        assert(!commentError && !!insertedComment, 'Comment successfully submitted into moderation queue', commentError?.message);

        // Verify unapproved comment is NOT returned in public getPostBySlugAsync
        const postWithPendingComment = await getPostBySlugAsync(TEST_SLUG);
        const hasPending = postWithPendingComment?.comments?.some((c) => c.content === 'This is an unapproved test comment.');
        assert(!hasPending, 'Unapproved comment is hidden from public view');

        // Approve comment via admin
        if (insertedComment?.id) {
            const { error: approveError } = await admin
                .from('comments')
                .update({ approved: true })
                .eq('id', insertedComment.id);
            assert(!approveError, 'Admin can approve comment');

            // Verify approved comment now appears
            const postWithApprovedComment = await getPostBySlugAsync(TEST_SLUG);
            const hasApproved = postWithApprovedComment?.comments?.some((c) => c.content === 'This is an unapproved test comment.');
            assert(!!hasApproved, 'Approved comment is visible in post discussion');
        }

        // --- TEST 7: Post Update ---
        console.log('\n📋 Test Suite 7: Post Updates');
        const { error: updateError } = await admin
            .from('posts')
            .update({ title: 'Updated Verification Post Title' })
            .eq('slug', TEST_SLUG);
        assert(!updateError, 'Post title updated in Supabase');

        const updatedPost = await getPostBySlugAsync(TEST_SLUG);
        assert(updatedPost?.title === 'Updated Verification Post Title', 'Updated post title reflected immediately');

        // --- TEST 8: Unpublished / Draft Post Security ---
        console.log('\n📋 Test Suite 8: Unpublished Post Public Privacy');
        const { error: unpublishError } = await admin
            .from('posts')
            .update({ published: false })
            .eq('slug', TEST_SLUG);
        assert(!unpublishError, 'Post set to published = false (draft mode)');

        const postsAfterDraft = await getAllPostsAsync();
        const foundDraftInAll = postsAfterDraft.find((p) => p.slug === TEST_SLUG);
        assert(!foundDraftInAll, 'Draft post is NOT returned in getAllPostsAsync()');

        const draftPostPublic = await getPostBySlugAsync(TEST_SLUG);
        assert(draftPostPublic === null, 'Draft post returns null from public getPostBySlugAsync()');

    } finally {
        // --- CLEANUP: Delete Test Data ---
        console.log('\n🧹 Cleaning up test data...');
        try {
            await admin.from('comments').delete().eq('post_slug', TEST_SLUG);
            await admin.from('attachments').delete().eq('post_slug', TEST_SLUG);
            const { error: delError } = await admin.from('posts').delete().eq('slug', TEST_SLUG);
            if (!delError) {
                console.log(`  ✅ Cleaned up test post: ${TEST_SLUG}`);
            } else {
                console.error(`  ⚠️ Cleanup error: ${delError.message}`);
            }

            // Verify test post is deleted
            const verifyDeleted = await admin.from('posts').select('id').eq('slug', TEST_SLUG).single();
            if (verifyDeleted.error) {
                console.log('  ✅ Confirmed: test post is completely removed from Supabase.');
            }
        } catch (cleanupErr) {
            console.error('  ⚠️ Error during cleanup:', cleanupErr);
        }

        // --- VERIFY EXISTING REAL DATA IS INTACT ---
        console.log('\n🔍 Verifying real user posts are intact...');
        const realPosts = await getAllPostsAsync();
        const ocrPost = realPosts.find((p) => p.slug === 'ocr-is-no-longer-just-about-converting-an-image-into-text');
        if (ocrPost) {
            console.log(`  ✅ User's uploaded post is active and visible: "${ocrPost.title}"`);
            console.log(`     Tags: ${ocrPost.tags.join(', ')}`);
        } else {
            console.error('  ❌ Warning: OCR post was not found in active posts.');
        }

        console.log('\n====================================================');
        console.log(`🏁 Test Summary: ${passedCount} Passed, ${failedCount} Failed`);
        console.log('====================================================\n');

        if (failedCount > 0) {
            process.exit(1);
        }
    }
}

runTests().catch((err) => {
    console.error('Fatal test error:', err);
    process.exit(1);
});
