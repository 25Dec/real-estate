export default {
	root: ({ context, props }) => ({
		class: [
			// Position
			'absolute',
			// Spacing
			{
				'px-1.5':
					context?.right ||
					context?.left ||
					(!context?.right &&
						!context?.left &&
						!context?.top &&
						!context?.bottom),
				'py-1.5': context?.top || context?.bottom,
			},
		],
	}),
	arrow: {
		class: 'hidden',
	},
	text: {
		class: [
			// Size
			'text-xs leading-none',

			// Spacing
			'p-2',

			// Shape
			'rounded-md',

			// Color
			'text-surface-900',
			'bg-surface-0',
			'ring-1 ring-inset ring-surface-200 ring-offset-0',

			// Misc
			'whitespace-pre-line',
			'break-words',
		],
	},
};
