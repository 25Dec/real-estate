<script setup>
	const { visible, roles } = defineProps(['visible', 'roles']);

	const { currentUser: currentCustomer } = storeToRefs(useAccountsStore());

	const myVisible = ref(visible);
	const socialID = ref(currentCustomer.value['social_id']);
	const phone = ref(currentCustomer.value['phone']);
	const loginName = ref(currentCustomer.value['login_name']);
	const password = ref(currentCustomer.value['password']);
	const firstName = ref(currentCustomer.value['first_name']);
	const lastName = ref(currentCustomer.value['last_name']);
	const email = ref(currentCustomer.value['email']);
	const type = ref(currentCustomer.value['type']);
	const phoneVerified = ref(currentCustomer.value['phone_verified']);
	const emailVerified = ref(currentCustomer.value['email_verified']);
	const socialVerified = ref(currentCustomer.value['social_verified']);
	const createdAt = ref(currentCustomer.value['created_at']);
	const updatedAt = ref(currentCustomer.value['updated_at']);
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
				<span class="font-bold text-xl">Customer Details</span>
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="lastName">Last Name</label>
					<InputText
						id="lastName"
						placeholder="Last Name"
						v-model.trim="lastName"
						disabled
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
						disabled
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
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="phoneVerified">Phone Verified</label>
					<InputText
						id="phoneVerified"
						placeholder="+84 9698 886 660"
						v-model.trim="phoneVerified"
						integeronly
						disabled
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2">
				<label for="type">User Role</label>
				<Dropdown
					id="type"
					class="flex-1"
					placeholder="Select User Role"
					v-model="roles[roles.findIndex((role) => role.value == type)].value"
					:options="roles"
					optionLabel="name"
					optionValue="value"
					disabled
				/>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-1 flex-col gap-2">
					<label for="email">Email</label>
					<InputText
						id="email"
						placeholder="example@gmail.com"
						v-model="email"
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="emailVerified">Email Verified</label>
					<InputText
						id="emailVerified"
						placeholder="example@gmail.com"
						v-model="emailVerified"
						disabled
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
						disabled
					/>
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<label for="socialVerified">Social Verified</label>
					<InputText
						id="socialVerified"
						placeholder="https://www.facebook.com"
						v-model="socialVerified"
						disabled
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
				label="Close"
				@click="myVisible = false"
			/>
		</template>
	</Dialog>
</template>
