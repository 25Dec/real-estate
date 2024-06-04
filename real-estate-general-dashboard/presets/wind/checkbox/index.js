export default {
	root: {
		class: [
			'relative',

			// Alignment
			'inline-flex',
			'align-bottom',

			// Size
			'w-4',
			'h-4',

			// Misc
			'cursor-default',
			'select-none',
		],
	},
	box: ({ props, context }) => ({
		class: [
			// Alignment
			'flex',
			'items-center',
			'justify-center',

			// Size
			'w-4',
			'h-4',

			// Shape
			'rounded',
			'border',

			// Colors
			'text-surface-600',
			{
				'border-surface-300 bg-surface-0': !context.checked && !props.invalid,
				'border-primary-500 bg-primary-500': context.checked,
			},

			// Invalid State
			{ 'border-red-500': props.invalid },

			{
				'ring-2 ring-primary-500': !props.disabled && context.focused,
				'cursor-default opacity-60': props.disabled,
			},

			// States
			{
				'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500':
					!props.disabled,
				'cursor-default opacity-60': props.disabled,
			},

			// Transitions
			'transition-colors',
			'duration-200',
		],
	}),
	input: {
		class: [
			'peer',

			// Size
			'w-full ',
			'h-full',

			// Position
			'absolute',
			'top-0 left-0',
			'z-10',

			// Spacing
			'p-0',
			'm-0',

			// Shape
			'rounded',
			'border',

			// Shape
			'opacity-0',
			'rounded-md',
			'outline-none',
			'border-2 border-surface-300',

			// Misc
			'appearance-none',
		],
	},
	icon: {
		class: [
			// Font
			'text-normal',

			// Size
			'w-3',
			'h-3',

			// Colors
			'text-white',

			// Transitions
			'transition-all',
			'duration-200',
		],
	},
};
