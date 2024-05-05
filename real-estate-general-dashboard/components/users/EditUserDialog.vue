<script setup>
	import { accessToken, baseUrl } from '~/constants';

	const { visible, roles, data } = defineProps(['visible', 'roles', 'data']);
	const myVisible = ref(visible);

	const socialID = ref(data['social_id']);
	const phone = ref(data['phone']);
	const loginName = ref(data['login_name']);
	const password = ref(data['password']);
	const firstName = ref(data['first_name']);
	const lastName = ref(data['last_name']);
	const email = ref(data['email']);
	const type = ref(data['type']);
	const phoneVerified = ref(data['phone_verified']);
	const emailVerified = ref(data['email_verified']);
	const socialVerified = ref(data['social_verified']);

	const onSave = async () => {
		const newUserData = {
			...data,
			social_id: socialID.value,
			phone: phone.value,
			first_name: firstName.value,
			last_name: lastName.value,
			display_name: `${firstName.value} ${lastName.value}`,
			email: email.value,
			type: type.value['value'],
			phone_verified: phoneVerified.value,
			email_verified: emailVerified.value,
			social_verified: socialVerified.value,
			updated_at: new Date().toLocaleString(),
		};

		await $fetch(baseUrl + `/auth/account/${data['id']}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				access_token: accessToken,
			},
			body: newUserData,
		});

		myVisible.value = false;
	};
</script>

<template>
	<Dialog
		v-model:visible="myVisible"
		modal
		maximizable
		header="Header"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<span class="font-bold text-xl">User Details</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="firstName">Firste</label>
					<InputText
						id="firstName"
						placeholder="Firste"
						v-model.trim="firstName"
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last name</label>
					<InputText
						id="lastName"
						placeholder="Last name"
						v-model.trim="lastName"
						required
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="loginName">Login name</label>
					<InputText
						id="loginName"
						placeholder="Login name"
						v-model.trim="loginName"
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="password">Password</label>
					<Password
						id="password"
						placeholder="Password"
						v-model="password"
						:feedback="false"
						toggleMask
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="phone">Phone number</label>
					<InputText
						id="phone"
						placeholder="+84 9698 886 660"
						v-model.trim="phone"
						integeronly
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="phoneVerified">Phone verified</label>
					<InputText
						id="phoneVerified"
						placeholder="+84 9698 886 660"
						v-model.trim="phoneVerified"
						integeronly
						required
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">User role</label>
				<Dropdown
					id="type"
					class="flex-1"
					placeholder="Select user role"
					v-model="roles[roles.findIndex((role) => role.value == type)].value"
					:options="roles"
					optionLabel="name"
					optionValue="value"
				/>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model="email"
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="emailVerified">Email verified</label>
					<InputText
						id="emailVerified"
						placeholder="example@gmail.com"
						v-model="emailVerified"
						required
					/>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="socialID">Social ID</label>
					<InputText
						id="socialID"
						placeholder="https://www.facebook.com"
						v-model="socialID"
						required
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="socialVerified">Social verified</label>
					<InputText
						id="socialVerified"
						placeholder="https://www.facebook.com"
						v-model="socialVerified"
						required
					/>
				</div>
			</div>
			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Created at: {{ convertDateTime(data['created_at']) }}
				</span>
				<span class="text-xs text-gray-400">
					Updated at: {{ convertDateTime(data['updated_at']) }}
				</span>
			</div>
		</template>
		<template #footer>
			<Button
				type="button"
				label="Cancel"
				text
				severity="secondary"
				@click="myVisible = false"
			/>
			<Button
				type="submit"
				label="Save"
				@click="onSave"
			/>
		</template>
	</Dialog>
</template>
