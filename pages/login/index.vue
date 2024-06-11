<script setup>
	definePageMeta({ layout: 'empty' });

	import { useToast } from 'primevue/usetoast';

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
	<div class="w-screen h-screen">
		<img
			class="w-full h-full"
			src="/public/images/login_bg.jpg"
			alt="Login Background"
		/>
		<form
			@submit.prevent="onLogin"
			class="fixed right-0 top-0 w-1/2 h-full rounded-l-3xl bg-white flex flex-col justify-center items-center gap-10"
		>
			<div class="flex flex-col justify-center items-center gap-4">
				<span class="font-bold text-3xl">Login</span>
				<span class="font-semibold text-xl">Hi, Welcome to Propertier 👋🏻</span>
			</div>
			<div class="flex flex-col gap-2 w-1/2">
				<div class="flex flex-col gap-2">
					<label for="loginName">Login Name</label>
					<InputText
						required
						id="loginName"
						v-model="loginName"
						placeholder="Login Name"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="password">Password</label>
					<Password
						required
						id="password"
						v-model="password"
						placeholder="Password"
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
	</div>
</template>
