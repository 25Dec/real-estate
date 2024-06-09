export default {
	root: ({ context, props }) => ({
		class: [
			// Font
			'font-sans leading-6',
			'sm:text-sm',

			// Spacing
			'm-0',
			'py-1.5 px-3',

			// Shape
			'rounded-md',
			'appearance-none',

			// Colors
			'text-surface-900',
			'placeholder:text-surface-400',
			'bg-surface-0',
			'ring-1 ring-inset ring-offset-0',
			'shadow-sm',
			{ ' ring-surface-300': !props.invalid },

			// Invalid State
			{ 'ring-red-500': props.invalid },

			// States
			{
				'outline-none focus:ring-primary-500': !context.disabled,
				'opacity-60 select-none pointer-events-none cursor-default':
					context.disabled,
			},

			// Misc
			'appearance-none',
			'transition-colors duration-200',
		],
	}),
};
