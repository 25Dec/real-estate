export default {
	root: {
		class: 'overflow-x-auto',
	},
	menu: {
		class: [
			// Flexbox
			'flex flex-1',

			// Spacing
			'list-none',
			'p-0 m-0',

			// Colors
			'bg-surface-0',
			'border-b border-surface-200',
			'text-surface-900',
		],
	},
	menuitem: {
		class: 'mr-0',
	},
	action: ({ context, state }) => ({
		class: [
			'relative',

			// Font
			'font-medium',
			'text-md',

			// Flexbox and Alignment
			'flex items-center',

			// Spacing
			'py-4 px-3',
			'-mb-px',

			// Shape
			'border-b-2',
			'rounded-t-md',

			// Colors and Conditions
			{
				'border-surface-200': state.d_activeIndex !== context.index,
				'bg-surface-0': state.d_activeIndex !== context.index,
				'text-surface-700': state.d_activeIndex !== context.index,
				'bg-surface-0': state.d_activeIndex === context.index,
				'border-primary-500': state.d_activeIndex === context.index,
				'text-primary-500': state.d_activeIndex === context.index,
			},

			// States
			'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset',
			'focus-visible:ring-primary-500',
			{
				'hover:bg-surface-0': state.d_activeIndex !== context.index,
				'hover:border-surface-400': state.d_activeIndex !== context.index,
				'hover:text-surface-900': state.d_activeIndex !== context.index,
			},

			// Transitions
			'transition-all duration-200',

			// Misc
			'cursor-pointer select-none text-decoration-none',
			'overflow-hidden',
			'user-select-none',
			'whitespace-nowrap',
		],
	}),
	icon: {
		class: 'mr-2',
	},
};
