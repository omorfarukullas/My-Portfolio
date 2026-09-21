import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Omor Faruck Ullas — AI/ML, NLP & Software Engineer | UIU';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#fdfbf7',
                    backgroundImage: 'radial-gradient(#d8d1c5 2px, transparent 2px)',
                    backgroundSize: '28px 28px',
                    padding: '60px 70px',
                    fontFamily: 'sans-serif',
                    border: '12px solid #2d2d2d',
                    boxSizing: 'border-box',
                }}
            >
                {/* Top bar with tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#fff9c4',
                            border: '3px solid #2d2d2d',
                            borderRadius: '8px',
                            padding: '8px 20px',
                            boxShadow: '4px 4px 0px #2d2d2d',
                            fontSize: 22,
                            fontWeight: 700,
                            color: '#2d2d2d',
                        }}
                    >
                        🎓 United International University (UIU) · Dhaka, BD
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#ff4d4d',
                            color: '#ffffff',
                            border: '3px solid #2d2d2d',
                            borderRadius: '8px',
                            padding: '8px 18px',
                            boxShadow: '4px 4px 0px #2d2d2d',
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        AI / ML &amp; NLP
                    </div>
                </div>

                {/* Main Heading & Bio */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 64,
                            fontWeight: 900,
                            color: '#2d2d2d',
                            letterSpacing: '-1.5px',
                            lineHeight: 1.1,
                        }}
                    >
                        Omor Faruck Ullas
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            fontWeight: 600,
                            color: '#ff4d4d',
                            lineHeight: 1.2,
                        }}
                    >
                        AI/ML Researcher • Low-Resource Bangla NLP • Software Engineer
                    </div>

                    <div
                        style={{
                            fontSize: 22,
                            color: '#4a4a4a',
                            maxWidth: '960px',
                            lineHeight: 1.4,
                        }}
                    >
                        Investigating coordinated propaganda detection in low-resource Bangla &amp; building resilient real-world software systems.
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '3px dashed #2d2d2d',
                        paddingTop: '24px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: '#2d2d2d',
                        }}
                    >
                        🔗 omorfarukullas.vercel.app
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#ffffff',
                                border: '2px solid #2d2d2d',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                fontSize: 18,
                                fontWeight: 600,
                                color: '#2d2d2d',
                                boxShadow: '2px 2px 0px #2d2d2d',
                            }}
                        >
                            GitHub: omorfarukullas
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#ffffff',
                                border: '2px solid #2d2d2d',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                fontSize: 18,
                                fontWeight: 600,
                                color: '#2d2d2d',
                                boxShadow: '2px 2px 0px #2d2d2d',
                            }}
                        >
                            LinkedIn: /in/omorullas
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
