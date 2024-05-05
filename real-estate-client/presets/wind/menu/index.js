export default {
	root: {
		class: [
			// Sizing and Shape
			'min-w-[12rem]',
			'rounded-md',
			// Spacing
			'p-1.5',
			// Colors
			'bg-surface-0',
			'text-surface-700',
			'ring-1 ring-surface-200',
		],
	},
	menu: {
		class: [
			// Spacings and Shape
			'list-none',
			'm-0',
			'p-0',
			'outline-none',
		],
	},
	menuitem: {
		class: [
			// Space
			'first:mt-0 mt-1',
		],
	},
	content: ({ context }) => ({
		class: [
			//Shape
			'rounded-md',

			// Colors
			{
				'text-surface-700': !context.focused,
				'bg-surface-100 text-primary-500': context.focused,
			},

			// Transitions
			'transition-shadow',
			'duration-200',

			// States
			'hover:text-primary-600',
			'hover:bg-surface-100',
		],
	}),
	action: {
		class: [
			'relative',

			// Font
			'font-semibold',

			// Flexbox
			'flex',
			'items-center',

			// Spacing
			'py-2',
			'px-3',

			// Misc
			'no-underline',
			'overflow-hidden',
			'cursor-pointer',
			'select-none',
		],
	},
	icon: {
		class: [
			// Spacing
			'mr-2',
			'leading-6',
			'text-sm',
		],
	},
	label: {
		class: ['leading-6', 'text-sm'],
	},
	submenuheader: {
		class: [
			// Font
			'font-semibold',
			'text-xs leading-6',

			// Spacing
			'm-0 ',
			'py-1',
			'px-3',

			// Shape
			'rounded-tl-none',
			'rounded-tr-none',

			// Colors
			'bg-surface-0',
			'text-surface-600',
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
