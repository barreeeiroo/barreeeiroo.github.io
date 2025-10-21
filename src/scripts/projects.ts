import { animate } from 'motion';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	// Animate hero section on page load
	animateHero();

	// Set up intersection observer for projects
	setupProjectsObserver();
});

function animateHero() {
	// Animate the "Portfolio" label
	const label = document.querySelector('.projects-label');
	if (label) {
		animate(
			label,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.5, easing: 'ease-out' }
		);
	}

	// Animate the main heading
	const heading = document.querySelector('.projects-heading');
	if (heading) {
		animate(
			heading,
			{ opacity: [0, 1], y: [-30, 0] },
			{ duration: 0.6, delay: 0.15, easing: 'ease-out' }
		);
	}

	// Animate the description
	const description = document.querySelector('.projects-description');
	if (description) {
		animate(
			description,
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.5, delay: 0.3, easing: 'ease-out' }
		);
	}
}

function setupProjectsObserver() {
	const observerOptions = {
		root: null,
		threshold: 0.15, // Trigger when 15% of the project is visible
		rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
	};

	const animatedProjects = new Set<Element>();

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !animatedProjects.has(entry.target)) {
				animatedProjects.add(entry.target);
				animateProject(entry.target as HTMLElement);
			}
		});
	}, observerOptions);

	// Observe all featured projects
	const projects = document.querySelectorAll('.featured-project');
	projects.forEach((project) => {
		observer.observe(project);
	});

	// Observe the "View All Projects Archive" button
	const viewAllButton = document.querySelector('.view-all-button');
	if (viewAllButton) {
		observer.observe(viewAllButton);
	}
}

function animateProject(element: HTMLElement) {
	// Check if this is the "View All Projects Archive" button
	if (element.classList.contains('view-all-button')) {
		animate(
			element,
			{ opacity: [0, 1], y: [30, 0] },
			{ duration: 0.6, easing: 'ease-out' }
		);
		return;
	}

	// Animate the entire project card
	animate(
		element,
		{ opacity: [0, 1], y: [40, 0] },
		{ duration: 0.7, easing: 'ease-out' }
	);

	// Animate the image with a slight delay
	const image = element.querySelector('.project-image');
	if (image) {
		animate(
			image,
			{ opacity: [0, 1], scale: [0.95, 1] },
			{ duration: 0.6, delay: 0.15, easing: 'ease-out' }
		);
	}

	// Animate the content area
	const content = element.querySelector('.project-content');
	if (content) {
		// Animate label
		const label = content.querySelector('.project-label');
		if (label) {
			animate(
				label,
				{ opacity: [0, 1], x: [-20, 0] },
				{ duration: 0.4, delay: 0.2, easing: 'ease-out' }
			);
		}

		// Animate title
		const title = content.querySelector('.project-title');
		if (title) {
			animate(
				title,
				{ opacity: [0, 1], x: [-20, 0] },
				{ duration: 0.5, delay: 0.3, easing: 'ease-out' }
			);
		}

		// Animate description
		const description = content.querySelector('.project-description');
		if (description) {
			animate(
				description,
				{ opacity: [0, 1], y: [20, 0] },
				{ duration: 0.5, delay: 0.4, easing: 'ease-out' }
			);
		}

		// Animate tech tags
		const techTags = content.querySelectorAll('.tech-tag');
		techTags.forEach((tag, index) => {
			animate(
				tag,
				{ opacity: [0, 1], scale: [0.8, 1] },
				{ duration: 0.3, delay: 0.5 + index * 0.05, easing: 'ease-out' }
			);
		});

		// Animate links
		const links = content.querySelectorAll('.project-link');
		links.forEach((link, index) => {
			animate(
				link,
				{ opacity: [0, 1], x: [-10, 0] },
				{ duration: 0.4, delay: 0.6 + index * 0.1, easing: 'ease-out' }
			);
		});
	}
}
