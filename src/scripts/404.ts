import { accessibleAnimate, getAnimationDelay } from '../utils/motion';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	// Animate 404 number
	const errorNumber = document.querySelector('.error-number');
	if (errorNumber) {
		accessibleAnimate(
			errorNumber,
			{ opacity: [0, 1], scale: [0.8, 1] },
			{ duration: 0.8, easing: 'ease-out' }
		);
	}

	// Animate error label
	const errorLabel = document.querySelector('.error-label');
	if (errorLabel) {
		accessibleAnimate(
			errorLabel,
			{ opacity: [0, 1], y: [-10, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.2), easing: 'ease-out' }
		);
	}

	// Animate heading
	const heading = document.querySelector('.error-heading');
	if (heading) {
		accessibleAnimate(
			heading,
			{ opacity: [0, 1], y: [-20, 0] },
			{ duration: 0.6, delay: getAnimationDelay(0.3), easing: 'ease-out' }
		);
	}

	// Animate description
	const description = document.querySelector('.error-description');
	if (description) {
		accessibleAnimate(
			description,
			{ opacity: [0, 1], x: [-20, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.45), easing: 'ease-out' }
		);
	}

	// Animate buttons with stagger
	const buttons = document.querySelectorAll('.error-button');
	buttons.forEach((button, index) => {
		accessibleAnimate(
			button,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.5, delay: getAnimationDelay(0.6 + index * 0.1), easing: 'ease-out' }
		);
	});

	// Animate decorative elements with stagger
	const decorations = document.querySelectorAll('.error-decoration');
	decorations.forEach((decoration, index) => {
		accessibleAnimate(
			decoration,
			{ opacity: [0, 1], scale: [0, 1] },
			{ duration: 0.4, delay: getAnimationDelay(0.8 + index * 0.1), easing: 'ease-out' }
		);
	});
});
