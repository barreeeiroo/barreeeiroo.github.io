import { animate } from 'motion';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	// Animate hero section on page load
	animateHero();

	// Set up intersection observer for table rows
	setupRowsObserver();

	// Set up tech stack and description interactions
	setupInteractions();
});

function animateHero() {
	// Animate the "Complete Collection" label
	const label = document.querySelector('.archive-label');
	if (label) {
		animate(
			label,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.5, easing: 'ease-out' }
		);
	}

	// Animate the main heading
	const heading = document.querySelector('.archive-heading');
	if (heading) {
		animate(
			heading,
			{ opacity: [0, 1], y: [-30, 0] },
			{ duration: 0.6, delay: 0.15, easing: 'ease-out' }
		);
	}

	// Animate the description
	const description = document.querySelector('.archive-description');
	if (description) {
		animate(
			description,
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.5, delay: 0.3, easing: 'ease-out' }
		);
	}
}

function setupRowsObserver() {
	const observerOptions = {
		root: null,
		threshold: 0.2, // Trigger when 20% of the row is visible
		rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
	};

	const animatedRows = new Set<Element>();

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !animatedRows.has(entry.target)) {
				animatedRows.add(entry.target);
				animateRow(entry.target as HTMLElement);
			}
		});
	}, observerOptions);

	// Observe all tech rows
	const rows = document.querySelectorAll('.tech-row');
	rows.forEach((row) => {
		observer.observe(row);
	});

	// Also observe the table header
	const tableHeader = document.querySelector('thead tr');
	if (tableHeader) {
		observer.observe(tableHeader);
	}
}

function animateRow(element: HTMLElement) {
	// Check if this is the table header
	if (element.tagName === 'TR' && element.closest('thead')) {
		animate(
			element,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.5, easing: 'ease-out' }
		);
		return;
	}

	// Animate the row sliding in from the left
	animate(
		element,
		{ opacity: [0, 1], x: [-30, 0] },
		{ duration: 0.5, easing: 'ease-out' }
	);

	// Animate the year column
	const yearCell = element.querySelector('td:first-child');
	if (yearCell) {
		animate(
			yearCell,
			{ opacity: [0, 1] },
			{ duration: 0.4, delay: 0.1, easing: 'ease-out' }
		);
	}

	// Animate the project title
	const titleCell = element.querySelector('td:nth-child(2)');
	if (titleCell) {
		animate(
			titleCell,
			{ opacity: [0, 1] },
			{ duration: 0.4, delay: 0.15, easing: 'ease-out' }
		);
	}

	// Animate the company cell (hidden on mobile)
	const companyCell = element.querySelector('td:nth-child(3)');
	if (companyCell) {
		animate(
			companyCell,
			{ opacity: [0, 1] },
			{ duration: 0.4, delay: 0.2, easing: 'ease-out' }
		);
	}

	// Animate tech tags one by one
	const techTags = element.querySelectorAll('.tech-tag');
	techTags.forEach((tag, index) => {
		animate(
			tag,
			{ opacity: [0, 1], scale: [0.8, 1] },
			{ duration: 0.3, delay: 0.25 + index * 0.05, easing: 'ease-out' }
		);
	});

	// Animate the links
	const linksCell = element.querySelector('td:last-child');
	if (linksCell) {
		animate(
			linksCell,
			{ opacity: [0, 1] },
			{ duration: 0.4, delay: 0.3, easing: 'ease-out' }
		);
	}
}

function setupInteractions() {
	// Handle mobile click/tap to expand tech stack inline
	const techRows = document.querySelectorAll('.tech-row');

	techRows.forEach(row => {
		const moreBtn = row.querySelector('.tech-more-btn');

		if (moreBtn) {
			// Toggle expansion on button click (for mobile/touch devices)
			moreBtn.addEventListener('click', (e) => {
				e.stopPropagation();

				// Close all other expanded rows
				techRows.forEach(r => {
					if (r !== row) {
						r.classList.remove('expanded');
					}
				});

				// Toggle current row expansion
				row.classList.toggle('expanded');
			});
		}

		// Toggle description on row click (for mobile) or make it appear on hover (desktop)
		row.addEventListener('click', (e) => {
			// Don't toggle if clicking on a link or the tech more button
			if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('.tech-more-btn')) {
				return;
			}

			// Close all other descriptions
			techRows.forEach(r => {
				if (r !== row) {
					r.classList.remove('show-description');
				}
			});

			// Toggle current description
			row.classList.toggle('show-description');
		});
	});

	// Close expansion when clicking outside
	document.addEventListener('click', (e) => {
		if (!(e.target as HTMLElement).closest('.tech-row') && !(e.target as HTMLElement).closest('.description-row')) {
			techRows.forEach(row => {
				row.classList.remove('expanded');
				row.classList.remove('show-description');
			});
		}
	});

	// Close expansion on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			techRows.forEach(row => {
				row.classList.remove('expanded');
				row.classList.remove('show-description');
			});
		}
	});
}
