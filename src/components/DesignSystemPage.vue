<script setup lang="ts">
import { mdiAccount, mdiBell, mdiHome } from "@mdi/js";
import { ref } from "vue";

// Components
import AppButton from "./AppButton.vue";
import AppIcon from "./AppIcon.vue";
import AppImage from "./AppImage.vue";
import AppImageUpload from "./AppImageUpload.vue";
import AppInput from "./AppInput.vue";
import AppModal from "./AppModal.vue";
import AppPageHeader from "./AppPageHeader.vue";
import AppSearch from "./AppSearch.vue";
import AppSection from "./AppSection.vue";
import AppTable from "./AppTable.vue";
import AppTabs from "./AppTabs.vue";
import AppTextarea from "./AppTextarea.vue";
import AppToast from "./AppToast.vue";
import AppToc from "./AppToc.vue";

// Mock Dependencies
const http = {
  get: async (url: string) => {
    console.log(`[Mock HTTP] GET Request to ${url}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw new Error("Mock API Error");
  },
};

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success" | "error" | "warning" | "info">("info");

const eventBus = {
  emit: (event: string, payload: any) => {
    console.log(`[Mock EventBus] Emitted: ${event}`, payload);
    if (event === "show-toast") {
      showToast.value = true;
      toastMessage.value = payload.message;
      toastType.value = payload.type;

      // Auto-hide after 3 seconds
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    }
  },
};

const inputValue = ref("");
const errorInputValue = ref("Invalid input");
const textareaValue = ref("");
const isModalOpen = ref(false);
const imageFile = ref<File | null>(null);
const activeTab = ref(1);

const colorScales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Sample Data for Table
const sampleItems = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
];
const isLoadingTable = ref(false);

const tabItems = [
  { id: 1, label: "Tab 1" },
  { id: 2, label: "Tab 2" },
  { id: 3, label: "Tab 3" },
];

// TOC Items
const toc = [
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "textarea", label: "Textarea" },
  { id: "icons", label: "Icons" },
  { id: "section", label: "Section" },
  { id: "image-display", label: "Image Display" },
  { id: "image-upload", label: "Image Upload" },
  { id: "modal", label: "Modal" },
  { id: "feedback", label: "Feedback" },
  { id: "page-header", label: "Page Header" },
  { id: "search", label: "Search" },
  { id: "tabs", label: "Tabs" },
  { id: "table", label: "Table" },
];

// 토스트 테스트 함수
const showSuccessToast = () => {
  eventBus.emit("show-toast", {
    message: "작업이 성공적으로 완료되었습니다.",
    type: "success",
  });
};

const showErrorToast = () => {
  eventBus.emit("show-toast", {
    message: "오류가 발생했습니다. 다시 시도해주세요.",
    type: "error",
  });
};

const showApiError = async () => {
  try {
    // 존재하지 않는 API 호출로 에러 유발
    await http.get("/error-test-api");
  } catch (e) {
    // 전역 에러 핸들러에 의해 토스트가 뜰 것임
    // Mock에서는 직접 호출
    showErrorToast();
  }
};
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar TOC -->
    <AppToc :items="toc" title="Contents" />

    <!-- Main Content -->
    <div class="flex-1 p-4 md:p-6 space-y-8 min-w-0">
      <header class="pb-6 border-b border-border">
        <h1 class="text-3xl font-bold text-primary">Design System Guide</h1>
        <p class="text-text-muted mt-2"> Admin Dashboard UI Components & Style Guide </p>
      </header>

      <!-- 1. Typography -->
      <section id="typography" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Typography </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm space-y-4 border border-border">
          <div>
            <h1 class="text-4xl font-bold">Heading 1 (text-4xl)</h1>
            <p class="text-sm text-text-muted">Used for main page titles</p>
          </div>
          <div>
            <h2 class="text-3xl font-bold">Heading 2 (text-3xl)</h2>
            <p class="text-sm text-text-muted">Used for section titles</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Heading 3 (text-2xl)</h3>
            <p class="text-sm text-text-muted">Used for card titles</p>
          </div>
          <div class="pt-4">
            <p class="text-base text-text-main">
              This is a default body text. Roboto font is used for better Korean readability. 다람쥐 헌 쳇바퀴에 타고파.
              가나다라마바사아자차카타파하.
            </p>
            <p class="text-sm text-text-muted mt-1"> This is muted text (text-sm). Used for descriptions and hints. </p>
          </div>
        </div>
      </section>

      <!-- 2. Colors -->
      <section id="colors" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Color Palette </h2>

        <!-- Primary Scale -->
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-text-main"> Primary Scale (Modern Black/Gray) </h3>
          <div class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-11 gap-2">
            <div v-for="scale in colorScales" :key="`primary-${scale}`" class="text-center">
              <div :class="`bg-primary-${scale}`" class="h-12 w-full rounded mb-1 border border-border/20"></div>
              <p class="text-xs font-mono text-text-muted">{{ scale }}</p>
            </div>
          </div>
        </div>

        <!-- Secondary Scale -->
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-text-main"> Secondary Scale (Vivid Pink) </h3>
          <div class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-11 gap-2">
            <div v-for="scale in colorScales" :key="`secondary-${scale}`" class="text-center">
              <div :class="`bg-secondary-${scale}`" class="h-12 w-full rounded mb-1 border border-border/20"></div>
              <p class="text-xs font-mono text-text-muted">{{ scale }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <!-- Primary -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-primary rounded mb-2"></div>
            <p class="font-bold">Primary Default</p>
            <p class="text-xs text-text-muted">Modern Black #252525</p>
          </div>
          <!-- Secondary -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-secondary rounded mb-2"></div>
            <p class="font-bold">Secondary Default</p>
            <p class="text-xs text-text-muted">Vivid Pink #FF0B55</p>
          </div>
          <!-- Success -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-success rounded mb-2"></div>
            <p class="font-bold">Success</p>
            <p class="text-xs text-text-muted">Emerald 500</p>
          </div>
          <!-- Danger -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-danger rounded mb-2"></div>
            <p class="font-bold">Danger</p>
            <p class="text-xs text-text-muted">Red 500</p>
          </div>
          <!-- Warning -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-warning rounded mb-2"></div>
            <p class="font-bold">Warning</p>
            <p class="text-xs text-text-muted">Amber 500</p>
          </div>
          <!-- Background -->
          <div class="bg-surface p-4 rounded-lg border border-border shadow-sm">
            <div class="h-12 w-full bg-background border border-border rounded mb-2"></div>
            <p class="font-bold">Background</p>
            <p class="text-xs text-text-muted">Page BG</p>
          </div>
        </div>
      </section>

      <!-- 3. Buttons -->
      <section id="buttons" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Buttons </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border space-y-6">
          <!-- Variants -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium mb-2">Variants</h3>
            <div class="flex flex-wrap gap-3">
              <AppButton variant="primary">Primary</AppButton>
              <AppButton variant="secondary">Secondary</AppButton>
              <AppButton variant="outline">Outline</AppButton>
              <AppButton variant="danger">Danger</AppButton>
              <AppButton variant="ghost">Ghost</AppButton>
            </div>
          </div>

          <!-- Sizes -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium mb-2">Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <AppButton size="sm" variant="primary">Small</AppButton>
              <AppButton size="md" variant="primary">Medium (Default)</AppButton>
              <AppButton size="lg" variant="primary">Large</AppButton>
            </div>
          </div>

          <!-- States -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium mb-2">States</h3>
            <div class="flex flex-wrap gap-3">
              <AppButton disabled>Disabled</AppButton>
              <AppButton loading>Loading</AppButton>
              <AppButton variant="outline" loading>Loading Outline</AppButton>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Inputs -->
      <section id="inputs" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Inputs </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border grid grid-cols-1 md:grid-cols-2 gap-6">
          <AppInput v-model="inputValue" label="Default Input" placeholder="Enter something..." />
          <AppInput v-model="errorInputValue" label="Error State" error="This field is required" />
          <AppInput v-model="inputValue" label="Disabled Input" disabled placeholder="Cannot type here" />
          <AppInput v-model="inputValue" label="Password Input" type="password" placeholder="********" />
        </div>
      </section>

      <!-- 5. Textarea -->
      <section id="textarea" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Textarea </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
          <AppTextarea
            v-model="textareaValue"
            label="Description"
            placeholder="Enter description here..."
            :rows="4"
            :max-length="200"
          />
        </div>
      </section>

      <!-- 6. Icons -->
      <section id="icons" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3">Icons</h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border space-y-4">
          <p class="text-sm text-text-muted"> Using Material Design Icons (SVG paths). </p>
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center gap-2">
              <AppIcon :path="mdiHome" />
              <span class="text-xs text-gray-500">Default (24px)</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <AppIcon :path="mdiAccount" size="32" class="text-primary" />
              <span class="text-xs text-gray-500">Primary (32px)</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <AppIcon :path="mdiBell" size="48" class="text-secondary" />
              <span class="text-xs text-gray-500">Secondary (48px)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Section -->
      <section id="section" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Section </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
          <AppSection title="Section Title">
            <p class="text-gray-600">
              This is the content inside an AppSection component. It provides a standardized title and layout structure.
            </p>
          </AppSection>
        </div>
      </section>

      <!-- 8. Image Display -->
      <section id="image-display" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Image Display </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border space-y-8">
          <!-- Square -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Square (Avatar/Thumbnail)</h3>
            <div class="flex gap-4">
              <AppImage src="https://picsum.photos/200" alt="Square" class="w-16" :aspect-ratio="1" shape="rounded" />
              <AppImage src="https://picsum.photos/201" alt="Circle" class="w-16" :aspect-ratio="1" shape="circle" />
            </div>
          </div>

          <!-- Ratios -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Landscape (16:9)</h3>
              <AppImage
                src="https://picsum.photos/800/450"
                alt="Landscape"
                class="w-full"
                :aspect-ratio="16 / 9"
                shape="rounded"
              />
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Portrait (3:4)</h3>
              <AppImage
                src="https://picsum.photos/300/400"
                alt="Portrait"
                class="w-48"
                :aspect-ratio="3 / 4"
                shape="rounded"
              />
            </div>
          </div>

          <!-- States -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium">States</h3>
            <div class="flex gap-4">
              <div class="w-32">
                <AppImage :src="null" alt="No Image" :aspect-ratio="1" />
                <p class="text-xs text-center mt-1 text-gray-500"> Null Source </p>
              </div>
              <div class="w-32">
                <AppImage src="https://invalid-url.com/image.jpg" alt="Error" :aspect-ratio="1" />
                <p class="text-xs text-center mt-1 text-gray-500">Load Error</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Image Upload -->
      <section id="image-upload" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Image Upload </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
          <AppImageUpload
            v-model="imageFile"
            label="Profile Image"
            description="Upload a profile picture (Max 5MB)"
            :max-size-m-b="5"
            check-dimensions
            :aspect-ratio="1"
          />
        </div>
      </section>

      <!-- 9. Modal -->
      <section id="modal" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3">Modal</h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
          <AppButton @click="isModalOpen = true">Open Modal</AppButton>

          <AppModal v-model="isModalOpen" title="Example Modal">
            <div class="space-y-4">
              <p class="text-gray-600"> This is a reusable modal component. You can put any content here. </p>
              <AppInput label="Name" placeholder="Type inside modal..." model-value="" />
            </div>
            <template #footer>
              <AppButton variant="secondary" @click="isModalOpen = false">Close</AppButton>
              <AppButton @click="isModalOpen = false">Confirm</AppButton>
            </template>
          </AppModal>
        </div>
      </section>

      <!-- 10. Feedback (Toasts) -->
      <section id="feedback" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Feedback (Toasts) </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border flex gap-4">
          <AppButton variant="primary" @click="showSuccessToast">Show Success Toast</AppButton>
          <AppButton variant="danger" @click="showErrorToast">Show Error Toast</AppButton>
          <AppButton variant="outline" @click="showApiError">Trigger API Error (404)</AppButton>
        </div>
      </section>

      <!-- 6. Page Header -->
      <section id="page-header" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Page Header </h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
          <AppPageHeader title="Page Title" description="This is a description for the page.">
            <template #actions>
              <AppButton variant="outline">Cancel</AppButton>
              <AppButton>Save Changes</AppButton>
            </template>
          </AppPageHeader>
        </div>
      </section>

      <!-- 7. Search Component -->
      <section id="search" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3"> Search </h2>
        <AppSearch>
          <AppInput label="Name" placeholder="Search by name" modelValue="" />
          <AppInput label="Status" placeholder="Filter by status" modelValue="" />
          <template #actions>
            <AppButton variant="secondary">Reset</AppButton>
            <AppButton>Search</AppButton>
          </template>
        </AppSearch>
      </section>

      <!-- 8. Tabs -->
      <section id="tabs" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3">Tabs</h2>
        <div class="bg-surface p-6 rounded-lg shadow-sm border border-border space-y-8">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Horizontal (Default)</h3>
            <AppTabs v-model="activeTab" :items="tabItems" />
            <p class="text-sm text-gray-500">Active Tab ID: {{ activeTab }}</p>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg font-medium">Vertical</h3>
            <div class="flex gap-4">
              <div class="w-48">
                <AppTabs v-model="activeTab" :items="tabItems" direction="vertical" />
              </div>
              <div class="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p class="text-gray-600">Content for Tab {{ activeTab }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Table Component -->
      <section id="table" class="space-y-4 scroll-mt-20">
        <h2 class="text-2xl font-bold border-l-4 border-primary pl-3">Table</h2>
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Default Table</h3>
          <AppTable :items="sampleItems" :is-loading="isLoadingTable" :pagination="{ hasNext: true }">
            <template #head>
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Actions</th>
              </tr>
            </template>
            <template #row="{ item }">
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">{{ item.id }}</td>
                <td class="px-6 py-4 font-medium">{{ item.name }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.email }}</td>
                <td class="px-6 py-4">
                  <span
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-primary hover:text-primary-700 font-medium"> Edit </button>
                </td>
              </tr>
            </template>
          </AppTable>

          <h3 class="text-lg font-medium mt-8">Loading State</h3>
          <AppTable :items="[]" :is-loading="true">
            <template #head>
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Name</th>
              </tr>
            </template>
          </AppTable>

          <h3 class="text-lg font-medium mt-8">Empty State</h3>
          <AppTable :items="[]" empty-text="No data available">
            <template #head>
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Name</th>
              </tr>
            </template>
          </AppTable>
        </div>
      </section>
    </div>
    <!-- AppToast for displaying feedback -->
    <AppToast :show="showToast" :message="toastMessage" :type="toastType" @close="showToast = false" />
  </div>
</template>
