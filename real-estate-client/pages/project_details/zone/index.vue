<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

const { zones, currentZone } = storeToRefs(useZonesStore());
const { getZones } = useZonesStore();
const { allProjectIDs } = storeToRefs(useProjectsStore());
const { getProjects } = useProjectsStore();

await getZones();
await getProjects();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const menu = ref();
const menuItems = ref([
  {
    label: "Move to Block",
    command: () => {},
  },
  {
    label: "Move to Land Area",
    command: () => {},
  },
]);
const viewDetailsZoneDialogVisible = ref(false);
const createZoneDialogVisible = ref(false);
const editZoneDialogVisible = ref(false);
const deleteZoneDialogVisible = ref(false);

const toggleViewZoneDetails = async (data) => {
  currentZone.value = data;
  viewDetailsZoneDialogVisible.value = !viewDetailsZoneDialogVisible.value;
};
const toggleEditZone = async (data) => {
  currentZone.value = data;
  editZoneDialogVisible.value = !editZoneDialogVisible.value;
};
const toggleDeleteZone = async (data) => {
  currentZone.value = data;
  deleteZoneDialogVisible.value = !deleteZoneDialogVisible.value;
};
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div
      class="fixed right-0 top-0 z-50 backdrop-blur-xl w-5/6 h-[8%] px-4 border-b flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <span class="font-semibold text-lg">Zone</span>
        <Tag :value="zones.length"></Tag>
      </div>

      <div class="flex items-center gap-2">
        <IconField iconPosition="left">
          <InputIcon class="flex items-center">
            <Icon name="mdi:filter-outline" />
          </InputIcon>
          <InputText
            v-model="filters['global'].value"
            placeholder="Filter zone..."
          />
        </IconField>
        <Button
          size="small"
          label="New"
          @click="createZoneDialogVisible = !createZoneDialogVisible"
        />
      </div>
    </div>

    <div class="absolute top-[8%] w-full h-[92%]">
      <DataTable
        :value="zones"
        v-model:filters="filters"
        :paginator="true"
        :rows="50"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        scrollable
        scrollHeight="flex"
        removableSort
      >
        <template #empty>
          <div class="flex justify-center items-center">
            <span>No zone found.</span>
          </div>
        </template>

        <Column field="name" header="Name">
          <template #body="{ data }">
            {{ data["name"] }}
          </template>
        </Column>

        <Column field="desc" header="Description">
          <template #body="{ data }">
            {{ data["desc"] }}
          </template>
        </Column>

        <Column field="progress" header="Progress" sortable>
          <template #body="{ data }">
            <Knob v-model="data['progress']" readonly :size="50" />
          </template>
        </Column>

        <Column header="Actions">
          <template #body="{ data }">
            <Button
              text
              severity="secondary"
              @click="toggleViewZoneDetails(data)"
            >
              <Icon name="mdi:eye-outline" />
            </Button>
            <Button text severity="secondary" @click="toggleEditZone(data)">
              <Icon name="mdi:edit-outline" />
            </Button>
            <Button text severity="danger" @click="toggleDeleteZone(data)">
              <Icon name="mdi:delete-outline" />
            </Button>
            <Button
              text
              severity="secondary"
              @click="(event) => menu.toggle(event)"
            >
              <Icon name="mdi:more-vert" />
            </Button>
            <Menu ref="menu" :model="menuItems" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <ViewDetailsZoneDialog
    v-if="viewDetailsZoneDialogVisible"
    :visible="viewDetailsZoneDialogVisible"
  />
  <CreateZoneDialog
    v-if="createZoneDialogVisible"
    :visible="createZoneDialogVisible"
    :allProjectIDs="allProjectIDs"
  />
  <EditZoneDialog
    v-if="editZoneDialogVisible"
    :visible="editZoneDialogVisible"
  />
  <DeleteZoneDialog
    v-if="deleteZoneDialogVisible"
    :visible="deleteZoneDialogVisible"
  />
</template>
