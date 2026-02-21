export default function Background() {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
