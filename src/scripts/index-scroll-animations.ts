import { accessibleAnimate, getAnimationDelay } from '../utils/motion';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	const observerOptions = {
		root: null,
		threshold: 0.15, // Trigger when 15% of the section is visible
		rootMargin: '0px 0px -100px 0px' // Trigger slightly before element is fully in view
	};

	const animatedSections = new Set<Element>();

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !animatedSections.has(entry.target)) {
				animatedSections.add(entry.target);
				animateSection(entry.target as HTMLElement);
			}
		});
	}, observerOptions);

	// Observe all sections
	const sections = document.querySelectorAll('.section-animate');
	sections.forEach((section) => {
		observer.observe(section);
	});
});

function animateSection(section: HTMLElement) {
	// Animate section heading
	const heading = section.querySelector('.section-heading');
	if (heading) {
		accessibleAnimate(
			heading,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.6, easing: 'ease-out' }
		);
	}

	// Animate section content
	const content = section.querySelector('.section-content');
	if (content) {
		accessibleAnimate(
			content,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.6, delay: getAnimationDelay(0.2), easing: 'ease-out' }
		);
	}

	// Special animations for specific sections
	const sectionId = section.getAttribute('id');

	switch (sectionId) {
		case 'about':
			animateAboutSection(section);
			break;
		case 'experience':
			animateExperienceSection(section);
			break;
		case 'projects':
			animateProjectsSection(section);
			break;
		case 'contact':
			animateContactSection(section);
			break;
	}
}

function animateAboutSection(section: HTMLElement) {
	// Animate paragraphs with stagger
	const paragraphs = section.querySelectorAll('p');
	paragraphs.forEach((p, index) => {
		accessibleAnimate(
			p,
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.3 + index * 0.1), easing: 'ease-out' }
		);
	});

	// Animate technologies list items
	const techItems = section.querySelectorAll('.technologies-list li');
	techItems.forEach((item, index) => {
		accessibleAnimate(
			item,
			{ opacity: [0, 1], x: [-15, 0] },
			{ duration: 0.4, delay: getAnimationDelay(0.6 + index * 0.05), easing: 'ease-out' }
		);
	});

	// Animate profile photo
	const photoContainer = section.querySelector('.group');
	if (photoContainer) {
		accessibleAnimate(
			photoContainer,
			{ opacity: [0, 1], scale: [0.95, 1] },
			{ duration: 0.6, delay: getAnimationDelay(0.4), easing: 'ease-out' }
		);
	}
}

function animateExperienceSection(section: HTMLElement) {
	// Animate work tabs
	const tabs = section.querySelectorAll('.work-tab');
	tabs.forEach((tab, index) => {
		accessibleAnimate(
			tab,
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.4, delay: getAnimationDelay(0.3 + index * 0.08), easing: 'ease-out' }
		);
	});

	// The work content will be animated by its own script when tabs are clicked
	// But we'll animate the first one here
	const firstContent = section.querySelector('.work-content[data-index="0"]');
	if (firstContent) {
		accessibleAnimate(
			firstContent,
			{ opacity: [0, 1], x: [20, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.5), easing: 'ease-out' }
		);
	}
}

function animateProjectsSection(section: HTMLElement) {
	// Animate featured project cards
	const projects = section.querySelectorAll('.featured-project');
	projects.forEach((project, index) => {
		accessibleAnimate(
			project,
			{ opacity: [0, 1], y: [30, 0] },
			{ duration: 0.6, delay: getAnimationDelay(0.3 + (index * 0.2)), easing: 'ease-out' }
		);
	});

	// Animate the "View All Projects" button - find it in section-content
	const sectionContent = section.querySelector('.section-content');
	if (sectionContent) {
		// Find all .group elements and get the last one (the button)
		const groups = sectionContent.querySelectorAll('.group');
		const viewAllButton = groups[groups.length - 1];

		if (viewAllButton) {
			const delay = 0.3 + (projects.length * 0.2);
			accessibleAnimate(
				viewAllButton,
				{ opacity: [0, 1], y: [20, 0] },
				{ duration: 0.5, delay: getAnimationDelay(delay), easing: 'ease-out' }
			);
		}
	}
}

function animateContactSection(section: HTMLElement) {
	// Animate heading
	const heading = section.querySelector('h3');
	if (heading) {
		accessibleAnimate(
			heading,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.6, delay: getAnimationDelay(0.3), easing: 'ease-out' }
		);
	}

	// Animate paragraph
	const paragraph = section.querySelector('p');
	if (paragraph) {
		accessibleAnimate(
			paragraph,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.5), easing: 'ease-out' }
		);
	}

	// Animate button
	const button = section.querySelector('.group');
	if (button) {
		accessibleAnimate(
			button,
			{ opacity: [0, 1], scale: [0.95, 1] },
			{ duration: 0.5, delay: getAnimationDelay(0.7), easing: 'ease-out' }
		);
	}
}
