export default {
	root: ({ props }) => ({
		class: [
			'shadow-sm',
			{
				'opacity-60 select-none pointer-events-none cursor-default':
					props.disabled,
			},
		],
	}),
	button: ({ context, props }) => ({
		class: [
			'relative',
			// Font
			'text-sm',
			'leading-none',

			// Flex Alignment
			'inline-flex items-center align-bottom text-center',

			// Spacing
			'px-2.5 py-1.5',

			// Shape
			'ring-1',
			{ 'ring-surface-200': !props.invalid },
			'first:rounded-l-md first:rounded-tr-none first:rounded-br-none',
			'last:rounded-tl-none last:rounded-bl-none last:rounded-r-md ',

			// Color
			{
				'bg-surface-0': !context.active,
				'text-surface-700': !context.active,
				'bg-surface-100': context.active,
			},

			// Invalid State
			{ 'ring-red-500': props.invalid },

			// States
			'focus:outline-none focus:outline-offset-0 focus:ring-primary-500 focus:z-10',
			'hover:bg-surface-200',
			{
				'opacity-60 select-none pointer-events-none cursor-default':
					context.disabled,
			},

			// Transition
			'transition duration-200',

			// Misc
			'cursor-pointer select-none overflow-hidden',
		],
	}),
	label: {
		class: 'font-semibold',
	},
};
