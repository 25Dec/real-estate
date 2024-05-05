export default {
	root: ({ props, state }) => ({
		class: [
			// Display and Position
			'inline-flex',
			'relative',

			// Shape
			'rounded-md',
			'shadow-sm',

			// Color and Background
			'bg-surface-0',

			// States
			{
				'ring-1 ring-inset': !state.focused,
				'ring-2 ring-inset ring-primary-500': state.focused,
			},

			{
				'ring-surface-300': !props.invalid && !state.focused,
			},

			// Invalid State
			{ 'ring-red-500': props.invalid && !state.focused },

			// Misc
			'cursor-default',
			'select-none',
			{ 'opacity-60': props.disabled, 'pointer-events-none': props.disabled },
		],
	}),
	input: ({ props }) => ({
		class: [
			//Font
			'font-sans',
			'leading-6',
			'sm:text-sm',

			// Display
			'block',
			'flex-auto',

			// Color and Background
			'bg-transparent',
			'border-0',
			{
				'text-surface-800': props.modelValue != undefined,
				'text-surface-400': props.modelValue == undefined,
			},
			'placeholder:text-surface-400',

			// Sizing and Spacing
			'w-[1%]',
			'py-1.5 px-3',
			{ 'pr-7': props.showClear },

			//Shape
			'rounded-none',

			// Transitions
			'transition',
			'duration-200',

			// States
			'focus:outline-none focus:shadow-none',

			// Misc
			'relative',
			'cursor-pointer',
			'overflow-hidden overflow-ellipsis',
			'whitespace-nowrap',
			'appearance-none',
		],
	}),
	trigger: {
		class: [
			//Font
			'sm:text-sm',

			// Flexbox
			'flex items-center justify-center',
			'shrink-0',

			// Color and Background
			'bg-transparent',
			'text-surface-500',

			// Size
			'w-12',

			// Shape
			'rounded-tr-md',
			'rounded-br-md',
		],
	},
	panel: {
		class: [
			// Position
			'absolute top-0 left-0',
			'mt-2',

			// Shape
			'border-0',
			'rounded-md',
			'shadow-md',

			// Color
			'bg-surface-0',
			'text-surface-800',
			'ring-1 ring-inset ring-surface-300',
		],
	},
	wrapper: {
		class: [
			// Sizing
			'max-h-[15rem]',

			// Misc
			'overflow-auto',
		],
	},
	list: {
		class: 'py-1 list-none m-0',
	},
	item: ({ context }) => ({
		class: [
			// Font
			'sm:text-sm',
			'leading-none',
			{ 'font-normal': !context.selected, 'font-bold': context.selected },

			// Position
			'relative',

			// Shape
			'border-0',
			'rounded-none',

			// Spacing
			'm-0',
			'py-2 px-4',

			// Color
			{
				'text-surface-700':
					!context.focused && !context.selected && !context.disabled,
			},
			{
				'text-surface-600':
					!context.focused && !context.selected && context.disabled,
			},
			{
				'bg-surface-200 text-surface-700': context.focused && !context.selected,
			},
			{
				'bg-primary-500 text-white': context.focused && context.selected,
			},
			{
				'bg-transparent text-surface-700': !context.focused && context.selected,
			},

			//States
			'hover:bg-primary-500 hover:text-white',
			'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',

			// Misc
			{ 'pointer-events-none cursor-default': context.disabled },
			{ 'cursor-pointer': !context.disabled },
			'overflow-hidden',
			'whitespace-nowrap',
		],
	}),
	itemgroup: {
		class: [
			//Font
			'font-bold',
			'sm:text-sm',

			// Spacing
			'm-0',
			'py-2 px-4',

			// Color
			'text-surface-800',
			'bg-surface-0',

			// Misc
			'cursor-auto',
		],
	},
	emptymessage: {
		class: [
			// Font
			'leading-none',
			'sm:text-sm',

			// Spacing
			'py-2 px-4',

			// Color
			'text-surface-800',
			'bg-transparent',
		],
	},
	header: {
		class: [
			// Spacing
			'p-0',
			'm-0',

			//Shape
			'rounded-tl-md',
			'rounded-tr-md',

			// Color
			'text-surface-700',
			'bg-surface-100',
		],
	},
	filtercontainer: {
		class: 'relative',
	},
	filterinput: {
		class: [
			// Font
			'font-sans',
			'leading-none',
			'sm:text-sm',

			// Sizing
			'py-1.5 px-3',
			'pr-7',
			'-mr-7',
			'w-full',

			//Color
			'text-surface-700',
			'bg-surface-0',
			'placeholder:text-surface-400',
			'ring-1 ring-inset ring-surface-300',

			// Shape
			'border-0',
			'rounded-tl-md',
			'rounded-tr-md',
			'appearance-none',

			// States
			'focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0',
			'focus:ring-primary-600',

			// Misc
			'appearance-none',
		],
	},
	filtericon: {
		class: ['absolute', 'top-1/2 right-3', '-mt-2'],
	},
	clearicon: {
		class: [
			// Color
			'text-surface-500',

			// Position
			'absolute',
			'top-1/2',
			'right-12',

			// Spacing
			'-mt-2',
		],
	},
	transition: {
		enterFromClass: 'opacity-0 scale-y-[0.8]',
		enterActiveClass:
			'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
		leaveActiveClass: 'transition-opacity duration-100 ease-linear',
		leaveToClass: 'opacity-0',
	},
};
