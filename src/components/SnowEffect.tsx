import { useEffect, useRef } from 'react';

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wind: number;
    opacity: number;
    vx: number;
    vy: number;
}

export default function SnowEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const snowflakesRef = useRef<Snowflake[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create snowflakes
        const createSnowflakes = (count: number) => {
            const snowflakes: Snowflake[] = [];
            for (let i = 0; i < count; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    speed: Math.random() * 1 + 0.5,
                    wind: Math.random() * 0.5 - 0.25,
                    opacity: Math.random() * 0.5 + 0.3,
                    vx: 0,
                    vy: 0,
                });
            }
            return snowflakes;
        };

        snowflakesRef.current = createSnowflakes(100);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            snowflakesRef.current.forEach((flake) => {
                // Calculate distance from mouse
                const dx = mouseRef.current.x - flake.x;
                const dy = mouseRef.current.y - flake.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;

                // Apply mouse repulsion
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    flake.vx -= (dx / distance) * force * 0.5;
                    flake.vy -= (dy / distance) * force * 0.5;
                }

                // Apply velocity damping
                flake.vx *= 0.95;
                flake.vy *= 0.95;

                // Update position with wind and velocity
                flake.x += flake.wind + flake.vx;
                flake.y += flake.speed + flake.vy;

                // Wrap around screen
                if (flake.y > canvas.height) {
                    flake.y = 0;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width) {
                    flake.x = 0;
                } else if (flake.x < 0) {
                    flake.x = canvas.width;
                }

                // Draw snowflake
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
