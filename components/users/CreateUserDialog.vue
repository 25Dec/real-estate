<script setup>
	const { visible, roles } = defineProps(['visible', 'roles']);

	const { addNewUser } = useUsersStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const socialID = ref('');
	const phone = ref('');
	const loginName = ref('');
	const password = ref('');
	const firstName = ref('');
	const lastName = ref('');
	const email = ref('');
	const type = ref({});
	const phoneVerified = ref('');
	const emailVerified = ref('');
	const socialVerified = ref('');

	const onSave = async () => {
		const newUserData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			social_id: socialID.value,
			phone: phone.value,
			login_name: loginName.value,
			password: password.value,
			first_name: firstName.value,
			last_name: lastName.value,
			display_name: `${firstName.value} ${lastName.value}`,
			email: email.value,
			language: 'vi',
			type: type.value.value,
			phone_verified: phoneVerified.value,
			email_verified: emailVerified.value,
			social_verified: socialVerified.value,
			activated: 'true',
			deleted: 'false',
			created_by: 1,
			updated_by: 1,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		const response = await addNewUser(newUserData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Create New User Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Create New User',
				group: 'bl',
				life: 3000,
			});
		}
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
				<span class="font-bold text-xl">Create New User</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="firstName">First Name</label>
					<InputText
						id="firstName"
						placeholder="First Name"
						v-model="firstName"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model="lastName"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="loginName">Login Name</label>
					<InputText
						id="loginName"
						placeholder="Login Name"
						v-model="loginName"
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
					<label for="phone">Phone Number</label>
					<InputText
						id="phone"
						placeholder="+84 9698 886 660"
						v-model="phone"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="phoneVerified">Phone Verified</label>
					<InputText
						id="phoneVerified"
						placeholder="+84 9698 886 660"
						v-model="phoneVerified"
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">User Role</label>
				<Dropdown
					id="type"
					class="flex-1"
					placeholder="Select User Role"
					v-model="type.value"
					:options="roles"
					optionLabel="name"
				/>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model="email"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="emailVerified">Email Verified</label>
					<InputText
						id="emailVerified"
						placeholder="example@gmail.com"
						v-model="emailVerified"
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
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="socialVerified">Social Verified</label>
					<InputText
						id="socialVerified"
						placeholder="https://www.facebook.com"
						v-model="socialVerified"
					/>
				</div>
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
