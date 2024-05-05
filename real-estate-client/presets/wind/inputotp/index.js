export default {
	root: {
		class: [
			// Alignment
			'flex items-center',
			'gap-2',
		],
	},
	input: {
		root: ({ props, context, parent }) => ({
			class: [
				// Font
				'font-sans leading-6',

				// Flex & Alignment
				{ 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },
				'text-center',

				// Spacing
				'm-0',
				{
					'py-1.5 px-3 sm:text-sm': props.size == null,
				},

				// Size
				'w-8',

				// Colors
				'text-surface-900',
				'placeholder:text-surface-400',
				'bg-surface-0',
				'shadow-sm',
				{
					'ring-1 ring-inset ring-offset-0':
						parent.instance.$name !== 'InputGroup',
				},

				{ 'ring-surface-300': !props.invalid },

				// Invalid State
				{ 'ring-red-500': props.invalid },

				// Shape
				{ 'rounded-md': parent.instance.$name !== 'InputGroup' },
				{
					'first:rounded-l-md rounded-none last:rounded-r-md':
						parent.instance.$name == 'InputGroup',
				},
				{
					'border-0 border-y border-l last:border-r border-surface-300':
						parent.instance.$name == 'InputGroup',
				},
				{
					'first:ml-0 ml-[-1px]':
						parent.instance.$name == 'InputGroup' && !props.showButtons,
				},
				'appearance-none',

				// Interactions
				{
					'outline-none focus:ring-primary-500': !context.disabled,
					'opacity-60 select-none pointer-events-none cursor-default':
						context.disabled,
				},

				// Filled State *for FloatLabel
				{ filled: parent.instance?.$name == 'FloatLabel' && context.filled },
			],
		}),
	},
};
