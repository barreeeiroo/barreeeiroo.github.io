import './index-scroll-animations';
import './index-scroll-spy';

import { animate } from 'motion';

// Helper function to check if element is in viewport
function isElementInViewport(element: Element): boolean {
	const rect = element.getBoundingClientRect();
	return (
		rect.top < window.innerHeight &&
		rect.bottom > 0
	);
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	// Side decorations
	animate(
		'#left-decoration',
		{ opacity: [0, 1], x: [-40, 0] },
		{ duration: 0.6, delay: 0.3, easing: 'ease-out' }
	);

	animate(
		'#right-decoration',
		{ opacity: [0, 1], x: [40, 0] },
		{ duration: 0.6, delay: 0.4, easing: 'ease-out' }
	);

	// Only animate hero if it's in the viewport (handles scroll restoration)
	const heroSection = document.querySelector('#greeting')?.closest('section');
	const isHeroVisible = heroSection && isElementInViewport(heroSection);

	if (isHeroVisible) {
		// Hero animations
		animate(
			'#greeting',
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.5, easing: 'ease-out' }
		);

		animate(
			'#name',
			{ opacity: [0, 1], y: [-30, 0] },
			{ duration: 0.6, delay: 0.15, easing: 'ease-out' }
		);

		animate(
			'#tagline',
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.5, delay: 0.3, easing: 'ease-out' }
		);

		animate(
			'#scroll-indicator',
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.5, delay: 0.5, easing: 'ease-out' }
		);
	} else {
		// If hero is not visible, make elements visible immediately
		const heroElements = ['#greeting', '#name', '#tagline', '#scroll-indicator'];
		heroElements.forEach(selector => {
			const element = document.querySelector(selector) as HTMLElement;
			if (element) element.style.opacity = '1';
		});
	}

	// Scroll indicator hover effect
	const scrollIndicator = document.getElementById('scroll-indicator');
	if (scrollIndicator) {
		const scrollLine = scrollIndicator.querySelector('.scroll-line');

		scrollIndicator.addEventListener('mouseenter', () => {
			if (scrollLine) {
				animate(
					scrollLine,
					{ scaleY: [1, 1.2, 1] },
					{ duration: 0.6, easing: 'ease-in-out' }
				);
			}
			animate(
				scrollIndicator,
				{ y: -8 },
				{ duration: 0.3, easing: 'ease-out' }
			);
		});

		scrollIndicator.addEventListener('mouseleave', () => {
			animate(
				scrollIndicator,
				{ y: 0 },
				{ duration: 0.3, easing: 'ease-out' }
			);
		});
	}

	// Particle system
	const particlesContainer = document.getElementById('particles');
	if (!particlesContainer) return;

	const particleCount = 50;
	const particles: Array<{ outer: HTMLElement; inner: HTMLElement; baseX: number; baseY: number }> = [];
	const mouse = { x: -9999, y: -9999 };
	const repelRadius = 250; // Larger radius for earlier repel
	const maxPush = 80; // Maximum push distance

	// Create particles with nested elements
	for (let i = 0; i < particleCount; i++) {
		const particleOuter = document.createElement('div');
		particleOuter.className = 'particle';

		const particleInner = document.createElement('div');
		particleInner.className = 'particle-inner';

		particleOuter.appendChild(particleInner);

		// Keep particles within bounds with padding
		const padding = 50;
		const x = padding + Math.random() * (window.innerWidth - padding * 2);
		const y = padding + Math.random() * (window.innerHeight - padding * 2);

		particleOuter.style.left = `${x}px`;
		particleOuter.style.top = `${y}px`;

		particlesContainer.appendChild(particleOuter);

		particles.push({
			outer: particleOuter,
			inner: particleInner,
			baseX: x,
			baseY: y
		});

		// Animate outer element with Motion - gentler movement
		animate(
			particleOuter,
			{
				x: [0, Math.random() * 40 - 20, 0],
				y: [0, Math.random() * 40 - 20, 0]
			},
			{
				duration: 10 + Math.random() * 10,
				repeat: Infinity,
				easing: 'ease-in-out'
			}
		);
	}

	// Track mouse position
	document.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	// Soft mouse repel effect on inner element
	function updateParticles() {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		particles.forEach((particle) => {
			const rect = particle.outer.getBoundingClientRect();
			const particleX = rect.left + rect.width / 2;
			const particleY = rect.top + rect.height / 2;

			const dx = particleX - mouse.x;
			const dy = particleY - mouse.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < repelRadius && distance > 0) {
				// Softer easing function for gradual repel
				const force = Math.pow((repelRadius - distance) / repelRadius, 2);
				const pushDistance = force * maxPush;

				const pushX = (dx / distance) * pushDistance;
				const pushY = (dy / distance) * pushDistance;

				// Clamp to prevent overflow
				const finalX = Math.max(0, Math.min(viewportWidth, particleX + pushX));
				const finalY = Math.max(0, Math.min(viewportHeight, particleY + pushY));

				const clampedPushX = finalX - particleX;
				const clampedPushY = finalY - particleY;

				// Apply repel to inner element only
				particle.inner.style.transform = `translate(${clampedPushX}px, ${clampedPushY}px)`;
				particle.inner.style.opacity = `${0.3 + force * 0.3}`;
			} else {
				particle.inner.style.transform = 'translate(0, 0)';
				particle.inner.style.opacity = '0.3';
			}
		});

		requestAnimationFrame(updateParticles);
	}

	updateParticles();
});
