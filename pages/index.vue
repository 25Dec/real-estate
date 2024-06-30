<script setup>
	import { disablePageScroll, enablePageScroll } from 'scroll-lock';
	import {
		landingPageAboutUsContents,
		landingPageServicesContent,
	} from '~/constants';

	definePageMeta({
		layout: 'empty',
	});

	const { projects } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	const { authenticated } = storeToRefs(useAuthStore());
	const { logUserOut } = useAuthStore();

	await getProjects();

	const TOP_OFFSET = 700;
	const showBackground = ref(false);
	const openNavigation = ref(false);
	const navigations = ref([
		{ title: 'Home', to: '/', external: false },
		{ title: 'About', to: 'about', external: true },
		{ title: 'Services', to: 'services', external: true },
		{ title: 'Projects', to: 'projects', external: true },
		{ title: 'Contact', to: 'contact', external: true },
		{
			title: 'Login',
			to: '/login',
			external: false,
			onlyMobile: true,
		},
	]);
	console.log(navigations.value);
	const option = ref();
	const options = ref([
		{
			label: 'Logout',
			command: () => logUserOut(),
		},
	]);
	const user = ref({});

	if (process.client) {
		user.value = JSON.parse(localStorage.getItem('user')) ?? {};
	}

	const toggleNavigation = () => {
		if (openNavigation.value) {
			openNavigation.value = false;
			enablePageScroll();
		} else {
			openNavigation.value = true;
			disablePageScroll();
		}
	};
	const handleClick = () => {
		if (!openNavigation.value) return;

		enablePageScroll();
		openNavigation.value = false;
	};
	const toggleOption = (event) => {
		option.value.toggle(event);
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
	<div
		:class="`fixed top-0 left-0 w-full z-50 ${
			showBackground ? 'backdrop-blur-xl border-b' : ''
		} ${openNavigation ? 'backdrop-blur-xl' : ''}`"
	>
		<div
			class="flex justify-center items-center px-4 lg:px-7 xl:px-10 max-lg:py-4"
		>
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

			<div
				:class="`${
					openNavigation ? 'flex' : 'hidden'
				} fixed w-full top-[4rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto`"
			>
				<div
					:class="`relative w-full z-50 flex flex-col items-center justify-center m-auto lg:flex-row text-white ${
						openNavigation ? 'backdrop-blur-xl' : ''
					}`"
				>
					<NuxtLink
						v-for="item in navigations"
						:key="item['title']"
						:to="item['external'] ? { hash: item['to'] } : item['to']"
						:external="item['external']"
						@click="handleClick"
						:class="`font-semibold hover:scale-150 hover:-translate-x-6 transition duration-500 ease-in-out block relative uppercase px-6 py-6 md:py-8 lg:-mr-0.25 lg:leading-5 xl:px-12 ${
							item['onlyMobile'] ? 'lg:hidden' : ''
						}  ${showBackground ? 'text-black' : 'text-white'}`"
					>
						{{ item['title'] }}
					</NuxtLink>
				</div>
			</div>

			<Button
				v-if="!authenticated"
				outlined
				severity="secondary"
				:class="`hidden lg:flex font-semibold ${
					showBackground ? 'text-black' : 'text-white'
				}`"
			>
				<NuxtLink to="/login"> Login </NuxtLink>
			</Button>

			<div class="ml-auto flex gap-6">
				<Avatar
					v-if="authenticated"
					shape="square"
					:label="user['display_name']?.substring(0, 3)"
					@click="(event) => toggleOption(event)"
				/>

				<Menu
					ref="option"
					:model="options"
					:popup="true"
					class="hidden lg:block"
				/>

				<div class="lg:hidden">
					<Icon
						name="line-md:menu"
						:class="`text-2xl ${showBackground ? 'text-black' : 'text-white'}`"
						@click="toggleNavigation"
					/>
				</div>
			</div>
		</div>
	</div>

	<section
		id="home"
		class="relative lg:pt-[100px] w-full px-4 h-fit flex flex-col items-center gap-12 brightness-50"
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
			class="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 w-full lg:w-4/5"
		>
			<span class="text-4xl font-bold p-2 border-b">About Us</span>
			<span class="text-2xl font-semibold"
				>Provide service to manage real estate</span
			>
			<div class="grid grid-cols-2 gap-6">
				<AboutCard
					v-for="about in landingPageAboutUsContents"
					:key="about.title"
					:data="about"
				/>
			</div>
			<NuxtLink
				:to="{ hash: 'services' }"
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
		<div class="flex justify-center items-center gap-6 flex-wrap">
			<ServiceCard
				v-for="service in landingPageServicesContent"
				:key="service.title"
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
				:key="project.id"
				:data="project"
			/>
		</div>
	</section>

	<section
		id="contact"
		class="relative py-[100px] px-4 h-screen flex flex-col items-center gap-12"
	>
		<span class="text-4xl font-bold p-2 border-b">Send Us Message</span>
		<div
			v-motion-pop-visible
			class="flex flex-col w-full lg:w-1/2 gap-4"
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
