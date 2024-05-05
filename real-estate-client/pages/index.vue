<script setup>
	definePageMeta({
		layout: 'empty',
	});

	const { projects } = storeToRefs(useProjectsStore());
	const { getProjects } = useProjectsStore();
	await getProjects();
	const TOP_OFFSET = 200;
	const showBackground = ref(false);
	const abouts = [
		{ title: 'Smart Home Design', icon: 'ion:home-outline' },
		{ title: 'Beautiful Scene Around', icon: 'ion:leaf-outline' },
		{ title: 'Exceptional Lifestyle', icon: 'ion:wine-outline' },
		{ title: 'Complete 24/7 Security', icon: 'ion:shield-checkmark-outline' },
	];
	const services = [
		{
			image: '/images/buy_home.png',
			title: 'Buy a Home',
			content:
				'Over 2 million+ homes for sale available on the website, we can match you with a house you will want to call home.',
		},
		{
			image: '/images/rent_home.png',
			title: 'Rent a Home',
			content:
				'Over 4 million+ homes for sale available on the website, we can match you with a house you will want to call home.',
		},
		{
			image: '/images/sell_home.png',
			title: 'Sell a Home',
			content:
				'Over 3 million+ homes for sale available on the website, we can match you with a house you will want to call home.',
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
		:class="`fixed w-full px-12 py-6 flex justify-between items-center z-50 transition duration-1000 ease-in-out ${
			showBackground ? 'backdrop-blur-3xl' : ''
		}`"
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

		<ul
			:class="`flex gap-12 font-semibold ${
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
					:to="{ hash: '#features' }"
					:external="true"
				>
					Features
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
				class="shadow-2xl rounded-lg"
			/>
		</div>
		<div
			v-motion-slide-visible-right
			class="flex flex-col gap-6 w-4/5"
		>
			<span class="text-4xl w-fit font-bold p-2 border-b">About Us</span>
			<span class="text-2xl font-semibold"
				>The Leading Real Estate Rental Marketplace.</span
			>
			<p>
				Over 39,000 people work for us in more than 70 countries all over the
				This breadth of global coverage, combined with specialist services
			</p>
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
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
		id="features"
		class="relative pt-[100px] px-4 h-fit flex flex-col items-center gap-12"
	>
		<span class="text-4xl font-bold p-2 border-b">Our Features</span>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			<FeatureCard
				v-for="feature in features"
				:key="features.name"
				:data="feature"
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
				<label for="fullName">Full Name:</label>
				<InputText
					id="fullName"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="email">Email:</label>
				<InputText
					id="email"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="email">Phone Number:</label>
				<InputText
					id="phoneNumber"
					size="large"
				/>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<label for="message">Message:</label>
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
		background: url('../public/images/test3.jpg');
		background-size: cover;
		min-height: 100vh;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
