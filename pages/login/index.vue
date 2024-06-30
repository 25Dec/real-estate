<script setup>
	definePageMeta({ layout: 'empty' });

	const { authenticateUser } = useAuthStore();
	const { authenticated } = storeToRefs(useAuthStore());
	const router = useRouter();
	const toast = useToast();

	const loginName = ref('');
	const password = ref('');
	const isLoading = ref(false);

	const onLogin = async () => {
		isLoading.value = true;
		await authenticateUser(loginName.value, password.value);

		if (authenticated.value) {
			isLoading.value = false;
			router.push('/');
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Login Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			isLoading.value = false;
			toast.add({
				severity: 'danger',
				summary: 'Error',
				detail: 'Invalid Login Name or Password!',
				group: 'bl',
				life: 3000,
			});
		}
	};
</script>

<template>
	<!-- <div class="w-screen h-screen">
		<img
			class="w-full h-full"
			src="/public/images/login_bg.jpg"
			alt="Login Background"
		/>
		<form
			@submit.prevent="onLogin"
			class="fixed right-0 top-0 w-1/2 rounded-3xl p-8 md:p-14 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg flex flex-col justify-center items-center gap-10"
		>
			<div class="flex flex-col justify-center items-center gap-4">
				<span class="font-bold text-3xl text-white">Login</span>
				<span class="font-semibold text-xl text-white"
					>Hi, Welcome to Propertier👋🏻</span
				>
			</div>
			<div class="flex flex-col gap-2 w-1/2">
				<div class="flex flex-col gap-2">
					<label
						for="loginName"
						class="text-white"
						>Login Name</label
					>
					<InputText
						required
						id="loginName"
						v-model="loginName"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label
						for="password"
						class="text-white"
						>Password</label
					>
					<Password
						required
						id="password"
						v-model="password"
						toggleMask
						:feedback="false"
					/>
				</div>
			</div>
			<div class="w-1/2">
				<Button
					:loading="isLoading"
					type="submit"
					class="w-full"
					label="LOG IN"
				/>
			</div>
		</form>
	</div> -->

	<div class="w-screen h-screen flex items-center justify-center">
		<img
			class="w-full h-full"
			src="/public/images/login_bg.jpg"
			alt="Login Background"
		/>
		<form
			@submit.prevent="onLogin"
			class="fixed w-[90%] lg:w-1/2 lg:h-[95%] flex flex-col items-center justify-center gap-10 m-4 p-8 md:p-14 space-y-8 shadow-2xl rounded-3xl md:space-y-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-md"
		>
			<div class="flex flex-col justify-center items-center gap-4">
				<span class="font-bold text-3xl text-white">Login</span>
				<span class="font-semibold text-xl text-white"
					>Hi, Welcome to Propertier👋🏻</span
				>
			</div>
			<div class="flex flex-col gap-2 w-full lg:w-1/2">
				<div class="flex flex-col gap-2">
					<label
						for="loginName"
						class="text-white"
						>Login Name</label
					>
					<InputText
						required
						id="loginName"
						v-model="loginName"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label
						for="password"
						class="text-white"
						>Password</label
					>
					<Password
						required
						id="password"
						v-model="password"
						toggleMask
						:feedback="false"
					/>
				</div>
			</div>
			<div class="w-full lg:w-1/2">
				<Button
					:loading="isLoading"
					type="submit"
					class="w-full"
					label="LOGIN"
				/>
			</div>
		</form>
	</div>
</template>
