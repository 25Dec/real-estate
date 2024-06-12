<script setup>
	const { visible, roles } = defineProps(['visible', 'roles']);

	const { currentUser } = storeToRefs(useUsersStore());
	const { editUser } = useUsersStore();
	const toast = useToast();

	const myVisible = ref(visible);
	const socialID = ref(currentUser.value['social_id']);
	const phone = ref(currentUser.value['phone']);
	const loginName = ref(currentUser.value['login_name']);
	const password = ref(currentUser.value['password']);
	const firstName = ref(currentUser.value['first_name']);
	const lastName = ref(currentUser.value['last_name']);
	const email = ref(currentUser.value['email']);
	const type = ref({
		name: roles.filter(
			(role) => role['value'] == currentUser.value['type']
		)?.[0]?.['name'],
		value: roles.filter(
			(role) => role['value'] == currentUser.value['type']
		)?.[0]?.['value'],
	});
	const phoneVerified = ref(currentUser.value['phone_verified']);
	const emailVerified = ref(currentUser.value['email_verified']);
	const socialVerified = ref(currentUser.value['social_verified']);
	const createdAt = ref(currentUser.value['created_at']);
	const updatedAt = ref(currentUser.value['updated_at']);

	const onSave = async () => {
		const newUserData = {
			...currentUser.value,
			social_id: socialID.value,
			phone: phone.value,
			first_name: firstName.value,
			last_name: lastName.value,
			display_name: `${firstName.value} ${lastName.value}`,
			email: email.value,
			type: type.value.value,
			phone_verified: phoneVerified.value,
			email_verified: emailVerified.value,
			social_verified: socialVerified.value,
			updated_at: new Date().toLocaleString(),
		};

		const response = await editUser(newUserData);
		myVisible.value = false;

		if (response != null && response['result'] == 'ok') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Edit User Successfully!',
				group: 'bl',
				life: 3000,
			});
		} else {
			toast.add({
				severity: 'warning',
				summary: 'Error',
				detail: 'Failed to Edit User',
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
				<span class="font-bold text-xl">User Details</span>
			</div>
		</template>
		<template class="flex flex-col gap-3">
			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="firstName">First Name</label>
					<InputText
						id="firstName"
						placeholder="First Name"
						v-model.trim="firstName"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model.trim="lastName"
					/>
				</div>
			</div>

			<div class="flex flex-row gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="loginName">Login Name</label>
					<InputText
						id="loginName"
						placeholder="Login Name"
						v-model.trim="loginName"
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
						v-model.trim="phone"
						integeronly
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="phoneVerified">Phone Verified</label>
					<InputText
						id="phoneVerified"
						placeholder="+84 9698 886 660"
						v-model.trim="phoneVerified"
						integeronly
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

			<div class="flex flex-row gap-3 justify-between">
				<span class="text-xs text-gray-400">
					Created at: {{ convertDateTime(createdAt) }}
				</span>
				<span class="text-xs text-gray-400">
					Updated at: {{ convertDateTime(updatedAt) }}
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
