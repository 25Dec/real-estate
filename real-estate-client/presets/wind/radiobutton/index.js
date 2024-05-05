export default {
	root: {
		class: [
			'relative',

			// Flexbox & Alignment
			'inline-flex',
			'align-bottom',

			// Size
			'w-4 h-4',

			// Misc
			'cursor-default',
			'select-none',
		],
	},
	box: ({ props }) => ({
		class: [
			// Flexbox
			'flex justify-center items-center',

			// Size
			'w-4 h-4',
			'text-sm',
			'font-medium',

			// Shape
			'border-2',
			'rounded-full',

			// Transition
			'transition duration-200 ease-in-out',

			// Colors
			{
				'text-surface-700':
					props.value !== props.modelValue && props.value !== undefined,
				'bg-surface-0':
					props.value !== props.modelValue && props.value !== undefined,
				'border-surface-300':
					props.value !== props.modelValue &&
					props.value !== undefined &&
					!props.invalid,
				'border-primary-500':
					props.value == props.modelValue && props.value !== undefined,
			},

			// Invalid State
			{ 'border-red-500': props.invalid },

			// States
			{
				'outline-none outline-offset-0': !props.disabled,
				'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 peer-focus-visible:ring-primary-500':
					!props.disabled,
				'opacity-60 cursor-default': props.disabled,
			},
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
			'opacity-0',
			'rounded-md',
			'outline-none',
			'border-2 border-surface-300',

			// Misc
			'appearance-none',
			'cursor-default',
		],
	},
	icon: {
		class: 'hidden',
	},
};
