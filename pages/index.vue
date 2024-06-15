<script setup>
	definePageMeta({
		layout: 'empty',
	});

	const { projects } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	const { authenticated } = storeToRefs(useAuthStore());
	const { logUserOut } = useAuthStore();
	const router = useRouter();

	await getProjects();

	const TOP_OFFSET = 200;
	const abouts = [
		{ title: 'Real Estate Management', icon: 'ion:home-outline' },
		{
			title: 'Interactive Viewer',
			icon: 'material-symbols:interactive-space-outline',
		},
		{ title: 'Payment Management', icon: 'streamline:payment-10' },
		{ title: 'CRM Service', icon: 'streamline:information-desk-customer' },
	];
	const showBackground = ref(false);
	const menu = ref();
	const menuItems = ref([
		{
			label: 'Logout',
			command: () => logUserOut(),
		},
	]);
	const user = ref({});

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user')) ?? {};
	}

	const services = [
		{
			image: '/images/dashboard.png',
			title: 'Dashboard System',
			content:
				'Provide methods for project, user, and notification management. Manage all projects, users, and notifications in each project within the system.',
			action: {
				goto: {
					path: 'admin',
					external: false,
				},
			},
		},
		{
			image: '/images/detail_project_support.png',
			title: 'Detailed Project Support For Sales',
			content:
				'Provide project, CRM, and sales processes in a project. Support the sales department to enhance performance.',
			action: {
				goto: {
					path: '#projects',
					external: true,
				},
			},
		},
	];
	const features = [
		{ title: 'Parking Space', icon: 'ion:car-sport-outline' },
		{ title: 'Swimming Pool', icon: 'ion:water-outline' },
		{ title: 'Private Security', icon: 'ion:shield-checkmark-outline' },
		{ title: 'Medical Center', icon: 'ion:fitness-outline' },
		{ title: 'Library Area', icon: 'ion:library-outline' },
		{ title: 'King Size Beds', icon: 'ion:bed-outline' },
		{ title: 'Smart Homes', icon: 'ion:home-outline' },
		{ title: "Kid's Playland", icon: 'ion:football-outline' },
	];

	const toggleMenu = (event) => {
		menu.value.toggle(event);
	};
	const handleScroll = () => {
		if (window.scrollY >= TOP_OFFSET) {
			showBackground.value = true;
		} else {
			showBackground.value = false;
		}
	};

	if (process.client) {
		window.addEventListener('scroll', handleScroll);
	}
</script>

<template>
	<header
		:class="`fixed w-full px-6 py-6 flex justify-between items-center z-50 transition duration-1000 ease-in-out ${
			showBackground ? 'backdrop-blur-xl' : ''
		}`"
	>
		<div class="flex gap-12">
			<NuxtLink
				to="/"
				class="flex justify-center items-center gap-1"
			>
				<Icon
					name="line-md:home-simple"
					class="text-2xl text-[#10b981]"
				/>
				<span class="font-bold text-xl text-[#10b981]"> Propertier </span>
			</NuxtLink>

			<ul
				:class="`flex gap-12 font-semibold flex items-center ${
					showBackground ? '[&>li]:text-black' : '[&>li]:text-white'
				}`"
			>
				<li
					class="hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out"
				>
					<NuxtLink to="/"> Home </NuxtLink>
				</li>
				<li
					class="hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out"
				>
					<NuxtLink
						:to="{ hash: '#about' }"
						:external="true"
					>
						About
					</NuxtLink>
				</li>
				<li
					class="hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out"
				>
					<NuxtLink
						:to="{ hash: '#services' }"
						:external="true"
					>
						Services
					</NuxtLink>
				</li>
				<li
					class="hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out"
				>
					<NuxtLink
						:to="{ hash: '#projects' }"
						:external="true"
					>
						Projects
					</NuxtLink>
				</li>
				<li
					class="hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out"
				>
					<NuxtLink
						:to="{ hash: '#contact' }"
						:external="true"
					>
						Contact
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div>
			<ul class="flex gap-12 font-semibold flex items-center">
				<li>
					<Avatar
						v-if="authenticated"
						shape="square"
						:label="user['display_name']?.substring(0, 3)"
						@click="(event) => toggleMenu(event)"
					/>
					<Button
						v-if="!authenticated"
						outlined
						severity="secondary"
						:class="`font-semibold ${
							showBackground ? 'text-black' : 'text-white'
						}`"
					>
						<NuxtLink to="/login"> Login </NuxtLink>
					</Button>
					<Menu
						ref="menu"
						:model="menuItems"
						:popup="true"
					/>
				</li>
			</ul>
		</div>
	</header>

	<section
		id="home"
		class="relative pt-[100px] w-full px-4 h-fit flex flex-col items-center gap-12 brightness-50"
	></section>

	<section
		id="about"
		class="relative pt-[100px] px-4 h-fit grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden"
	>
		<div
			v-motion-slide-visible-left
			class="flex justify-end items-center"
		>
			<NuxtImg
				src="/images/about_banner.png"
				class="shadow-md rounded-lg"
			/>
		</div>
		<div
			v-motion-slide-visible-right
			class="flex flex-col gap-6 w-4/5"
		>
			<span class="text-4xl w-fit font-bold p-2 border-b">About Us</span>
			<span class="text-2xl font-semibold"
				>Provide service to manage real estate.</span
			>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<AboutCard
					v-for="about in abouts"
					:key="about.title"
					:data="about"
				/>
			</div>
			<NuxtLink
				:to="{ hash: '#services' }"
				:external="true"
			>
				<Button size="large">
					<span class="text-bold"> Our Services </span>
				</Button>
			</NuxtLink>
		</div>
	</section>

	<section
		id="services"
		class="relative pt-[100px] px-4 h-fit flex flex-col items-center gap-12"
	>
		<span class="text-4xl font-bold p-2 border-b">Our Services</span>
		<div class="flex items-center gap-6">
			<ServiceCard
				v-for="service in services"
				:key="services.title"
				:data="service"
			/>
		</div>
	</section>

	<section
		id="projects"
		class="relative pt-[100px] px-4 h-fit flex flex-col items-center gap-12"
	>
		<span class="text-4xl font-bold p-2 border-b">Available Projects</span>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			<ProjectCard
				v-for="project in projects"
				:key="projects.id"
				:data="project"
			/>
		</div>
	</section>

	<section
		id="contact"
		class="relative pt-[100px] px-4 h-screen flex flex-col items-center gap-12"
	>
		<span class="text-4xl font-bold p-2 border-b">Send Us Message</span>
		<div
			v-motion-pop-visible
			class="flex flex-col w-1/2 gap-4"
		>
			<div class="flex flex-1 flex-col gap-2">
				<label for="fullName">Full Name</label>
				<InputText
					id="fullName"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="email">Email</label>
				<InputText
					id="email"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="email">Phone Number</label>
				<InputText
					id="phoneNumber"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="message">Message</label>
				<Textarea
					rows="5"
					cols="30"
				/>
			</div>
			<div class="flex flex-1">
				<Button
					class="flex-1"
					label="Submit"
				/>
			</div>
		</div>
	</section>

	<footer
		class="w-full bg-[#131313] h-[120px] p-4 flex justify-center items-center"
	>
		<span class="text-white">&copy; Copyrights. All Rights Reserved</span>
	</footer>
</template>

<style scoped>
	#home {
		background: url('../public/images/home_banner.jpg');
		background-size: cover;
		min-height: 100vh;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
