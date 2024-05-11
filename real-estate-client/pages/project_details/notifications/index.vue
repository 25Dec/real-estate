<script setup>
	import { ref } from 'vue';
	import { FilterMatchMode } from 'primevue/api';

	const { notifications, currentNotification } = storeToRefs(
		useNotificationsStore()
	);
	const { getNotifications } = useNotificationsStore();
	const { getProjects } = useProjectsStore();

	await getNotifications();
	await getProjects();

	const statuses = ref([{ name: 'Info', value: 'info' }]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const viewDetailsNotificationDialogVisible = ref(false);
	const createNotificationDialogVisible = ref(false);
	const editNotificationDialogVisible = ref(false);
	const deleteNotificationDialogVisible = ref(false);

	const toggleViewDetailsNotification = async (data) => {
		currentNotification.value = data;
		viewDetailsNotificationDialogVisible.value =
			!viewDetailsNotificationDialogVisible.value;
	};

	const toggleEditNotification = async (data) => {
		currentNotification.value = data;
		editNotificationDialogVisible.value = !editNotificationDialogVisible.value;
	};

	const toggleDeleteNotification = async (data) => {
		currentNotification.value = data;
		deleteNotificationDialogVisible.value =
			!deleteNotificationDialogVisible.value;
	};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div
			class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
		>
			<div class="flex items-center gap-2">
				<span class="font-semibold text-lg">Notifications</span>
				<Tag :value="notifications.length"></Tag>
			</div>

			<div class="flex items-center gap-2">
				<IconField iconPosition="left">
					<InputIcon class="flex items-center">
						<Icon name="mdi:filter-outline" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Filter notifications..."
					/>
				</IconField>
				<Button
					size="small"
					label="New"
					@click="
						createNotificationDialogVisible = !createNotificationDialogVisible
					"
				/>
			</div>
		</div>

		<div class="absolute top-[8%] w-full h-[92%]">
			<DataTable
				:value="notifications"
				v-model:filters="filters"
				:paginator="true"
				:rows="50"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				scrollable
				scrollHeight="flex"
				stripedRows
			>
				<template #empty>
					<div class="flex justify-center items-center">
						<span>No notifications found.</span>
					</div>
				</template>

				<Column
					field="title"
					header="Title"
					sortable
					class="backdrop-blur-lg"
				>
					<template #body="{ data }">
						<div class="flex items-center gap-3">
							<span class="font-semibold">{{ data['title'] }}</span>
						</div>
					</template>
				</Column>

				<Column
					field="status"
					header="Status"
					sortable
					class="backdrop-blur-lg"
				>
					<template #body="{ data }">
						{{ data['status'] }}
					</template>
				</Column>

				<Column header="Actions">
					<template #body="{ data }">
						<Button
							text
							severity="secondary"
							@click="toggleViewDetailsNotification(data)"
						>
							<Icon name="mdi:eye-outline" />
						</Button>
						<Button
							text
							severity="secondary"
							@click="toggleEditNotification(data)"
						>
							<Icon name="mdi:edit-outline" />
						</Button>
						<Button
							text
							severity="danger"
							@click="toggleDeleteNotification(data)"
						>
							<Icon name="mdi:delete-outline" />
						</Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
	<ViewDetailsNotificationDialog
		v-if="viewDetailsNotificationDialogVisible"
		:visible="viewDetailsNotificationDialogVisible"
		:statuses="statuses"
	/>
	<CreateNotificationDialog
		v-if="createNotificationDialogVisible"
		:visible="createNotificationDialogVisible"
		:statuses="statuses"
	/>
	<EditNotificationDialog
		v-if="editNotificationDialogVisible"
		:visible="editNotificationDialogVisible"
		:statuses="statuses"
	/>
	<DeleteNotificationDialog
		v-if="deleteNotificationDialogVisible"
		:visible="deleteNotificationDialogVisible"
	/>
</template>
