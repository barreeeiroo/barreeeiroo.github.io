// Scroll spy to update URL hash based on visible section
document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section[id]');

	if (sections.length === 0) return;

	let isScrolling = false;
	let currentSection = '';

	// Function to update hash and navbar active state
	const updateHash = (sectionId: string) => {
		if (currentSection !== sectionId) {
			currentSection = sectionId;
			if (sectionId) {
				history.replaceState(null, '', `#${sectionId}`);
			} else {
				history.replaceState(null, '', window.location.pathname);
			}

			// Update navbar active states
			updateNavbarActiveState(sectionId);
		}
	};

	// Function to update navbar active state
	const updateNavbarActiveState = (sectionId: string) => {
		// Remove active class from all nav links
		const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
		navLinks.forEach(link => {
			link.classList.remove('active');
		});

		// Add active class to current section links
		if (sectionId) {
			const activeLinks = document.querySelectorAll(`[data-section="${sectionId}"]`);
			activeLinks.forEach(link => {
				link.classList.add('active');
			});
		}
	};

	// Check which section is in view
	const checkSections = () => {
		if (isScrolling) return;

		// If we're near the top, clear the hash
		if (window.scrollY < 100) {
			updateHash('');
			return;
		}

		let found = false;
		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			const sectionMiddle = rect.top + rect.height / 2;
			const viewportMiddle = window.innerHeight / 2;

			// Check if section middle is close to viewport middle
			if (Math.abs(sectionMiddle - viewportMiddle) < window.innerHeight / 3) {
				const id = section.getAttribute('id');
				if (id) {
					updateHash(id);
					found = true;
				}
			}
		});
	};

	// Use scroll event with throttling
	let scrollTimeout: number;
	window.addEventListener('scroll', () => {
		clearTimeout(scrollTimeout);
		scrollTimeout = window.setTimeout(checkSections, 100);
	}, { passive: true });

	// Initial check
	checkSections();

	// Handle smooth scroll for hash links and prevent default behavior
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

		if (anchor) {
			const href = anchor.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const targetSection = document.querySelector(href);
				const sectionId = href.substring(1);

				if (targetSection) {
					isScrolling = true;

					// Update active state immediately
					updateNavbarActiveState(sectionId);

					targetSection.scrollIntoView({ behavior: 'smooth' });

					// Re-enable observer after scroll completes
					setTimeout(() => {
						isScrolling = false;
					}, 1000);
				}
			}
		}
	});

	// Handle initial hash on page load
	if (window.location.hash) {
		const sectionId = window.location.hash.substring(1);
		updateNavbarActiveState(sectionId);
		setTimeout(() => {
			const target = document.querySelector(window.location.hash);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}, 100);
	}
});
